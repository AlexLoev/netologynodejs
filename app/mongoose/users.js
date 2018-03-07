const mongoose = require('./db');
const log = console.log;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fname: String,
    lname: String,
    sname: String
});

UserSchema.virtual('fullname').get(function() {
    var fullname = (this.lname || '') + ' ' + (this.fname || '') + ' ' + (this.sname || '');
    return fullname.trim();
});

UserSchema.statics.insertnew = function(newuser) {
    log('insert new user');
    log(newuser);
    var user = this(newuser);
    user.save();
};

UserSchema.statics.updatebyid = function(id, newuser) {
    this.findById(id, (err, res) => {
        if (err) {
            log(err)
        } else {
            if (res) {
                log(`update user: ${res.fullname} (${res._id})`);
                if (newuser.fname) {
                    res.fname = newuser.fname
                };
                if (newuser.lname) {
                    res.lname = newuser.lname;
                }
                if (newuser.sname) {
                    res.sname = newuser.sname;
                }
                res.save();
            } else {
                log('not matched user');
            }
        };
    });
};

UserSchema.statics.removebyid = function(id) {
    this.findById(id, (err, res) => {
        if (err) {
            log(err)
        } else {
            if (res) {
                log(`remove user: ${res.fullname} (${res._id})`);
                res.remove();
            } else {
                log('not matched user to remove');
            };
        };
    });
};

UserSchema.statics.findbyjson = function(user) {
    this.find(user, (err, res) => {
        if (err) {
            log(err);
        } else {
            log(res);
             return res
        };
    });
};

var User = mongoose.model('users', UserSchema);

module.exports = User;