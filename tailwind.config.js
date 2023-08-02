/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				light: {
					text: '#122211',
					background: '#EDE8E3',
					primary: '#89c289',
					secondary: '#e2c5d6',
					accent: '#6a4a90',
					'base-100': '#122211'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
