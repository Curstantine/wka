import react from "@vitejs/plugin-react-swc";
import { resolve as resolvePath } from "node:path";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [UnoCSS(), react()],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolvePath("src"),
			},
		],
	},
});
