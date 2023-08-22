import Card from "@/components/Card";
import CardTitle from "@/components/Card/Title";
import CheckboxGroup from "@/components/Checkbox";
import RadioGroup from "@/components/Radio";

const options = [
	["1", "Option 1"],
	["2", "Option 2"],
	["3", "Option 3"],
];

export default function App() {
	return (
		<>
			<Card useAccentedBorder>
				<h1 className="font-roboto text-(3xl text-1) p-(x-6 b-4 t-1) decorative-b">
					Assignment Task
				</h1>
				<div className="p-(x-6 y-3) decorative-b">
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
				<span className="p-(x-6 t-3) text-(sm error)">
					*Indicates required question
				</span>
			</Card>

			<Card>
				<CardTitle label="MCQ" required />
				<RadioGroup items={options} />
			</Card>

			<Card>
				<CardTitle label="Checkbox" required />
				<CheckboxGroup items={options} />
			</Card>
		</>
	);
}
