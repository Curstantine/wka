import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import rootRouter from "./routes/root";

const app = express();
const prisma = new PrismaClient();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", rootRouter);

app.locals.prisma = prisma;

export default app;
