import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { useEffect } from "react";

type TextAnimatedButtonProps = {
	text: string;
};
export function TextAnimatedButton({ text }: TextAnimatedButtonProps) {
	const [props, set] = useSpring(() => ({
		from: { y: 0 },
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
				{text}
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
}
type ArrowButtonProps = {
	reversed?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function ArrowButton({ reversed = false, onClick }: ArrowButtonProps) {
	const [props, set] = useSpring(() => ({
		from: { x: 0 },
		config: { duration: 400, easing: (t) => t * (2 - t) },
	}));

	const onEnter = () => set({ x: 1 });
	const onLeave = () => set({ x: 0 });

	return (
		<animated.button
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onClick={onClick}
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
				className={clsx({
					"transform rotate-180": reversed,
				})}
			>
				<path d="M38.9 50 0 25.1 38.9.3V50zm-24-24.9L31 35.4V14.9L14.9 25.1z"></path>
			</svg>
		</animated.button>
	);
}

export function GoToTopButton() {
	const [props, set] = useSpring(() => ({
		from: { y: 0 },
		config: { duration: 300, easing: (t) => t * (2 - t) },
	}));

	useEffect(() => {
		const onScroll = () => {
			const scrollY = window.scrollY;

			if (scrollY > 500) {
				set({ y: 1 });
			} else {
				set({ y: 0 });
			}
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [set]);

	return (
		<animated.button
			className="fixed bottom-10 right-10 w-12 h-12"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			style={{
				transformOrigin: "center",
				translateY: props.y.to({
					range: [0, 1],
					output: [100, 0],
				}),
				opacity: props.y,
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="49.7"
				height="38.9"
				viewBox="0 0 49.7 38.9"
			>
				<path d="M0 38.9 24.9 0l24.8 38.9Zm24.8-24.1L14.6 30.9h20.5Z"></path>
			</svg>
		</animated.button>
	);
}
