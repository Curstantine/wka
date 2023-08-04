import debugUtils from "debug";
import { Router } from "express";

import { authenticate } from "../controllers/auth";
import { ExpressGenericRequestHandler } from "../types/express";

const router = Router();
const debug = debugUtils("backend:route:form");

const create: ExpressGenericRequestHandler = async (req, res) => {
	res.status(200).json({ message: "Form created" });
};

router.post("/create", [authenticate], create);

export default router;
