import Image from "next/image";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<main className="relative h-screen w-screen px-8 py-8 bg-white">
			<Image
				src="/pastel-bg.jpg"
				className="top-0 left-0 object-cover"
				alt="background"
				fill={true}
				aria-hidden="true"
			/>
			<div className="flex items-center justify-end h-full container mx-auto">
				<div className="flex flex-col w-96 h-fit bg-white rounded-md px-4 py-6 z-10">
					{children}
				</div>
			</div>
		</main>
	);
}
