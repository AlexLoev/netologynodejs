const fs = require("fs");
const conf = {encoding: 'utf8'}

module.exports = function readAll(path) {
    return new Promise((resolve,reject) => {
        console.log('Start reading all files in path ' + path + '...');
        
        fs.readdir('./', (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                fs.readFile(file, conf, (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(content);
                    }    
                });
            });
        })
    });
};

