const path = require('path')

module.exports = {
  // Assets folder
  assets: path.resolve(__dirname, '../src/assets'),

  // Components folder
  components: path.resolve(__dirname, '../src/components'),

  // Pages folder
  pages: path.resolve(__dirname, '../src/pages'),

  // Source folder
  src: path.resolve(__dirname, '../src'),

  // Production build folder
  build: path.resolve(__dirname, '../dist'),
}
