export interface APIResponseResult<T> {
	type: "ok" | "error";
	data?: T;
	error?: APIError;
}

export interface APIError {
	message: string;
	context?: string;
}
