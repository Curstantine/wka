import KrknHeroBG from "../assets/Hero_BG_main1.png";
import { ArrowButton, TextAnimatedButton } from "../components/button";
import NavigationShell from "../components/nav";

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-center h-[100vh] p-24">
			<div className="relative w-full h-full">
				<NavigationShell />
				<div className="flex items-end h-full mx-8 pb-6">
					<div className="flex flex-col w-full">
						<WeAreSlide />
					</div>
					<div className="inline-flex">
						<ArrowButton />
						<ArrowButton reversed />
					</div>
				</div>
				<div className="absolute inset-0 -z-1">
					<img src={KrknHeroBG} alt="KrknHeroBG" className="h-full w-full object-cover" />
				</div>
			</div>
		</div>
	);
}

const WeAreSlide = () => {
	return (
		<>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				We are KRKN
			</h1>
			<span className="mb-6">The new era in Ethereum</span>
			<TextAnimatedButton text="Buy on UniSwap" />
		</>
	);
};
