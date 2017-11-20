const join = require('path').join;
const HtmlPlugin = require('html-webpack-plugin');

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
        // favicon: join(__dirname, 'src/static/favicon.png'),
        minify: {
          removeScriptTypeAttributes: true,
          removeComments: true,
        },
      }
    }],
    (neutrino) => {
      // // Remove the default entry point and html plugin
      // neutrino.config.entry('index').delete(neutrino.options.entry);
      neutrino.config.plugins.delete('html');

      const entries = ['index', 'details'];

      entries.forEach(entry => neutrino.config
        // .entry(entry)
        //   .add(join(neutrino.options.source, `entry-${entry}.js`))
        //   .end()
        .plugin(`html-${entry}`)
          .use(HtmlPlugin, [{
              title: `A Shop | ${entry}`,
              filename: `${entry}.html`,
              template: join(neutrino.options.source, `html/${entry}.ejs`),
              // The vendor/runtime chunk names here must match those in neutrino-middleware-chunk.
              // chunks: [entry, 'vendor', 'runtime'],
              chunks: ['index', 'vendor', 'runtime'],
              // Copied from neutrino-middleware-html-template
              minify: {
                useShortDoctype: true,
                keepClosingSlash: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
              },
          }])
      );
    },
  ],
};
