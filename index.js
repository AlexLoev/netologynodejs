const fp = require('./file-promise');
const readAll = require('./read-all');
//const filetoread = 'data.txt';

//fp.read(filetoread)
//    .then(resolve => console.log(resolve))
//    .catch(reject => console.error(reject));


//const filetowrite = 'ndata.txt';
//var data = 'Nothing interesting';

//fp.write(filetowrite, data)
//    .then(resolve => console.log(resolve))
//    .catch(reject => console.error(reject));    
//console.log(fp.read('dawta.txt'));
//console.log(fp.random(1,7));

//задача 1
fp
  .read('data.txt')
  .then(data => data.toUpperCase())
  .then(data => fp.write('./upper-data.txt', data))
  .then(filename => console.log(`Создан файл ${filename}`))
  .catch(reject => console.error(reject));


//задача 2

readAll('./')
  .then(files => files.forEach(file))
  .catch(err => console.error(err));