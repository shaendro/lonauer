const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			'2xs': '300px',
			xs: '500px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				primary: '#FC74A8',
				secondary: '#1BA08E',
				background: '#333333',

				success: '#9FE258',
				warning: '#F19129',
				danger: '#FF6150',
			},
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
			},
		},
	},

	plugins: [],
};

module.exports = config;
