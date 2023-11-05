/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		{pattern: /(fill)-./},
		{pattern: /(text)-./},
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
}
