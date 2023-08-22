import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
	useAccentedBorder?: boolean;
	children?: ReactNode;
};

export default function Card({ useAccentedBorder = false, children }: Props) {
	return (
		<div
			className={clsx("flex flex-col bg-background-primary min-h-32 w-full rounded-lg shadow", {
				"border-t-(solid accent 10)": useAccentedBorder,
			})}
		>
			{children}
		</div>
	);
}
