import clsx from "clsx";

type Props = {
	label: string;
	selected: boolean;
	onPress: () => void;
};

export default function CheckboxItem({ label, selected, onPress }: Props) {
	return (
		<div className="flex flex-row items-center h-10" onClick={onPress} aria-checked={selected}>
			<div className="inline-flex center w-10 h-10 rounded-full transition-colors transition-standard hover:bg-accent/5 active:bg-accent/20">
				<div className="relative inline-flex center rounded h-5 w-5 border-(solid 2 text-2)">
					<div
						className={clsx(
							"i-symbols-check absolute text-white h-5.5 w-5.5 -top-0.75 -left-0.75 z-10 transition-opacity transition-emphasized",
							{ "opacity-0": !selected, "opacity-100": selected },
						)}
					/>
					<div
						className={clsx(
							"bg-accent h-full w-full",
							"transition-transform transform-gpu duration-standard ease-standard",
							{ "scale-0 rounded-full": !selected, "scale-100 rounded-0": selected },
						)}
					>
					</div>
				</div>
			</div>
			<span className="text-(sm text-1) select-none">{label}</span>
		</div>
	);
}
