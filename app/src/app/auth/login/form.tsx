"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { login } from "@/api/auth";
import { APIError } from "@/api/generic";
import ErrorCard from "@/components/ErrorCard";
import InputField from "@/components/InputField";
import { email, minLength, required } from "@/utils/validators";

const onSubmit = (
	setError: Dispatch<SetStateAction<APIError | null>>,
) =>
async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	const formData = new FormData(e.currentTarget);
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const result = await login(email, password);
	console.log(result);

	if (result.error) {
		setError(result.error!);
	}
};

export default function Form() {
	const [error, setError] = useState<APIError | null>(null);

	return (
		<form className="flex flex-col h-full gap-4" onSubmit={onSubmit(setError)}>
			{error && <ErrorCard error={error!} />}
			<InputField
				label="Email"
				name={"email"}
				type="email"
				validators={[required, email]}
			/>
			<InputField
				label="Password"
				name={"password"}
				type="password"
				validators={[required, minLength(6)]}
			/>
			<Link className="text-xs -mt-2" href="/auth/create">
				Don&apos;t have an account yet?
			</Link>
			<div className="flex-1" />
			<button className={"btn-primary"}>Log in</button>
		</form>
	);
}
