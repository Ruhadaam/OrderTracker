module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-react'],
    plugins: ['nativewind/babel', '@babel/plugin-syntax-jsx'],
  };
};
