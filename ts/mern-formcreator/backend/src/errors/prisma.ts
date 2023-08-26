import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ImpartialError } from ".";

const internalServerError: ImpartialError = {
	code: 500,
	message: "Internal Server Error",
};

export function handlePrismaErrors(e: unknown, {
	alreadyExistsMessage = "This resource already exists.",
}): ImpartialError {
	if (e instanceof PrismaClientKnownRequestError) {
		switch (e.code) {
			case "P2002":
				return {
					code: 400,
					message: alreadyExistsMessage,
				};
			default:
				return internalServerError;
		}
	}

	return internalServerError;
}
