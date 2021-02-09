const fs = require('fs')
const defaults = require('./defaults')
const paths = require('./paths')

const args = require('minimist')(process.argv.slice(2), {
  alias: {
    e: 'entry',
    s: 'skip',
    p: 'page',
    c: 'component',
  },
})
const markupFile = defaults.templating ? 'pug' : 'html'

args._.forEach((val) => {
  const path =
    'component' in args && args.component
      ? paths.components + `/${val}`
      : paths.pages + `/${val}`
  const reqType = 'component' in args && args.component ? 'Component' : 'Page'

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)

    if (!('skip' in args && args.skip)) {
      const pugFile = path + `/${val}.${markupFile}`
      fs.writeFile(pugFile, '', function (err) {
        if (err) throw err
        console.log(`Created ${val}.${markupFile}`)
      })
    } else {
      if (!('component' in args && args.component)) {
        const skipFile = path + `/.skippage`
        fs.writeFile(skipFile, '', function (err) {
          if (err) throw err
          console.log('Skip file created (.skippage)')
        })
      }
    }

    if (!('entry' in args)) {
      const entryFile = path + `/${val}.js`
      fs.writeFile(entryFile, '', function (err) {
        if (err) throw err
        if ('component' in args && args.component) {
          console.log('Component JS ' + `${val}.js`)
        } else {
          console.log('Entry point ' + `${val}.js`)
        }
      })
      const styleFile = path + `/${val}.scss`
      fs.writeFile(styleFile, '', function (err) {
        if (err) throw err
        console.log('Style ' + `${val}.scss`)
      })
    } else {
      if (!('component' in args && args.component)) {
        const entryFile = JSON.stringify({
          key: args.entry,
          path: `../${args.entry}/${args.entry}.js`,
        })

        const switchEntryFile = path + `/.entry.json`
        fs.writeFile(switchEntryFile, entryFile, function (err) {
          if (err) throw err
          console.log('Entry point ' + `/${args.entry}/${args.entry}.js`)
        })
      }
    }
  } else {
    console.log(`ERROR: ${reqType} ${val} already exists.`)
  }
})
