import type { IconifyJSON } from "@iconify/types";
import {
	Awaitable,
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import type { Theme } from "unocss/preset-uno";

const importIconCollection = (name: string): () => Awaitable<IconifyJSON> => {
	return async () => {
		const { default: icons } = await import(`@iconify-json/${name}/icons.json`);
		return icons;
	};
};

export default defineConfig<Theme>({
	presets: [
		presetUno({}),
		presetIcons({
			collections: {
				symbols: importIconCollection("material-symbols"),
				mdi: importIconCollection("mdi"),
			},
		}),
		presetWebFonts({
			fonts: {
				roboto: {
					name: "Roboto",
					weights: [400, 500, 700],
					provider: "google",
				},
				open: {
					name: "Open Sans",
					weights: [700, 900],
					provider: "google",
				},
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	theme: {
		colors: {
			primary: "#1a73e8",
			accent: "#673AB7",
			error: "#D93025",
			border: "#dadce0",
			background: {
				primary: "#FFFFFF",
				secondary: "#F0EBF8",
				tertiary: "#F8F9FA",
			},
			text: {
				1: "#202124",
				2: "#5f6368",
			},
		},
	},
	shortcuts: {
		"decorative-b": "border-b-(solid 1 border)",
	},
});
