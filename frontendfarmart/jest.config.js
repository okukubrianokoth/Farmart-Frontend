module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(axios|react-router-dom)/)" // Allow Jest to process these ESM modules
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // avoid CSS import errors
  },
};
