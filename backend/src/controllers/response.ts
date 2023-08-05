import { ImpartialError } from "../errors";
import { ExpressResponseResult } from "../types/express";

type ErrorProps = { message: string; context?: string } | ImpartialError;

export class ResponseResult<T> implements ExpressResponseResult<T> {
	type: "ok" | "error";
	error?: { message: string; context?: string };
	data?: T;

	constructor(type: "ok" | "error", data?: T, error?: { message: string; context?: string }) {
		if (type === "ok" && error) throw new Error("Cannot have error in ok response");
		if (type === "error" && !error) throw new Error("Must have error in error response");

		this.type = type;
		this.data = data;
		this.error = error;
	}

	static ok<T>(data: T): ResponseResult<T> {
		return new ResponseResult("ok", data);
	}

	static error<T>(e: ErrorProps): ResponseResult<T> {
		const { message, context } = e;
		return new ResponseResult<T>("error", undefined, { message, context });
	}
}
