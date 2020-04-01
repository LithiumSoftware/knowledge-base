module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["next/babel"],
    env: {
      production: {
        plugins: ["graphql-tag"],
      },
    },
  };
};
