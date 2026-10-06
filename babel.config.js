module.exports = function (api) {
  api.cache(true);
  // babel-preset-expo já configura o reanimated/worklets automaticamente
  return { presets: ['babel-preset-expo'] };
};
