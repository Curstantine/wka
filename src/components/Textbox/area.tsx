import clsx from "clsx";

export default function Textbox() {
	const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const element = e.currentTarget;
		element.style.height = "1px";
		element.style.height = (element.scrollHeight) + "px";
	};

	return (
		<div className="px-6 pt-4">
			<textarea
				onInput={onInput}
				className={clsx(
					"w-full min-h-7 h-[1px] placeholder:(text-(sm text-2)) resize-none overflow-hidden",
					"transition-colors transition-standard",
					"border-b-(solid 1 border) focus:(border-b-(2 accent))",
				)}
				placeholder="Your answer"
			/>
		</div>
	);
}
