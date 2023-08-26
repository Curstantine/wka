import { GoToTopButton } from "./components/button";
import Footer from "./components/footer";
import { CollapsibleNavigationBar } from "./components/nav";
import Articles from "./pages/articles";
import Contract from "./pages/contract";
import Hero from "./pages/hero";
import Join from "./pages/join";
import Krknomics from "./pages/krknomics";
import Rings from "./pages/rings";
import Roadmap from "./pages/roadmap";

function App() {
	return (
		<>
			<CollapsibleNavigationBar />
			<Hero />
			<Contract />
			<Krknomics />
			<Roadmap />
			<Rings />
			<Articles />
			<Join />
			<Footer />
			<div className="h-8" />
			<GoToTopButton />
		</>
	);
}

export default App;
