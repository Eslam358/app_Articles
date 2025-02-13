import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} satisfies Config;

// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         customGray: '#f5f5f5',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms')({
//       strategy: 'class', // يضيف الأنماط عند استخدام 'form' كـ class
//     }),
//   ],
// };

