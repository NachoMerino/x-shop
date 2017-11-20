const path = require('path');

module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'],
    ['neutrino-middleware-styles-loader',{
      minimize: true,
      extractCSS: false,
      sourceMap: true,
      postcss: {},
      cssModules: false,
      autoprefixer: false,
      externalLoaderOptions: {}
    }],
    ['neutrino-preset-web', {
      html: {
        title: 'A shop',
        mobile: true,
        lang: 'en',
        template: path.join(__dirname, 'src/index.ejs'),
        // favicon: path.join(__dirname, 'src/static/favicon.png'),
        minify: {
          removeScriptTypeAttributes: true,
          removeComments: true,
        },
      }
    }],
  ],
};
