type Props = {
	label: string;
	required?: boolean;
};

export default function CardTitle({ label, required = false }: Props) {
	return (
		<div className="flex items-center h-12">
			<h2>{label}</h2>
			{label && <span>*</span>}
		</div>
	);
}
