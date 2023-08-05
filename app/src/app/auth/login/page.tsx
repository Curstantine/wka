import { Metadata } from "next";

import Form from "@/app/auth/login/form";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return (
		<>
			<h1 className="text-2xl font-bold">Auth/Login</h1>
			<span className="text-sm text-neutral-500 mb-8">Authenticate to continue</span>

			<Form />
		</>
	);
}
