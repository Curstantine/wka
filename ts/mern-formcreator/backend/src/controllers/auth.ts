import debugUtils from "debug";
import jwt, { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import { JWT_REFRESH_TOKEN_SECRET, JWT_TOKEN_SECRET } from "../constants";
import { JWTUser, JWTUserRefresh } from "../types/auth";
import { ExpressGenericRequestHandler } from "../types/express";
import { ResponseResult } from "./response";

const debug = debugUtils("backend:controller:auth");

export function prepareSessionToken(userId: string, email: string) {
	const sessionJWT: JWTUser = {
		id: userId,
		email,
	};

	const sessionToken = sign(sessionJWT, JWT_TOKEN_SECRET, { expiresIn: "1h" });

	return { sessionJWT, sessionToken };
}

export function prepareRefreshToken(user: JWTUser) {
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	const refreshJWT: JWTUserRefresh = {
		...user,
		refreshId: uuid(),
		exp: expiresAt.getTime() / 1000,
	};

	const refreshToken = sign(refreshJWT, JWT_REFRESH_TOKEN_SECRET);

	return { refreshJWT, refreshToken, expiresAt };
}

export const authenticate: ExpressGenericRequestHandler = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json(ResponseResult.error({ message: "Unauthorized" }));
	}

	let decodedJWT: JWTUser;
	try {
		decodedJWT = jwt.verify(token, JWT_TOKEN_SECRET) as JWTUser;
	} catch (e) {
		debug(e);
		return res.status(401).json(ResponseResult.error({ message: "Invalid refresh token" }));
	}

	if (Date.now() > decodedJWT.exp! * 1000) {
		return res.status(401).json(ResponseResult.error({
			message: "Session token has expired, please refresh the token",
		}));
	}

	res.locals.user = decodedJWT;
	return next();
};
