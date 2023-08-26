export default function Footer() {
	return (
		<div className="flex flex-col items-center justify-center mt-24 py-8 mx-18 border-1 border-solid border-white">
			<img src="/logo.png" className="w-48 h-48" alt="logo" />
			<div className="text-neutral-400 mt-4">
				<span>Copyright © 2023 | KRKN | All rights reserved.</span> <br />
				<span>
					Developed & Designed with ❤️ by{"  "}<span className="text-neutral-200">Curstantine</span>
				</span>
			</div>
		</div>
	);
}
