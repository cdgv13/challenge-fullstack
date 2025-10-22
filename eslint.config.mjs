// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: false, // ✅ Ignora archivos fuera del tsconfig
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn",
    },
    ignores: [
      "node_modules",
      "dist",
      "coverage",
      "eslint.config.mjs",
      "jest.config.ts",
    ],
  },
]);
