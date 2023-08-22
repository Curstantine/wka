import clsx from "clsx";
import { type FC, useState } from "react";

type Props = {
	items: string[][];
};

export default function List(props: Props) {
	const [selected, setSelectedId] = useState<string | null>(null);

	return (
		<fieldset className="flex flex-col px-6 pb-4">
			{props.items.map((item) => (
				<ListItem
					label={item[1]}
					selected={selected === item[0]}
					onPress={() => setSelectedId(item[0])}
				/>
			))}
		</fieldset>
	);
}

const ListItem: FC<{ label: string; selected: boolean; onPress: () => void }> = (
	{ label, selected, onPress },
) => {
	return (
		<div className="flex flex-row items-center h-10" onClick={onPress} aria-checked={selected}>
			<div className="inline-flex center w-10 h-10 rounded-full transition-colors transition-standard hover:bg-accent/5 active:bg-accent/20">
				<div className="inline-flex center rounded-full h-5 w-5 border-(solid 2 text-2)">
					<div
						className={clsx(
							"bg-accent h-2.5 w-2.5 rounded-full",
							"transition-transform transform-gpu duration-standard ease-standard",
							{
								"scale-0": !selected,
								"scale-100": selected,
							},
						)}
					/>
				</div>
			</div>
			<span className="text-(sm text-1) select-none">{label}</span>
		</div>
	);
};
