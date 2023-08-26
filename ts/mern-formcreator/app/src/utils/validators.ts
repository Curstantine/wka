export type Validator = (value: string) => string | null;

export const required: Validator = (value) => {
	return value ? null : "Required";
};

export const email: Validator = (value) => {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
		? "Invalid email address"
		: null;
};

export const minLength = (min: number): Validator => (value) => {
	return value && value.length < min ? `Must be ${min} characters or more` : null;
};

export const maxLength = (max: number): Validator => (value) => {
	return value && value.length > max ? `Must be ${max} characters or less` : null;
};
