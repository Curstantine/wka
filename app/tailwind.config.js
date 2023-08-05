const plugin = require("tailwindcss/plugin");
const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			transitionTimingFunction: {
				emphasized: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
				standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
				"standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
				"standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
			},
		},
	},
	plugins: [
		addDynamicIconSelectors(),
		plugin(({ addComponents, theme }) => {
			const buttons = {
				".btn-primary": {
					"height": theme("height.10"),
					"display": "inline-flex",
					"alignItems": "center",
					"justifyContent": "center",
					"borderRadius": theme("borderRadius.md"),
					"backgroundColor": theme("colors.pink.100"),
					"color": theme("colors.pink.900"),
					"fontWeight": theme("fontWeight.medium"),
				},
			};

			addComponents(buttons);
		}),
	],
};
