import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Dashboard() {
	const cookieStore = cookies();
	const sessionToken = cookieStore.get("sessionToken");

	console.log(sessionToken, cookieStore.getAll());
	if (!sessionToken) {
		redirect("/auth/login");
	}

	return <span>hi</span>;
}
