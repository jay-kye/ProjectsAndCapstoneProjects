const {cat, webCat} = require('./repeatedFuncs');

let path = process.argv[2];

if(path.slice(0,4) === 'http'){
  webCat(path)
} else {
  cat(path)
}
