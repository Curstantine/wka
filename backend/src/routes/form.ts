import type {
	CategorizeQuestionData,
	ClozeQuestionData,
	ComprehensionQuestion,
	ComprehensionQuestionData,
	Prisma,
} from "@prisma/client";
import debugUtils from "debug";
import { Router } from "express";

import { authenticate } from "../controllers/auth";
import { validateFormBody } from "../controllers/form";
import { handlePrismaErrors } from "../errors/prisma";
import type { ExpressAppLocals, ExpressGenericRequestHandler } from "../types/express";
import {
	type ComprehensionQuestionCompleteOpts,
	type FormPOSTBody,
	type FormQuestion,
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
		return res.status(error.code).json({ message: error.message });
	}

	return res.status(200).json({ message: "OK" });
};

router.post("/create", [authenticate, validateFormBody], create);

export default router;
