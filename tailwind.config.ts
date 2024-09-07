import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mug-img": "url('/mugi.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
