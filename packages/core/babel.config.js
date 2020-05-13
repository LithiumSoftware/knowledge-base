module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env"],
    env: {
      production: {
        plugins: ["graphql-tag"],
      },
    },
  };
};
