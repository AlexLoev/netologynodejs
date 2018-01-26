//задача 1
const fp = require('./file-promise');

fp
  .read('data.txt')
  .then(data => data.toUpperCase()) 
  .then(data => fp
      .write('./upper-data.txt', data)  
      .then(filename => console.log(`Создан файл ${filename}`))
      //.catch(reject => console.error(reject)) // надо ли это вообще?
  )
  .catch(reject => console.error(reject));

