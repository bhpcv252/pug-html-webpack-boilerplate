const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaults = require('./defaults')
const paths = require('./paths')

const ROUTES_PATH = paths.pages
const routesArray = fs.readdirSync(ROUTES_PATH)
const markupFile = defaults.templating ? 'pug' : 'html'

// Get Entry Points
exports.getEntry = function () {
  let result = {}
  for (let item of routesArray) {
    if (item === '.DS_Store' || item === 'README.md') continue
    if (fs.existsSync(paths.pages + `/${item}/.entry.json`)) {
      const data = fs.readFileSync(paths.pages + `/${item}/.entry.json`, {
        flag: 'r',
        encoding: 'utf8',
      })
      const { key, path } = JSON.parse(data.toString())
      if (!(key in result)) {
        result[key] = paths.pages + `/${item}/${path}`
      }
    }
    if (fs.existsSync(paths.pages + `/${item}/${item}.js`)) {
      result[item] = paths.pages + `/${item}/${item}.js`
    }
  }
  return result
}

// Get HTML/Pug files
exports.getHtml = function () {
  let result = []
  for (let item of routesArray) {
    if (item === '.DS_Store' || item === 'README.md') continue

    let chunks = ['runtime']

    let pageData = {};

    if (fs.existsSync(paths.pages + `/${item}/.skippage`)) continue

    if (fs.existsSync(paths.pages + `/${item}/.entry.json`)) {
      const data = fs.readFileSync(paths.pages + `/${item}/.entry.json`, {
        flag: 'r',
        encoding: 'utf8',
      })
      const { key } = JSON.parse(data.toString())
      if (!(key in result)) {
        chunks.push(key)
      }
    }

    if (fs.existsSync(paths.pages + `/${item}/${item}.js`)) {
      chunks.push(item)
    }

    result.push(
      new HtmlWebpackPlugin({
        favicon: paths.assets + '/images/favicon.png',
        filename: `${item}.html`,
        template: paths.pages + `/${item}/${item}.${markupFile}`,
        inject: true,
        chunks: chunks,
        minify: defaults.minify
      })
    )
  }
  return result
}
