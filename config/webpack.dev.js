const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('../webpack.config.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development
  mode: 'development',

  // Customize how source maps are generated
  devtool: 'inline-source-map',

  // Development server
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Inject css into the head
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    // Plugin for hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
