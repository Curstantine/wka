import clsx from "clsx";
import { FocusEventHandler, type MouseEventHandler, useRef, useState } from "react";

import DropdownItem from "@/components/Dropdown/item";

type Props = {
	items: [string, string][];
};

export default function Dropdown({ items }: Props) {
	const [open, setOpen] = useState(false);
	const direction = useRef<"up" | "down">("down");

	const [selected, setSelectedId] = useState<string | null>(null);

	const tryOpen: MouseEventHandler<HTMLDivElement> = (e) => {
		const { top, bottom } = e.currentTarget.getBoundingClientRect();
		const { height } = document.documentElement.getBoundingClientRect();

		if (top > height - bottom) {
			direction.current = "up";
		} else {
			direction.current = "down";
		}

		setOpen(true);
	};

	const onBlur: FocusEventHandler<HTMLDivElement> = (e) => {
		if (
			e.relatedTarget instanceof HTMLElement && e.currentTarget.contains(e.relatedTarget)
		) {
			console.log("related target is inside", { isOpen: open });
			return;
		}

		setOpen(false);
	};

	const onSelection = (id: string) => {
		setOpen(false);
		setSelectedId(id);
	};

	return (
		<div className="px-6 pt-4">
			<div
				onClick={tryOpen}
				onBlur={onBlur}
				aria-haspopup="listbox"
				aria-expanded={open}
				className={clsx(
					"relative flex items-center px-3 h-12 w-42 rounded text-sm",
					{ "text-1": selected, "text-text-2": !selected },
					"border-(solid 1 border)",
					"transition-colors transition-standard",
					"active:(bg-background-secondary)",
				)}
			>
				<span className="flex-1 text-start">{selected ?? "Choose"}</span>
				<div className="i-symbols-arrow-drop-down w-5 h-5" />

				{open && (
					<div
						className={clsx(
							"absolute w-42 bg-background-primary py-2 rounded shadow-lg left-0 z-20",
							{ "top-0": direction.current === "up", "bottom-0": direction.current === "down" },
						)}
					>
						<div className="pb-2 border-b-(solid 1 border) ">
							<div
								className={clsx("flex items-center h-12 px-3", { "bg-primary/10": selected === null })}
							>
								Choose
							</div>
						</div>
						{items.map((item) => (
							<DropdownItem
								key={item[0]}
								label={item[1]}
								onClick={() => onSelection(item[0])}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
