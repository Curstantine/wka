import Phase1Img from "../assets/phase-1.png";
import Phase2Img from "../assets/phase-2.png";
import Phase3Img from "../assets/phase-3.png";
import Phase4Img from "../assets/phase-4.png";

export default function Roadmap() {
	return (
		<div id="roadmap" className="flex flex-col items-center pt-48">
			<img src="/logo.png" className="w-24 h-24" alt="logo" />
			<h2 className="font-rubik font-bold text-4xl uppercase tracking-wider mt-2 mb-8">Roadmap</h2>
			<div className="grid grid-cols-4 gap-4">
				{phases.map((phase) => <PhaseComponent key={phase.title!} {...phase} />)}
			</div>
		</div>
	);
}

const phases: Omit<PhaseComponentProps, "key">[] = [
	{
		title: "Phase 01",
		image: Phase1Img,
		points: [
			"TULU Conceptualization",
			"Launch on UniSwap",
			"V1 Whitepaper (DeathPaper)",
			"First run of our Marketing campaign.",
			"Audit",
			"DAO Creation and launch.",
			"First Run for listings (e.g. nomics.)",
			"v1 Website / Socials",
		],
	},
	{
		title: "Phase 02",
		image: Phase2Img,
		points: [
			"v2 Website",
			"$KTL Treasury",
			"Team Expansion",
			"Whitepaper V2 (DeathPaper)",
		],
	},
	{
		title: "Phase 03",
		image: Phase3Img,
		points: [
			"Over 1000 Holders",
			"LISTINGS (CoinGecko / Coin Market Cap)",
			"Collaborations (Partnerships with influencers and other projects)",
			"CEX Listings",
			"Project Onboardings",
		],
	},
	{
		title: "Phase 04",
		image: Phase4Img,
		points: [
			"Launch of “KTULU’S Blessing” (Still at a very early stage of conception and anything could change)",
			"More to come…",
		],
	},
];

type PhaseComponentProps = {
	key: string;
	title: string;
	image: string;
	points: string[];
};

const PhaseComponent: React.FC<PhaseComponentProps> = ({ key, title, image, points }) => {
	return (
		<div key={key} className="flex flex-col items-center w-64">
			<img src={image} alt={title} className="w-56" />
			<h3 className="font-rubik font-bold text-2xl uppercase tracking-wider mt-2 mb-8">{title}</h3>
			<ul>
				{points.map((point, index) => <li key={index} className="text-neutral-400">{point}</li>)}
			</ul>
		</div>
	);
};
