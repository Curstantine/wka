import Card from "@/components/Card";

export default function App() {
	return (
		<>
			<Card useAccentedBorder>
				<h1 className="font-roboto text-(3xl text-1) p-(x-6 y-4) decorative-b">
					Assignment Task
				</h1>
				<div className="p-(x-6 y-2) decorative-b">
					<div className="flex items-center text-(sm text-2)">
						<span className="font-bold">johndoe@example.com</span>
						<a href="/" className="flex-1 ml-1 text-primary">Switch account</a>
						<div className="i-symbols-cloud-done-outline h-6 w-6" />
					</div>
					<p className="text-(sm text-2) pt-4">
						The name and photo associated with your Google account will be recorded when you upload files
						and submit this form. Your email is not part of your response.
					</p>
				</div>
				<span className="p-(x-6 t-3 b-4) text-(sm error)">
					*Indicates required question
				</span>
			</Card>
		</>
	);
}
