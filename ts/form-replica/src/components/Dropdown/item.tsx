type Props = {
	label: string;
	onClick: () => void;
};
export default function DropdownItem({ label, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className="w-full h-12 px-3 flex items-center text-(sm text-1) hover:(bg-text-2/15)"
		>
			{label}
		</button>
	);
}
