import { defineConfig, presetUno, presetWebFonts } from "unocss";
import type { Theme } from "unocss/preset-uno";

export default defineConfig<Theme>({
	presets: [
		presetUno(),
		presetWebFonts({
			fonts: {
				"mono": ["Space Mono", "monospace"],
			},
		}),
	],
	theme: {
		easing: {
			emphasized: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
			standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
		},
		colors: {
			accent: "#6dc281",
		},
	},
});
