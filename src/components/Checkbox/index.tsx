import { useState } from "react";

import CheckboxItem from "./item";

type Props = {
	items: [string, string][];
};

export default function CheckboxGroup(props: Props) {
	const [selected, setSelectedId] = useState<string[] | null>(null);

	return (
		<fieldset className="flex flex-col px-6 pb-4">
			{props.items.map((item) => (
				<CheckboxItem
					key={item[0]}
					label={item[1]}
					selected={selected?.includes(item[0]) ?? false}
					onPress={() =>
						setSelectedId((prev) => {
							if (prev === null) return [item[0]];
							if (prev.includes(item[0])) return prev.filter((id) => id !== item[0]);
							return [...prev, item[0]];
						})}
				/>
			))}
		</fieldset>
	);
}
