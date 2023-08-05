"use client";

import Link from "next/link";

import InputField from "@/components/InputField";
import { email, minLength, required } from "@/utils/validators";

export default function Form() {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className="flex flex-col h-full gap-4" onSubmit={onSubmit}>
			<InputField
				label="Username"
				name={"username"}
				validators={[required, minLength(3)]}
			/>
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
			<Link className="text-xs -mt-2" href="/auth/login">
				I already have an account!
			</Link>
			<div className="flex-1" />
			<button className={"btn-primary"}>Create</button>
		</form>
	);
}
