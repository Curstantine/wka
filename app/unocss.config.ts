import type { IconifyJSON } from "@iconify/types";
import {
	Awaitable,
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
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
		presetAttributify(),
		presetUno({
			dark: "media",
		}),
		presetIcons({
			collections: {
				material: importIconCollection("material-symbols"),
				logos: importIconCollection("logos"),
				flag: importIconCollection("flag"),
			},
		}),
		presetWebFonts({
			fonts: {
				sans: [
					{
						name: "Inter",
						weights: [300, 400, 500, 600, 700],
					},
				],
			},
		}),
		presetTypography(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	theme: {
		easing: {
			DEFAULT: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
			standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
			"standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
			"standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
		},
	},
	shortcuts: {
		"button-primary":
			"flex items-center space-x-2 px-2 text-sm font-sans rounded-full bg-light-bg-2 dark:bg-dark-bg-2 text-light-accent dark:text-dark-accent",
		"button-primary-invert":
			"bg-light-fg-2 text-light-bg-1 dark:bg-dark-fg-2 dark:text-dark-bg-1",
		"button-icon":
			"flex md:hidden items-center justify-center w-12 h-12 rounded-full transition-colors duration-150 ease-standard active:bg-light-bg-2/50 dark:active:bg-dark-bg-2/75",
		containerify: "px-12 2xl:(container mx-auto px-0)",
		"firefox-outline-fix": "rounded-[0.01px] overflow-hidden",
	},
});
