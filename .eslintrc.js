// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["expo", "prettier"],
  plugins: ["prettier", "drizzle"],
  rules: {
    "prettier/prettier": "error",
    "drizzle/enforce-delete-with-where": "error",
    "drizzle/enforce-update-with-where": "error",
  },
};
