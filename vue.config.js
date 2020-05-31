module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {},
    });
  },
};
