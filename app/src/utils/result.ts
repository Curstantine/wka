import { APIError, APIResponseResult } from "@/api/generic";

export interface ResultInterface<T> {
	data?: T;
	error?: APIError;
}

export class Result<T> implements ResultInterface<T> {
	data?: T;
	error?: APIError;

	constructor(data?: T, error?: APIError) {
		this.data = data;
		this.error = error;
	}

	static ok<T>(data: T): Result<T> {
		return new Result<T>(data);
	}

	static error<T>(error: APIError): Result<T> {
		return new Result<T>(undefined, error);
	}

	static fromAPIResult<T>(result: APIResponseResult<T>): Result<T> {
		if (result.data) {
			return Result.ok<T>(result.data as T);
		}

		if (result.error) {
			return Result.error<T>(result.error);
		}

		return Result.error<T>({
			message: "Unknown error",
			context: `data: ${result.data}, error: ${result.error} while type was ${result.type}`,
		});
	}

	public map<U>(fn: (data: T) => U): Result<U> {
		if (this.data) {
			return Result.ok<U>(fn(this.data));
		}

		if (this.error) {
			return Result.error<U>(this.error);
		}

		return Result.error<U>({ message: "Unknown error" });
	}
}
