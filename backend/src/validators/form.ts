import { JSONSchemaType } from "ajv";
import { FormPOSTBody } from "../types/form";

export const formPostBodySchema: JSONSchemaType<FormPOSTBody> = {
	"$schema": "http://json-schema.org/draft-07/schema#",
	type: "object",
	required: ["title", "questions"],
	properties: {
		title: { type: "string" },
		questions: {
			type: "array",
			items: {
				type: "object",
				required: ["type", "data"],
				properties: {
					type: { $ref: "#/definitions/QuestionTypeReflect" },
					data: {
						anyOf: [
							{
								type: "array",
								minItems: 1,
								items: { $ref: "#/definitions/CategorizeQuestionDataReflect" },
							},
							{ $ref: "#/definitions/ClozeQuestionDataReflect" },
							{ $ref: "#/definitions/ComprehensionQuestionDataReflect" },
						],
					},
				},
			},
		},
	},
	definitions: {
		CategorizeQuestionDataReflect: {
			type: "object",
			required: ["category", "answers"],
			properties: {
				category: { type: "string" },
				answers: {
					type: "array",
					minItems: 1,
					items: { type: "string" },
				},
			},
		},
		ClozeQuestionDataReflect: {
			type: "object",
			required: ["indexes", "sentence"],
			properties: {
				indexes: {
					type: "array",
					minItems: 1,
					items: { type: "number" },
				},
				sentence: { type: "string" },
			},
		},
		// @ts-expect-error  check anyof here
		ComprehensionQuestionDataReflect: {
			type: "object",
			required: ["content", "questions"],
			properties: {
				content: { type: "string" },
				questions: {
					type: "array",
					minItems: 1,
					items: { $ref: "#/definitions/ComprehensionQuestionReflect" },
				},
			},
		},
		ComprehensionQuestionReflect: {
			type: "object",
			required: ["question", "type", "opts"],
			properties: {
				question: { type: "string" },
				type: { $ref: "#/definitions/QuestionTypeFormatReflect" },
				opts: {
					type: "object",
					required: [],
					anyOf: [
						{ $ref: "#/definitions/ComprehensionQuestionValuesOpts" },
						{ $ref: "#/definitions/ComprehensionQuestionMinMaxOpts" },
						{ $ref: "#/definitions/ComprehensionQuestionCompleteOpts" },
					],
				},
			},
		},
		ComprehensionQuestionMinMaxOpts: {
			type: "object",
			required: [],
			properties: {
				max: { type: "number" },
				min: { type: "number" },
			},
		},
		ComprehensionQuestionValuesOpts: {
			type: "object",
			required: ["values"],
			properties: {
				values: {
					type: "array",
					minItems: 1,
					items: { type: "string" },
				},
			},
		},
		ComprehensionQuestionCompleteOpts: {
			type: "object",
			required: ["values"],
			properties: {
				values: {
					type: "array",
					minItems: 1,
					items: { type: "string" },
				},
				max: { type: "number" },
				min: { type: "number" },
			},
		},
		QuestionTypeReflect: {
			type: "string",
			enum: ["CATEGORIZE", "CLOZE", "COMPREHENSION"],
		},
		QuestionTypeFormatReflect: {
			type: "string",
			enum: ["SELECT", "MULTI_SELECT", "TEXT"],
		},
	},
};
