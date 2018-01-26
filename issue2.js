//задача 2

const fp = require('./file-promise')
const readAll = require('./read-all'); 

function show(file) {
  fp.read(path+file)
    .then(data => {
      console.log('-'.repeat(10));
      console.log(`Содержимое файла ${file}:`);      
      console.log(data)
      console.log('-'.repeat(10));
    });
  
}

const path = './logs/'
readAll(path)
  .then(files => files.forEach(file => {
    show(file)
  }))
  .catch(reject => console.error(reject));
