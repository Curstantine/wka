type Props = {
	items: string[][];
};

export default function List(props: Props) {
	return (
		<fieldset className="flex flex-col px-6 pb-4">
			{props.items.map((item, index) => (
				<div className="flex flex-row items-center gap-3 h-10" key={item[0]}>
					<input type="radio" id={item[0]} name={item[0]} value={item} />
					<label htmlFor={item[0]} className="text-text-1">{item[1]}</label>
				</div>
			))}
		</fieldset>
	);
}
