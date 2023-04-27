// jest.config.js
module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!module-to-transform|another-module)/",
    ],
  };
  