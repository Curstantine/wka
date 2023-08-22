import { useState } from "react";

import CheckboxItem from "./item";

type Props = {
	items: string[][];
};

export default function CheckboxGroup(props: Props) {
	const [selected, setSelectedId] = useState<string | null>(null);

	return (
		<fieldset className="flex flex-col px-6 pb-4">
			{props.items.map((item) => (
				<CheckboxItem
					label={item[1]}
					selected={selected === item[0]}
					onPress={() => setSelectedId(item[0])}
				/>
			))}
		</fieldset>
	);
}
