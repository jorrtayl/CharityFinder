/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
        extend: {
            imageRendering: {
                'crisp-edges': 'crisp-edges',
                'pixelated': 'pixelated',
            },
        },
    },
  plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.image-render-crisp': {
                    'image-rendering': 'crisp-edges',
                },
                '.image-render-pixel': {
                    'image-rendering': 'pixelated',
                },
            });
        },
    ],
}