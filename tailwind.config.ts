import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        fg: token("fg"),
        muted: token("muted"),
        subtle: token("subtle"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-bn-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 1px 1px rgb(0 0 0 / 0.02)",
        lift: "0 12px 32px -12px rgb(0 0 0 / 0.14), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
