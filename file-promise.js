const fs = require("fs");
const conf = {encoding: 'utf8'}

function read(file) {
    return new Promise((resolve,reject) => {
        console.log('Start reading ' + file + '...');
        fs.readFile(file, conf, (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }    
        });
    });
};

function write(file, data) {
    return new Promise((resolve,reject) => {
        console.log('Start writing ' + file + '...');
        fs.writeFile(file, data, conf, err => {
            if (err) {
                reject(err);
            } else {
                resolve(file);
            }    
        });
    });
};

module.exports = {read, write};
