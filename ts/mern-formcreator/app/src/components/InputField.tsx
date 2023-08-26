import clsx from "clsx";
import { useState } from "react";

import { Validator } from "@/utils/validators";

type Props = {
	label: string;
	name: string;
	validators?: Validator[];
	type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

export default function InputField({ name, label, type = "text", validators = [] }: Props) {
	const [errors, setErrors] = useState<string | null>(null);

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (!validators || validators.length === 0) return;

		const value = e.currentTarget.value;
		let current: string | null = null;

		for (const validator of validators) {
			const error = validator(value);
			if (error) {
				current = error;
				continue;
			}
		}

		if (!current) setErrors(null);
		else setErrors(current);
	};

	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="text-sm font-medium text-neutral-500">{label}</label>
			<input
				id={name}
				type={type}
				name={name}
				onChange={onChange}
				className={clsx(
					"h-10 rounded text-base px-2",
					"transition-all duration-300 ease-emphasized",
					"focus:outline-none focus:ring-pink-500 focus:border-transparent",
					"ring-1 ring-neutral-200",
					{
						"ring-red-500": errors,
					},
				)}
			/>
			{errors && <span className="text-xs text-red-500 pt-1">{errors}</span>}
		</div>
	);
}
