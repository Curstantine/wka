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
			<Hero />
			<Contract />
			<Krknomics />
			<Roadmap />
			<Rings />
			<Articles />
			<Join />
		</>
	);
}

export default App;
