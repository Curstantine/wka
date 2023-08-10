import clsx from "clsx";

import GreenRingImg from "../assets/green-ring.jpg";
import PurpleRingImg from "../assets/purple-ring.png";
import RedRingImg from "../assets/red-ring.png";
import TwitterRingImg from "../assets/twitter-ring.png";
import YellowRingImg from "../assets/yellow-ring.jpg";

export default function Join() {
	return (
		<div id="join" className="flex flex-col items-center mt-48">
			<img src="/logo.png" className="w-24 h-24" alt="logo" />
			<h2 className="font-rubik font-bold text-4xl uppercase tracking-wider mt-2 mb-8">Join Us</h2>
			<h3 className="font-rubik font-bold text-2xl uppercase tracking-wide mt-4 mb-4">
				Our Official Groups/Channels
			</h3>
			<div className="grid grid-cols-5 gap-4">
				{links.map((link) => <JoinLink key={link.title!} {...link} />)}
			</div>
		</div>
	);
}

const links: Omit<JoinLinkProps, "key">[] = [
	{
		title: "Main Chat",
		image: GreenRingImg,
	},
	{
		title: "KRKN Army",
		image: RedRingImg,
	},
	{
		title: "KRKNeets",
		image: TwitterRingImg,
	},
	{
		title: "Council/Whales",
		image: PurpleRingImg,
	},
	{
		title: "Announcements",
		image: YellowRingImg,
	},
];

type JoinLinkProps = {
	key: string;
	image: string;
	title: string;
};

const JoinLink: React.FC<JoinLinkProps> = ({ key, title, image }) => {
	return (
		<div
			key={key}
			className={clsx(
				"flex flex-col items-center w-52",
				"transform-gpu hover:scale-105 transition-transform duration-300 ease-emphasized",
			)}
		>
			<img src={image} className="w-52 border-1 border-solid border-white" alt="logo" />
			<h2 className="font-rubik font-medium text-lg uppercase tracking-wider text-center mt-4 mb-8">{title}</h2>
		</div>
	);
};
