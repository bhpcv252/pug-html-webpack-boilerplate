const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const defaults = require('./defaults')
const paths = require('./paths')
const utils = require('./utils')

module.exports = {
  // Entry points
  entry: utils.getEntry(),

  // Output folder for the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Generate HTML files and other plugins
  plugins: utils.getHtml().concat([
    // Plugin to clean build folder before rebuilding
    new CleanWebpackPlugin(),
  ]),

  // Modules treatment
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: defaults.minify,
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'img',
                  attribute: 'srcset',
                  type: 'srcset',
                },
                {
                  tag: 'img',
                  attribute: 'data-src',
                  type: 'src',
                },
                {
                  tag: 'img',
                  attribute: 'data-srcset',
                  type: 'srcset',
                },
                {
                  tag: 'video',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'source',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'source',
                  attribute: 'srcset',
                  type: 'srcset',
                },
                {
                  tag: 'link',
                  attribute: 'href',
                  type: 'src',
                  filter: (tag, attribute, attributes) => {
                    if (!/stylesheet/i.test(attributes.rel)) {
                      return false
                    }

                    return !(
                      attributes.type &&
                      attributes.type.trim().toLowerCase() !== 'text/css'
                    )
                  },
                },
              ],
            },
          },
        },
      },
      {
        test: /\.(pug|jade)$/,
        use: {
          loader:  'pug-loader',
          options: {
            root: paths.src,
            pretty: !(defaults.minify)
          }
        },
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: paths.src,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(mov|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'videos/',
          },
        },
      },
      {
        test: /\.(wav|mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'audios/',
          },
        },
      },
      {
        test: /\.(ttf|otf|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },

  // Resolve alias
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: ['*', '.js', '.json'],
  },
}
