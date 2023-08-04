import { compare, hash } from "bcrypt";
import debugUtils from "debug";
import { Router } from "express";
import { verify } from "jsonwebtoken";

import { JWT_REFRESH_TOKEN_SECRET } from "../constants";
import { prepareRefreshToken, prepareSessionToken } from "../controllers/auth";
import { handlePrismaErrors } from "../errors/prisma";
import {
	AuthLoginBody,
	AuthRefreshBody,
	AuthRegisterRequestBody,
	JWTUser,
	JWTUserRefresh,
} from "../types/auth";
import { ExpressAppLocals, ExpressGenericRequestHandler } from "../types/express";

const router = Router();
const debug = debugUtils("backend:route:auth");

const register: ExpressGenericRequestHandler<AuthRegisterRequestBody> = async (req, res) => {
	const appLocals = req.app.locals as ExpressAppLocals;
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return res.status(400).json({
			message: "Email, user and password is required to create an account.",
		});
	}

	let userId: string;
	try {
		const passwordHash = await hash(password, 10);
		const user = await appLocals.prisma.user.create({
			data: {
				email,
				username,
				passwordHash,
			},
			select: {
				id: true,
			},
		});

		userId = user.id;
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {
			alreadyExistsMessage: "User with this email already exists!",
		});
		return res.status(error.code).json({ message: error.message });
	}

	const { sessionJWT, sessionToken } = prepareSessionToken(userId, email);
	const { refreshJWT, expiresAt, refreshToken } = prepareRefreshToken(sessionJWT);

	try {
		await appLocals.prisma.userSessionRefresh.create({
			data: {
				id: refreshJWT.refreshId,
				expiresAt,
				userId,
			},
		});
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {});
		return res.status(error.code).json({ message: error.message });
	}

	res.status(200).json({ sessionToken, refreshToken });
};

const login: ExpressGenericRequestHandler<AuthLoginBody> = async (req, res) => {
	const appLocals = req.app.locals as ExpressAppLocals;
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Email and password is required to login." });
	}

	let userId: string;
	try {
		const user = await appLocals.prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				passwordHash: true,
			},
		});

		if (!user) {
			return res.status(401).json({ message: "A user by this email does not exist." });
		}

		if (!await compare(password, user.passwordHash)) {
			return res.status(401).json({ message: "Incorrect password." });
		}

		userId = user.id;
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {});
		return res.status(error.code).json({ message: error.message });
	}

	const { sessionJWT, sessionToken } = prepareSessionToken(userId, email);
	const { refreshJWT, expiresAt, refreshToken } = prepareRefreshToken(sessionJWT);

	try {
		await appLocals.prisma.userSessionRefresh.deleteMany({
			where: {
				userId,
			},
		});

		await appLocals.prisma.userSessionRefresh.create({
			data: {
				id: refreshJWT.refreshId,
				expiresAt,
				userId,
			},
		});
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {});
		return res.status(error.code).json({ message: error.message });
	}

	res.status(200).json({ sessionToken, refreshToken });
};

const refresh: ExpressGenericRequestHandler<AuthRefreshBody> = async (req, res) => {
	const appLocals = res.app.locals as ExpressAppLocals;
	const { token } = req.body;

	if (!token) {
		return res.status(400).json({ message: "Refresh token is required to refresh." });
	}

	/// TODO: error handling
	let decodedJWT: JWTUserRefresh;
	try {
		decodedJWT = verify(token, JWT_REFRESH_TOKEN_SECRET) as JWTUserRefresh;
	} catch (e) {
		debug(e);
		return res.status(401).json({ message: "Invalid refresh token." });
	}

	if (Date.now() > decodedJWT.exp! * 1000) {
		return res.status(401).json({ message: "Refresh token has expired. Please login again." });
	}

	const { sessionToken } = prepareSessionToken(decodedJWT.id, decodedJWT.email);
	return res.status(200).json({ sessionToken });
};

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
