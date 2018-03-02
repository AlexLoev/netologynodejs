const fs = require("fs");
const readAll = require('./read-all'); 

function pathInfo(path, callback) {   
    const conf = {encoding: 'utf8'};
    var type = '';
    fs.stat(path, (err,stats) => {
        if (err) {
            callback(err, null)
        }
        else {
            if (stats.isFile()) {
                type = 'file';
                fs.readFile(path,conf,(err,content) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null,{path, type, content});
                    }
                });
            };
            if (stats.isDirectory()) {
                type = 'directory';
                fs.readdir(path, (err,childs) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null,{path, type, childs});
                    }
                })
            }        
        }
    });
}

module.exports = pathInfo;