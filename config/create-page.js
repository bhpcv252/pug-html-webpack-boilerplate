const fs = require('fs');
const defaults = require('./defaults');
const paths = require('./paths');

const args = require('minimist')(process.argv.slice(2), {
    alias: {
        'e': 'entry',
        's': 'skip'
    }
});
const markupFile = defaults.templating ? 'pug' : 'html';

args._.forEach((val) => {
    const path = paths.pages + `/${val}`;

    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);

        if(!("skip" in args && args.skip)) {
            const pugFile = path + `/${val}.${markupFile}`;
            fs.writeFile(pugFile, '', function (err) {
                if (err) throw err;
                console.log(`Created ${val}.${markupFile}`);
            });
        }
        else {
            const skipFile = path + `/.skippage`;
            fs.writeFile(skipFile, '', function (err) {
                if (err) throw err;
                console.log('Skip file created (.skippage)');
            });
        }
        
        if(!("entry" in args)) {
            const entryFile = path + `/${val}.js`;
            fs.writeFile(entryFile, '', function (err) {
                if (err) throw err;
                console.log('Entry point ' + `${val}.js`);
            });
            const styleFile = path + `/${val}.scss`;
            fs.writeFile(styleFile, '', function (err) {
                if (err) throw err;
                console.log('Style ' + `${val}.scss`);
            });
        }
        else {
            const entryFile = JSON.stringify({
                "key": args.entry,
                "path": `../${args.entry}/${args.entry}.js`
            });

            const switchEntryFile = path + `/.entry.json`;
            fs.writeFile(switchEntryFile, entryFile, function (err) {
                if (err) throw err;
                console.log('Entry point ' + `/${args.entry}/${args.entry}.js`);
            });
        }
    }
    else {
        console.log("ERROR: Page '" + val + "' already exists.");
    }

});