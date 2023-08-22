type Props = {
	label: string;
	required?: boolean;
};

export default function CardTitle({ label, required = false }: Props) {
	return (
		<div className="flex items-center px-6 h-12">
			<h2 className="text-text-1">{label}</h2>
			{required && <span className="ml-1 text-error">*</span>}
		</div>
	);
}
