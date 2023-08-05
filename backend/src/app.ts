import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import authRouter from "./routes/auth";
import formRouter from "./routes/form";
import rootRouter from "./routes/root";

const app = express();
app.locals.prisma = new PrismaClient();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	next();
});

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/form", formRouter);

export default app;
