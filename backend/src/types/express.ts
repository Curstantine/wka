import { PrismaClient } from "@prisma/client";
import { JWTUser } from "../controllers/auth";

export interface ExpressGlobalLocals {
	user: JWTUser;
	prisma: PrismaClient;
}
