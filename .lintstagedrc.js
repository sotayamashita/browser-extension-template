module.exports = {
  // Prettify
  "**/*.(ts|tsx|js|json|css)": (filenames) => [
    `prettier --write ${filenames.join(" ")}`,
  ],
};
