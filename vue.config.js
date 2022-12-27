const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "src/assets/scss/shared/_variables.scss";
          @import "src/assets/scss/shared/_mixins.scss";
          @import "src/assets/scss/shared/_functions.scss";
        `
      }
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/tree/' : '/'
});
