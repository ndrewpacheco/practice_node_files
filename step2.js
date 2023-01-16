const axios = require('axios');
const argv = process.argv;
const fs = require('fs');

function cat(path) {

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error(`${err}`);
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

const arg = argv[2]

arg.startsWith('http') ? webCat(arg) : cat(arg)
