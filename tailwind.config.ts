import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "oklch(0.7751 0.127965 240.0314)",
        "primary-dark": "oklch(0.5327 0.1152 242.02)",
      },
    },
  },
} satisfies Config;
