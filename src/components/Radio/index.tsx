import { useState } from "react";

import RadioItem from "@/components/Radio/item";

type Props = {
	items: string[][];
};

export default function RadioGroup(props: Props) {
	const [selected, setSelectedId] = useState<string | null>(null);

	return (
		<fieldset className="flex flex-col px-6 pb-4">
			{props.items.map((item) => (
				<RadioItem
					key={item[0]}
					label={item[1]}
					selected={selected === item[0]}
					onPress={() => setSelectedId(item[0])}
				/>
			))}
		</fieldset>
	);
}
