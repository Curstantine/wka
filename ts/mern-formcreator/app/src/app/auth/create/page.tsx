import { Metadata } from "next";

import Form from "@/app/auth/create/form";

export const metadata: Metadata = {
	title: "Create an account",
};

export default function Page() {
	return (
		<>
			<h1 className="text-2xl font-bold">Auth/Create</h1>
			<span className="text-sm text-neutral-500 mb-8">Create an account</span>
			<Form />
		</>
	);
}
