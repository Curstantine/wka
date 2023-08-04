import Ajv from "ajv";
import debugUtils from "debug";

import { ExpressGenericRequestHandler } from "../types/express";
import { FormPOSTBody } from "../types/form";
import { formPostBodySchema } from "../validators/form";

const debug = debugUtils("backend:controller:form");

export const validateFormBody: ExpressGenericRequestHandler<FormPOSTBody> = (req, res, next) => {
	const ajv = new Ajv();
	const formBodyValidator = ajv.compile<FormPOSTBody>(formPostBodySchema);
	const valid = formBodyValidator(req.body);

	if (!valid || formBodyValidator.errors) {
		debug(formBodyValidator.errors);
		const error = formBodyValidator.errors?.at(0);
		let ctxMessage = null;

		if (error?.keyword === "required" && error?.instancePath !== null) {
			ctxMessage =
				`Missing property: ${error.params.missingProperty} [@${error.instancePath}]`;
		} else if (error?.keyword === "type" && error?.instancePath !== null) {
			ctxMessage = `Invalid type: ${error.message} [@${error.instancePath}]`;
		} else {
			ctxMessage = `Unknown error: ${error?.keyword} [at ${error?.instancePath}]`;
		}

		return res.status(400).json({
			message: "Invalid body",
			context: ctxMessage,
		});
	}

	return next();
};
