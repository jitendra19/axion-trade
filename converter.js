const fs = require('fs');

// TODO can replace this by read all the files one by one from folder
const csvbuffer = {
  aapl: fs.readFileSync('./CSVs/AAPL.csv'),
  msft: fs.readFileSync('./CSVs/MSFT.csv'),
  amzn: fs.readFileSync('./CSVs/AMZN.csv'),
  fb: fs.readFileSync('./CSVs/FB.csv'),
  nflx: fs.readFileSync('./CSVs/NFLX.csv')
};

const final = [];

for (let key in csvbuffer) {
  var array = csvbuffer[key].toString().split('\n');
  let result = [];
  let headers = array[0].split(',');

  for (let i = 1; i < array.length; i++) {
    let obj = {};
    let str = array[i];
    let properties = str.split(',');

    for (let j in headers) {
      if (properties[j].includes(', ')) {
        obj[headers[j]] = properties[j].split(', ').map(item => item.trim());
      } else obj[headers[j]] = properties[j];
    }
    result.push(obj);
  }
//   let b = Object.assign({});
//   b[key] = result;
//   final.push(b);
  final.push({symbol: key, history:result});

}

let json = JSON.stringify(final);
console.log(json);
fs.writeFileSync('output.json', json);