export default function Textbox() {
	return (
		<div className="px-6 pt-4">
			<input
				type="text"
				className="min-w-72 h-7 border-b-(solid 1 border) placeholder:(text-(sm text-2))"
				placeholder="Your answer"
			/>
		</div>
	);
}
