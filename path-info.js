const fs = require("fs");
const fp = require('./file-promise');
const readAll = require('./read-all'); 

module.exports = function pathInfo(path, callback) {   
fs.stat(path, (err,stats) => {
        if (err) {callback(err, null)}
        else {
            if (stats.isFile()) {
                type = 'file';
                fp
                .read(path)
                .then(content => callback(null, {path, type, content}))
                .catch(reject => callback(err, null));
            };
            if (stats.isDirectory()) {
                type = 'directory';
                readAll(path)
                .then(childs => callback(null, {path, type, childs}))
                .catch(reject => callback(err, null));
            }        
        }
    });
}