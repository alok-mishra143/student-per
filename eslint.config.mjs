import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-console": "warn", // Warn instead of error for console logs
      "no-debugger": "error", // Prevent accidental debugger statements
      "@next/next/no-img-element": "off", // Allow <img> if needed
      "react/jsx-key": "warn", // Warn if keys are missing in lists
    },
  },
];

export default eslintConfig;
