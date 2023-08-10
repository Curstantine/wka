import PurpleRingImg from "../assets/purple-ring.png";
import RedRingImg from "../assets/red-ring.png";
import WhiteRingImg from "../assets/white-ring.png";

export default function Rings() {
	return (
		<div id="rings" className="flex flex-col items-center mt-48">
			<div className="grid grid-cols-3 gap-24">
				{rings.map((ring) => <RingComponent key={ring.title!} {...ring} />)}
			</div>
		</div>
	);
}

const rings: Omit<RingComponentProps, "key">[] = [
	{
		title: "White Ring of KRKN",
		description: [
			"DEV TEAM will be recognized by the White Ring of KTULU.",
			"*NO ONE is allowed to use the “White” profile picture.",
		],
		image: WhiteRingImg,
	},
	{
		title: "Purple Ring of KRKN",
		description: [
			"WHALES will be recognized by the Purple Ring of KTULU.",
			"*NO ONE is allowed to use the “Purple” profile picture except the verified by team whales.",
		],
		image: PurpleRingImg,
	},
	{
		title: "Red Ring of KRKN",
		description: [
			"BELIEVERS and members will be recognized by the Red Ring of KTULU.",
		],
		image: RedRingImg,
	},
];

type RingComponentProps = {
	key: string;
	image: string;
	title: string;
	description: string[];
};

const RingComponent: React.FC<RingComponentProps> = ({ key, title, description, image }) => {
	return (
		<div key={key} className="flex flex-col items-center w-64">
			<img src={image} className="w-56 border-1 border-solid border-white" alt="logo" />
			<h2 className="font-rubik font-bold text-2xl uppercase tracking-wider text-center mt-4 mb-8">{title}</h2>
			<div className="text-neutral-400">{description.map((desc) => <p>{desc}</p>)}</div>
		</div>
	);
};
