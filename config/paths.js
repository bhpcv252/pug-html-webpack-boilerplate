const path = require('path')

module.exports = {
  // Assets folder
  assets: path.resolve(__dirname, '../src/assets'),

  // Pages folder
  pages: path.resolve(__dirname, '../src/pages'),

  // Source folder
  src: path.resolve(__dirname, '../src'),

  // Production build folder
  build: path.resolve(__dirname, '../dist'),
}
