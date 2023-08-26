import type { JwtPayload } from "jsonwebtoken";

export interface JWTUser extends JwtPayload {
	id: string;
	email: string;
}

export interface JWTUserRefresh extends JWTUser {
	refreshId: string;
}

export interface AuthRegisterRequestBody {
	email: string;
	username: string;
	password: string;
}

export interface AuthLoginBody {
	email: string;
	password: string;
}

export interface AuthRefreshBody {
	token: string;
}
