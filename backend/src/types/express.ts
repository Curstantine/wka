import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { JWTUser } from "../controllers/auth";

export interface ExpressRequestLocals {
	user?: JWTUser;
}

export interface ExpressAppLocals {
	prisma: PrismaClient;
}

export type ExpressGenericRequestHandler<ReqBody = {}> = RequestHandler<{}, {}, ReqBody, {}, ExpressRequestLocals>;
