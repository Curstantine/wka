export interface FormGETParams {
	id: string;
}

export interface FormResponse {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
	questions: FormQuestionResponse<QuestionTypeReflect>[];
}

export interface FormQuestionResponse<T extends QuestionTypeReflect> extends FormQuestion<T> {
	id: string;
}

// --- POST ---
export interface FormPOSTBody {
	title: string;
	questions: FormQuestion<QuestionTypeReflect>[];
}

export interface FormQuestion<Type extends QuestionTypeReflect> {
	type: QuestionTypeReflect;
	title: string;
	data: FormQuestionData[Type];
}

export enum QuestionTypeReflect {
	CATEGORIZE = "CATEGORIZE",
	CLOZE = "CLOZE",
	COMPREHENSION = "COMPREHENSION",
}

export type FormQuestionData = {
	[QuestionTypeReflect.CATEGORIZE]: CategorizeQuestionDataReflect[];
	[QuestionTypeReflect.CLOZE]: ClozeQuestionDataReflect;
	[QuestionTypeReflect.COMPREHENSION]: ComprehensionQuestionDataReflect;
};

export interface CategorizeQuestionDataReflect {
	category: string;
	answers: string[];
}

export interface ClozeQuestionDataReflect {
	indexes: number[];
	sentence: string;
}

export interface ComprehensionQuestionDataReflect {
	content: string;
	questions: ComprehensionQuestionReflect<QuestionTypeFormatReflect>[];
}

export interface ComprehensionQuestionReflect<Type extends QuestionTypeFormatReflect> {
	question: string;
	type: Type;
	opts: ComprehensionQuestionOptsReflect[Type];
}

export enum QuestionTypeFormatReflect {
	SELECT = "SELECT",
	MULTI_SELECT = "MULTI_SELECT",
	TEXT = "TEXT",
}

type ComprehensionQuestionOptsReflect = {
	[QuestionTypeFormatReflect.SELECT]: ComprehensionQuestionValuesOpts;
	[QuestionTypeFormatReflect.MULTI_SELECT]: ComprehensionQuestionCompleteOpts;
	[QuestionTypeFormatReflect.TEXT]: ComprehensionQuestionMinMaxOpts;
};

export interface ComprehensionQuestionMinMaxOpts {
	max?: number;
	min?: number;
}

export interface ComprehensionQuestionValuesOpts {
	values: string[];
}

export interface ComprehensionQuestionCompleteOpts {
	values: string[];
	max?: number;
	min?: number;
}
