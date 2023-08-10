import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

import { ArrowButton, TextAnimatedButton } from "../components/button";
import NavigationShell from "../components/nav";

import clsx from "clsx";
import Hero0BG from "../assets/hero-0.png";
import Hero1BG from "../assets/hero-1.jpg";
import Hero2BG from "../assets/hero-2.jpg";
import Hero3BG from "../assets/hero-3.jpg";
import Hero4BG from "../assets/hero-4.jpg";

export default function Hero() {
	const [page, setPage] = useState(0);

	const navigatePrev = () =>
		setPage((old) => {
			if (old === 0) return 4;
			return old - 1;
		});

	const navigateNext = () =>
		setPage((old) => {
			if (old === 4) return 0;
			return old + 1;
		});

	return (
		<div className="flex flex-col items-center justify-center h-[100vh] p-16">
			<div className="relative w-full h-full overflow-clip">
				<div className="flex items-end h-full mx-8 pb-6">
					<NavigationShell className="absolute top-10 inset-x-10" />
					{page === 0 && <WeAreSlide />}
					{page === 1 && <HasAwokenSlide />}
					{page === 2 && <HardcoreMemeSlide />}
					{page === 3 && <GibberishSlide />}
					{page === 4 && <DonNotMissSlide />}

					<div className="inline-flex">
						<ArrowButton onClick={navigatePrev} />
						<ArrowButton reversed onClick={navigateNext} />
					</div>
				</div>
				<div className="absolute inset-0 -z-1">
					{page === 0 && <WeAreSlideImage />}
					{page === 1 && <HasAwokenSlideImage />}
					{page === 2 && <HardcoreMemeSlideImage />}
					{page === 3 && <GibberishSlideImage />}
					{page === 4 && <DonNotMissSlideImage />}
				</div>
			</div>
		</div>
	);
}

const SlideView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [props] = useSpring(() => ({
		from: { x: 0 },
		to: { x: 1 },
		config: { duration: 500, easing: (t) => t * (2 - t), delay: 2000 },
	}));

	return (
		<animated.div
			className="flex flex-col w-full"
			style={{
				transformOrigin: "left",
				opacity: props.x.to({
					range: [0, 1],
					output: [0, 1],
				}),
				x: props.x.to({
					range: [0, 1],
					output: [-100, 0],
				}),
			}}
		>
			{children}
		</animated.div>
	);
};

const SlideImageView: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
	const [props] = useSpring(() => ({
		from: { x: 0 },
		to: { x: 1 },
		config: { duration: 500, easing: (t) => t * (2 - t), delay: 2000 },
	}));

	return (
		<animated.img
			src={src}
			className={clsx("w-full object-cover", className)}
			style={{
				transformOrigin: "left",
				opacity: props.x.to({
					range: [0, 1],
					output: [0, 1],
				}),
			}}
		/>
	);
};

const WeAreSlide = () => {
	return (
		<SlideView>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				We are KRKN
			</h1>
			<span className="mb-6">The new era in Ethereum</span>
			<TextAnimatedButton text="Buy on UniSwap" />
		</SlideView>
	);
};

const WeAreSlideImage = () => {
	return <SlideImageView src={Hero0BG} className="h-full" />;
};

const HasAwokenSlide = () => {
	return (
		<SlideView>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				The Kraken has awoken
			</h1>
			<span className="mb-6">And it's hungry...</span>
			<TextAnimatedButton text="DexTools" />
		</SlideView>
	);
};

const HasAwokenSlideImage = () => {
	return <SlideImageView src={Hero1BG} />;
};

const HardcoreMemeSlide = () => {
	return (
		<SlideView>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				The most hardcore meme
			</h1>
			<span className="mb-6">On the Ethereum Network</span>
			<TextAnimatedButton text="Contact" />
		</SlideView>
	);
};

const HardcoreMemeSlideImage = () => {
	return <SlideImageView src={Hero2BG} />;
};

const GibberishSlide = () => {
	return (
		<SlideView>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				PH’NGLUI MGLW’NAFH CTHULHU R’LYEH WGAH’NAGL FHTAGN
			</h1>
			<span className="mb-6">"In his house at R'lyeh dead Cthulhu waits dreaming"</span>
			<TextAnimatedButton text="Twitter" />
		</SlideView>
	);
};

const GibberishSlideImage = () => {
	return <SlideImageView src={Hero3BG} />;
};

const DonNotMissSlide = () => {
	return (
		<SlideView>
			<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
				Don't miss | Don't fade
			</h1>
			<span className="mb-6">The time has come</span>
			<TextAnimatedButton text="Official Telegram" />
		</SlideView>
	);
};

const DonNotMissSlideImage = () => {
	return <SlideImageView src={Hero4BG} />;
};
