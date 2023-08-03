import { compare, hash } from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ExpressGlobalLocals } from "../types/express";

export interface JWTUser {
	id: String;
	email: String;
}

export interface AuthenticateRequestBody {
	email: string;
	password: string;
}

type AuthHandler = RequestHandler<{}, {}, AuthenticateRequestBody, {}, ExpressGlobalLocals>;

export const authenticate: AuthHandler = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Bad Request" });
	}

	const user = await res.locals.prisma.user.findUnique({
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

	const jwtUser: JWTUser = {
		id: user.id,
		email,
	};

	const token = jwt.sign(jwtUser, process.env.JWT_SECRET!, { expiresIn: "1h" });

	return res.status(200).json({ token });
};

/// auth middleware that checks for a jwt token in the request header
export const authCheck: AuthHandler = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		res.locals.user = decoded as JWTUser;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};
