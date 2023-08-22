import { useState } from "react";

import ListItem from "@/components/Radio/Item";

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
