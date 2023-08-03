export interface JWTUser {
	id: String;
	email: String;
}

export interface AuthenticateRequestBody {
	email: string;
	password: string;
}

export interface AuthRegisterRequestBody {
	email: string;
	username: string;
	password: string;
}
