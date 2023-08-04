import Ajv from "ajv";
import debugUtils from "debug";
import { Router } from "express";

import { authenticate } from "../controllers/auth";
import { ExpressGenericRequestHandler } from "../types/express";
import { FormPOSTBody } from "../types/form";
import { formPostBodySchema } from "../validators/form";

const router = Router();
const debug = debugUtils("backend:route:form");

const create: ExpressGenericRequestHandler<FormPOSTBody> = async (req, res) => {
	const body = req.body;

	debug(body);
	const ajv = new Ajv({ verbose: true });
	const formPostBodySchemaValidator = ajv.compile<FormPOSTBody>(formPostBodySchema);

	const valid = formPostBodySchemaValidator(body);
	if (!valid && formPostBodySchemaValidator.errors) {
		debug(formPostBodySchemaValidator.errors);
		return res.status(400).json({
			message: "Invalid body",
			context: formPostBodySchemaValidator.errors[0].message,
		});
	}

	return res.status(200).json({ message: "OK" });
};

router.post("/create", [authenticate], create);

export default router;
