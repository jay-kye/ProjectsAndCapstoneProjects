const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (err, data)=> {
        if(err){
            console.log("error code is", err);
            process.kill(1)
        }
        console.log(data);
    })
}


async function webCat(url){
    try{
      let res = await axios.get(url);
      console.log(res.data)
    }catch(err){
      console.error(`error ${url}: ${err}`);
      process.kill(1);
    }
}


function outputHandler(content, output){
    if(output){
      fs.writeFile(output, content, 'utf8', (err) => {
        if(err){
          console.log("error code is", err);
          process.kill(1);
        }
      });
    } else{
      console.log(content);
    }
  }
  
function catEnhanced(path, output){
    fs.readFile(path, 'utf8', (err, data)=> {
        if(err){
            console.log("error code is", err);
            process.kill(1)
        } else {
        outputHandler(data,output);
        }  
    });
}


async function webCatEnhanced(url, output){
    try{
    let res = await axios.get(url);
    outputHandler(res.data, output);
    }catch(err){
    console.error(`error ${url}: ${err}`);
    process.kill(1);
    }
}
  
module.exports = {
    cat: cat,
    webCat: webCat,
    catEnhanced: catEnhanced,
    webCatEnhanced: webCatEnhanced,
};