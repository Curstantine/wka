import { APIError } from "@/api/generic";

type Props = {
	error: APIError;
};

export default function ErrorCard({ error }: Props) {
	return (
		<div className="flex flex-row gap-2 items-center bg-red-100 ring-1 ring-red-300 p-2 rounded">
			<div className="icon-[material-symbols--error-outline] h-6 w-6 text-red-600" />
			<div className="inline-flex flex-col">
				<span className="text-sm text-red-600">{error.message}</span>
				{error.context && <span className="text-sm text-red-500">{error.context}</span>}
			</div>
		</div>
	);
}
