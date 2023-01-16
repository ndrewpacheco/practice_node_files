const axios = require('axios');
const argv = process.argv;
const fs = require('fs');

function cat(path) {

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error(`cat ${err}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(data);
  });
}

function webCat(url) {
  axios.get(url).then(res => console.log(res.data)).catch(err => console.log(`${err}`))
}

function handleOut(outputFile, source){
  fs.readFile(source, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error(`reading: ${err}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    fs.writeFile(outputFile, data, "utf8", function(err) {
      if (err) {
        console.error('writing test', err);
        process.exit(1);
      }
    });
  });


  // arg.startsWith('http') ? webCat(arg) : cat(arg)
}

const arg = argv[2]
console.log(arg)
if (arg === '--out'){
  console.log('out true')
  handleOut(argv[3], argv[4])
} else {
  arg.startsWith('http') ? webCat(arg) : cat(arg)
}