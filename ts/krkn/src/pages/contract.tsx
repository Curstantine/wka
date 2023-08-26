import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Contract() {
	return (
		<div id="contract" className="flex flex-col px-12 py-4">
			<h2 className="font-rubik font-bold text-3xl uppercase tracking-wide mb-2">Contract</h2>
			<CopyableCode content="0x2fec5b062c4dad3f2de6abcffc69b524a5010a41" />
		</div>
	);
}

const CopyableCode: React.FC<{ content: string }> = ({ content }) => {
	const [isCopied, setCopyStatus] = useState(false);

	const [props, set] = useSpring(() => ({
		from: { x: 0 },
		config: { duration: 300, easing: (t) => t * (2 - t) },
	}));

	const onEnter = () => set({ x: 1 });
	const onLeave = () => set({ x: 0 });
	const onCopy = () => {
		navigator.clipboard.writeText(content);
		setCopyStatus(true);
	};

	useEffect(() => {
		if (isCopied) {
			const timeout = setTimeout(() => setCopyStatus(false), 1000);
			return () => clearTimeout(timeout);
		}
	}, [isCopied]);

	return (
		<code className="relative px-4 py-3 bg-neutral-800 w-fit" onMouseEnter={onEnter} onMouseLeave={onLeave}>
			{content}
			<animated.button
				style={{
					transformOrigin: "right",
					opacity: props.x,
					display: props.x.to((x) => (x === 0 ? "none" : "block")),
				}}
				className={clsx(
					"absolute right-1 inset-y-2 px-4 shadow text-sm z-10 cursor-pointer",
					"bg-neutral-900 text-neutral-100",
				)}
				onClick={onCopy}
			>
				{isCopied ? "Copied!" : "Copy"}
			</animated.button>
		</code>
	);
};
