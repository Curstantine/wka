import Ajv from "ajv";

import { ExpressGenericRequestHandler } from "../types/express";
import { FormPOSTBody } from "../types/form";
import { formPostBodySchema } from "../validators/form";

export const validateFormBody: ExpressGenericRequestHandler<FormPOSTBody> = (req, res, next) => {
	const ajv = new Ajv();
	const formBodyValidator = ajv.compile<FormPOSTBody>(formPostBodySchema);
	const valid = formBodyValidator(req.body);

	if (!valid || formBodyValidator.errors) {
		const error = formBodyValidator.errors?.at(0);

		return res.status(400).json({
			message: "Invalid body",
			context: error?.message,
		});
	}

	return next();
};
