module.exports = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 120,
  bracketSpacing: true,
  overrides: [
    {
      files: ["*.json"],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ["*.tsx"],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ["*.html"],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
