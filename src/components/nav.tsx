import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";

export default function NavigationShell({ className = "" }) {
	const destinations = [
		"Home",
		"About",
		"KRKNomics",
		"Roadmap",
		"Team",
		"Ring of KRKN",
		"Articles",
		"Join Us",
	];

	return (
		<div className={clsx("flex items-center mx-4", className)}>
			<img src="/logo.png" alt="logo" className="w-12 h-12" />
			<div className="flex-1 inline-flex justify-end gap-8">
				{destinations.map((destination) => (
					<a
						href="/"
						className={clsx(
							"font-rubik font-bold text-lg h-fit uppercase",
							"border-b-6 border-b-solid border-b-white",
						)}
					>
						{destination}
					</a>
				))}
				<WeirdAhhNavigationExpandButton />
			</div>
		</div>
	);
}

const WeirdAhhNavigationExpandButton = () => {
	const [props, set] = useSpring(() => ({
		from: { x: 0 },
		to: { x: 1 },
		config: { duration: 300, easing: (t) => t * (2 - t) },
	}));

	const onEnter = () => set({ x: 1 });
	const onLeave = () => set({ x: 0 });

	return (
		<button
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="47.25"
				height="35"
				viewBox="0 0 47.25 35"
			>
				<animated.path
					style={{
						transformOrigin: "center",
						translateX: props.x.to({
							range: [0, 1],
							output: [0, -10],
						}),
					}}
					d="M1.25 35a1.176 1.176 0 0 1-.9-.375A1.242 1.242 0 0 1 0 33.75V1.25a1.218 1.218 0 0 1 .35-.9 1.218 1.218 0 0 1 .9-.35H24.6a1.218 1.218 0 0 1 .9.35 1.218 1.218 0 0 1 .35.9v4.7a1.218 1.218 0 0 1-.35.9 1.218 1.218 0 0 1-.9.35H8.65v6.75H23.5a1.176 1.176 0 0 1 .9.375 1.3 1.3 0 0 1 .35.925v4.35a1.242 1.242 0 0 1-.35.875 1.176 1.176 0 0 1-.9.375H8.65v6.95H25a1.218 1.218 0 0 1 .9.35 1.218 1.218 0 0 1 .35.9v4.7a1.242 1.242 0 0 1-.35.875A1.176 1.176 0 0 1 25 35Z"
				>
				</animated.path>
				<animated.path
					style={{
						transformOrigin: "center",
						translateX: props.x.to({
							range: [0, 1],
							output: [0, 10],
						}),
					}}
					d="M46 35a1.176 1.176 0 0 0 .9-.375 1.242 1.242 0 0 0 .35-.875V1.25a1.218 1.218 0 0 0-.35-.9A1.218 1.218 0 0 0 46 0H22.65a1.218 1.218 0 0 0-.9.35 1.218 1.218 0 0 0-.35.9v4.7a1.218 1.218 0 0 0 .35.9 1.218 1.218 0 0 0 .9.35H38.6v6.75H23.75a1.176 1.176 0 0 0-.9.375 1.3 1.3 0 0 0-.35.925v4.35a1.242 1.242 0 0 0 .35.875 1.176 1.176 0 0 0 .9.375H38.6v6.95H22.25a1.218 1.218 0 0 0-.9.35 1.218 1.218 0 0 0-.35.9v4.7a1.242 1.242 0 0 0 .35.875 1.176 1.176 0 0 0 .9.375Z"
				>
				</animated.path>
			</svg>
		</button>
	);
};
