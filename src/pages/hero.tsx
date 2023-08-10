import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";

import KrknHeroBG from "../assets/Hero_BG_main1.png";
import NavigationShell from "../components/nav";

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-center h-[100vh] p-24">
			<div className="relative w-full h-full">
				<NavigationShell />
				<div className="flex items-end h-full mx-8 pb-6">
					<div className="flex flex-col w-full">
						<h1 className="mb-2 text-5xl tracking-wide font-rubik font-bold tracking-wider uppercase">
							We are KRKN
						</h1>
						<span className="mb-6">The new era in Ethereum</span>
						<Button />
					</div>
					<div className="inline-flex">
						<Arrow />
						<Arrow reversed />
					</div>
				</div>
				<div className="absolute inset-0 -z-1">
					<img src={KrknHeroBG} alt="KrknHeroBG" className="h-full w-full object-cover" />
				</div>
			</div>
		</div>
	);
}

const Button = () => {
	const [props, set] = useSpring(() => ({
		from: { y: 0 },
		to: { y: 1 },
		config: { duration: 400, easing: (t) => t * (2 - t) },
	}));

	const onEnter = () => set({ y: 1 });
	const onLeave = () => set({ y: 0 });

	return (
		<button
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			className={clsx(
				"relative inline-flex flex-col items-center justify-center w-72 h-13",
				"border-1 border-solid border-white bg-transparent",
			)}
		>
			<animated.label
				className="font-rubik font-medium text-lg uppercase z-10"
				style={{
					transformOrigin: "bottom",
					color: props.y.to({
						range: [0, 1],
						output: ["#fff", "#000"],
					}),
				}}
			>
				Buy on UniSwap
			</animated.label>
			<animated.div
				className="absolute inset-x-1 bottom-1 h-full bg-white ease-emphasized"
				style={{
					height: "calc(100% - 0.5rem)",
					transformOrigin: "bottom",
					scaleY: props.y.to({
						range: [0, 1],
						output: [0.1, 1],
					}),
				}}
			>
			</animated.div>
		</button>
	);
};

const Arrow = ({ reversed = false }) => {
	const [props, set] = useSpring(() => ({
		from: { x: 0 },
		to: { x: 1 },
		config: { duration: 400, easing: (t) => t * (2 - t) },
	}));

	const onEnter = () => set({ x: 1 });
	const onLeave = () => set({ x: 0 });

	return (
		<animated.button
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			style={{
				transformOrigin: "center",
				translateX: props.x.to({
					range: [0, 1],
					output: [0, reversed ? 10 : -10],
				}),
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="39"
				height="50"
				viewBox="0 0 39 50"
				xmlSpace="preserve"
				className={clsx("fill-current text-white", reversed && "transform rotate-180")}
			>
				<path d="M38.9 50 0 25.1 38.9.3V50zm-24-24.9L31 35.4V14.9L14.9 25.1z"></path>
			</svg>
		</animated.button>
	);
};
