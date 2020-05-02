module.exports = {
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {},
    });
  },
};
