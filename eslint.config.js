import js from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/out/**", "**/*.d.ts", "**/constants/**"],
  },
 
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
     
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "indent": ["error", 2, { SwitchCase: 1 }],
      "semi": ["error", "always"],
 
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    
      "no-unused-vars": "off", 
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",  
          argsIgnorePattern: "^_", 
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_", 
          caughtErrorsIgnorePattern: "^_",  
        },
      ],
 
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:", "^react", "^@?\\w"],
            ["^@(api|interfaces|store|pages)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^type "],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
 
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "always", prev: "*", next: "case" },
        { blankLine: "always", prev: "*", next: "default" },
        { blankLine: "always", prev: ["if", "for", "while", "try", "switch", "block"], next: "*" },
        { blankLine: "always", prev: "*", next: ["if", "for", "while"] },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
      ],
    },
  },
];
