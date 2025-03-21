module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["warn", { allow: ["error"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"], // Allow _id
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: true,
      },
    ],
  },
};
