import { APIResponseResult } from "@/api/generic";
import { Result } from "@/utils/result";

export interface AuthLoginResponseData {
	sessionToken: string;
	refreshToken: string;
}

export type AuthLoginResponse = APIResponseResult<AuthLoginResponseData>;

export async function login(
	email: string,
	password: string,
): Promise<Result<AuthLoginResponseData>> {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const json = await response.json();
		return Result.fromAPIResult<AuthLoginResponseData>(json);
	} catch (error) {
		if (error instanceof Error) {
			return Result.error({ message: error.message });
		} else {
			return Result.error({ message: "Unknown error", context: error!.toString() });
		}
	}
}
