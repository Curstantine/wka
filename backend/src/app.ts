import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import authRouter from "./routes/auth";
import rootRouter from "./routes/root";

const app = express();
app.locals.prisma = new PrismaClient();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", rootRouter);
app.use("/auth", authRouter);

export default app;
