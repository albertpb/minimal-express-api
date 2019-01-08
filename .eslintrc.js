// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'airbnb-base'],
	// add your custom rules here
	rules: {
		'arrow-parens': 'off',
		indent: ['error', 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
	},
};
