import lineClamp from '@tailwindcss/line-clamp';

const config: {
  plugins: any[];
  theme: { extend: { colors: { background: string; foreground: string } } };
  content: string[];
} = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
