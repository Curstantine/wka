import type {
	CategorizeQuestionData,
	ClozeQuestionData,
	ComprehensionQuestion,
	ComprehensionQuestionData,
	Prisma,
	Question,
} from "@prisma/client";
import debugUtils from "debug";
import { Router } from "express";

import { authenticate } from "../controllers/auth";
import { validateFormBody } from "../controllers/form";
import { ResponseResult } from "../controllers/response";
import { handlePrismaErrors } from "../errors/prisma";
import type { ExpressAppLocals, ExpressGenericRequestHandler } from "../types/express";
import {
	CategorizeQuestionDataReflect,
	type ComprehensionQuestionCompleteOpts,
	ComprehensionQuestionDataReflect,
	ComprehensionQuestionReflect,
	FormGETParams,
	type FormPOSTBody,
	type FormQuestion,
	FormQuestionData,
	FormQuestionResponse,
	FormResponse,
	QuestionTypeFormatReflect,
	QuestionTypeReflect,
} from "../types/form";

const router = Router();
const debug = debugUtils("backend:route:form");

function convertToPrismaQuestion<T extends QuestionTypeReflect>(
	self: FormQuestion<T>,
): Prisma.QuestionUncheckedCreateWithoutFormInput {
	let categorize: CategorizeQuestionData[] = [];
	let cloze: ClozeQuestionData | null = null;
	let comprehension: ComprehensionQuestionData | null = null;

	switch (self.type) {
		case QuestionTypeReflect.CATEGORIZE:
			const sl = self as FormQuestion<QuestionTypeReflect.CATEGORIZE>;
			categorize = sl.data;
			break;
		case QuestionTypeReflect.CLOZE:
			const cl = self as FormQuestion<QuestionTypeReflect.CLOZE>;
			cloze = cl.data;
			break;
		case QuestionTypeReflect.COMPREHENSION:
			const cm = self as FormQuestion<QuestionTypeReflect.COMPREHENSION>;
			const questions: ComprehensionQuestion[] = cm.data.questions.map((q) => {
				const opts = q.opts as Partial<ComprehensionQuestionCompleteOpts>;

				return {
					question: q.question,
					type: q.type,
					opts: {
						max: opts.max || null,
						min: opts.min || null,
						values: opts.values || [],
					},
				};
			});

			comprehension = { content: cm.data.content, questions };
			break;
	}

	return {
		type: self.type,
		title: self.title,
		data: { categorize, cloze, comprehension },
	};
}

function convertToSelfQuestion<T extends QuestionTypeReflect>(
	prisma: Question,
): FormQuestionResponse<T> {
	let data: unknown;

	switch (prisma.type) {
		case QuestionTypeReflect.CATEGORIZE:
			const ca: CategorizeQuestionDataReflect[] = prisma.data.categorize;
			data = ca;
			break;
		case QuestionTypeReflect.CLOZE:
			const cl: ClozeQuestionData = prisma.data.cloze!;
			data = cl;
			break;
		case QuestionTypeReflect.COMPREHENSION:
			const cm = prisma.data.comprehension!;
			const questions: ComprehensionQuestionReflect<QuestionTypeFormatReflect>[] = cm
				.questions.map((q) => {
					return {
						question: q.question,
						type: QuestionTypeFormatReflect[q.type],
						opts: {
							max: q.opts.max || undefined,
							min: q.opts.min || undefined,
							values: q.opts.values || [],
						},
					};
				});

			const reflect: ComprehensionQuestionDataReflect = {
				content: cm.content,
				questions,
			};

			data = reflect;
			break;
	}

	return {
		id: prisma.id,
		title: prisma.title,
		type: QuestionTypeReflect[prisma.type],
		data: data as FormQuestionData[T],
	};
}

const get: ExpressGenericRequestHandler<unknown, FormGETParams, FormResponse> = async (
	req,
	res,
) => {
	const { prisma } = req.app.locals as ExpressAppLocals;
	const { id } = req.params;

	try {
		const form = await prisma.form.findUnique({
			where: { id },
			include: { questions: true },
		});

		if (!form) {
			return res.status(404).json(ResponseResult.error({ message: "Form not found" }));
		}

		return res.status(200).json(ResponseResult.ok({
			id: form.id,
			title: form.title,
			userId: form.userId,
			createdAt: form.createdAt.toISOString(),
			updatedAt: form.updatedAt.toISOString(),
			questions: form.questions.map((q) => convertToSelfQuestion(q)),
		}));
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {});
		return res.status(error.code).json(ResponseResult.error(error));
	}
};

const create: ExpressGenericRequestHandler<FormPOSTBody> = async (req, res) => {
	const { prisma } = req.app.locals as ExpressAppLocals;
	const user = res.locals.user!; // <- We already have an auth guard for this.

	try {
		const { title, questions } = req.body;

		await prisma.form.create({
			data: {
				title,
				userId: user.id,
				questions: {
					create: questions.map((q) => convertToPrismaQuestion(q)),
				},
			},
		});
	} catch (e) {
		debug(e);
		const error = handlePrismaErrors(e, {});
		return res.status(error.code).json(ResponseResult.error(error));
	}

	return res.status(200).json(ResponseResult.ok({ message: "Form created" }));
};

router.get("/:id", get);
router.post("/create", [authenticate, validateFormBody], create);

export default router;
