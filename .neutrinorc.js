const join = require('path').join;
const HtmlPlugin = require('html-webpack-plugin');

const headHtmlSnippet = `
`;

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
    ['neutrino-preset-web'],
    // Overrides the normal html plugin to allow multiple html files to be generated
    (neutrino) => {
      // Remove the default html plugin
      neutrino.config.plugins.delete('html');

      const entries = ['index', 'details'];

      entries.forEach(entry => neutrino.config
        .plugin(`html-${entry}`)
          .use(HtmlPlugin, [{
              title: `A Shop | ${entry}`,
              filename: `${entry}.html`,
              template: join(neutrino.options.source, `html/${entry}.ejs`),
              chunks: ['index', 'vendor', 'runtime'],
              minify: {
                useShortDoctype: true,
                keepClosingSlash: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
              },
              headHtmlSnippet,
          }])
      );
    },
  ],
};
