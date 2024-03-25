const {catEnhanced, webCatEnhanced} = require('./repeatedFuncs');

let path;
let output;

if (process.argv[2] === '--out'){
  output = process.argv[3];
  path = process.argv[4];
} else{
  path = process.argv[2];
}

if(path.slice(0,4) === 'http'){
  webCatEnhanced(path, output);
}else{
  catEnhanced(path, output);
}
