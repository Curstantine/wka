import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

import { JWTUser } from "./auth";

export interface ExpressRequestLocals {
	user?: JWTUser;
}

export interface ExpressAppLocals {
	prisma: PrismaClient;
}

export interface ExpressResponseResult<T> {
	type: "ok" | "error";
	error?: { message: string; context?: string };
	data?: T;
}

export type ExpressGenericRequestHandler<ReqBody = {}, Params = {}, ResBody = {}> = RequestHandler<
	Params,
	ExpressResponseResult<ResBody>,
	ReqBody,
	{},
	ExpressRequestLocals
>;
