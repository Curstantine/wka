"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ErrorCard from "@/components/ErrorCard";
import InputField from "@/components/InputField";

import { login } from "@/api/auth";
import { APIError } from "@/api/generic";
import { setBrowserCookie } from "@/utils/cookies";
import { email, minLength, required } from "@/utils/validators";

const useSubmit = () => {
	const router = useRouter();
	const [error, setError] = useState<APIError | null>(null);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const result = await login(email, password);
		if (result.error) {
			return setError(result.error!);
		}

		localStorage.setItem("refreshToken", result.data!.refreshToken);
		setBrowserCookie(
			"sessionToken",
			result.data!.sessionToken,
			60 * 60 * 1000,
		);

		router.push("/");
	};

	return { error, submit };
};

export default function Form() {
	const { error, submit } = useSubmit();

	return (
		<form className="flex flex-col h-full gap-4" onSubmit={submit}>
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
