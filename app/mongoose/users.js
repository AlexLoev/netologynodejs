const mongoose = require('./db');
const log = console.log;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fname: String,
    lname: String,
    sname: String
});

var User = mongoose.model('users', UserSchema);

function insertuser(newuser) {
    log(newuser);
    var user = new User(newuser);
    user.save();
    log('saved');
};

insertuser({fname: 'Alex', lname: 'Loev'});