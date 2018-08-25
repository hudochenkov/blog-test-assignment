module.exports = {
	printWidth: 100,
	useTabs: true,
	tabWidth: 4,
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	proseWrap: 'preserve',
	overrides: [
		{
			files: '*.css',
			options: {
				singleQuote: false,
			},
		},
	],
};
