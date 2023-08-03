import { hash } from "bcrypt";
import debugUtils from "debug";
import { Router } from "express";
import { sign } from "jsonwebtoken";

import { handlePrismaErrors } from "../errors/prisma";
import { AuthRegisterRequestBody, JWTUser } from "../types/auth";
import { ExpressAppLocals, ExpressGenericRequestHandler } from "../types/express";

const router = Router();
const debug = debugUtils("backend:auth");

const register: ExpressGenericRequestHandler<AuthRegisterRequestBody> = async (req, res) => {
	const appLocals = res.app.locals as ExpressAppLocals;
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return res.status(400).json({ message: "Email, user and password is required to create an account." });
	}

	const passwordHash = await hash(password, 10);

	let userId: string;

	try {
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
		const error = handlePrismaErrors(e, { alreadyExistsMessage: "User with this email already exists!" });
		return res.status(error.code).json({ message: error.message });
	}

	const jwtUser: JWTUser = {
		id: userId,
		email,
	};

	const token = sign(jwtUser, process.env.JWT_TOKEN_SECRET!, { expiresIn: "1h" });
	res.status(200).json({ token });
};

router.post("/register", register);

export default router;
