const log = console.log;
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1';
const dbname = 'tracker';

mongoose.connect(`${uri}/${dbname}`,(err, db) => {
    log(`mongoose connected at port ${db.port}`)
});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'ssss'));

module.exports = mongoose;