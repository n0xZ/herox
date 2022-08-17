/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/*/**.tsx',
		'./app/components/*/**.tsx',
		'./app/routes/*/**.tsx',
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				anton: ['Anton', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
}
