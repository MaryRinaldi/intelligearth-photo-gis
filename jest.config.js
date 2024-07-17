module.exports = {
    verbose: true,
    roots: [
      "<rootDir>/src"
    ],
    testMatch: [
      "**/__tests__/**/*.js?(x)",
      "**/?(*.)+(spec|test).js?(x)"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };
  