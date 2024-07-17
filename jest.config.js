module.exports = {
    verbose: true,
    roots: [
      "<rootDir>/client/src"
    ],
    testMatch: [
      "**/__tests__/**/*.js?(x)",
      "**/?(*.)+(spec|test).js?(x)"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };
  