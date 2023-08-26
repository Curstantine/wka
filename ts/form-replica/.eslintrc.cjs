module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"@unocss",
	],
	"overrides": [
		{
			"env": {
				"node": true,
			},
			"files": [
				".eslintrc.{js,cjs}",
			],
			"parserOptions": {
				"sourceType": "script",
			},
		},
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
	},
	"settings": {
		"react": {
			"version": "detect",
		},
	},
	"plugins": [
		"@typescript-eslint",
		"react",
	],
};