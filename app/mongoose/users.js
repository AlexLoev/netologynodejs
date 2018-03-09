const mongoose = require('./db');
const log = console.log;
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectID;

const UserSchema = new Schema({
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
    return new Promise((resolve, reject) => {
        var user = this(newuser);
        user.save((err, res) => {
            if (err) {
                reject(err);
            } else {
                log(res);
                resolve(res);
            }   
        });
    });
};

UserSchema.statics.updatebyid = function(id, newuser) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, user) => {
            if (err) {
                log(err)
            } else {
                if (user) {
                    log(`update user: ${user.fullname} (${user._id})`);
                    if (newuser.fname) {
                        user.fname = newuser.fname
                    };
                    if (newuser.lname) {
                        user.lname = newuser.lname;
                    }
                    if (newuser.sname) {
                        user.sname = newuser.sname;
                    }
                    user.save((err, user) => {
                        if (err) {
                            reject(err);
                        } else {
                            log(user);
                            resolve(user);
                        }   
                    });
                } else {
                    log('not matched user');
                }
            };
        });
    })
};

UserSchema.statics.removebyid = function(id) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, user) => {
            if (err) {
                log(err)
            } else {
                if (user) {
                    log(`remove user: ${user.fullname} (${user._id})`);
                    user.remove((err, delres) => {
                        if (err) {
                            reject(err);
                        } else {
                            log(delres);
                            resolve(delres);
                        }   
                    });
                } else {
                    log('not matched user to remove');
                };
            };
        });
    });    
};

UserSchema.statics.findbyjson = function(userjson) {
    this.find(userjson, (err, user) => {
        if (err) {
            log(err);
        } else {
            log(user);
             return user
        };
    });
};

/**Функция формирует список пользователей и количество задач.
 * Элементы массива: 
 * 
 * @_id ObjectID пользователя,
 * @fullname ФИО пользователя
 * @tasks количество назначенных задач
 * @closed количество закрытых задач
 */
UserSchema.statics.userlist = function() {
    return new Promise((resolve, reject) => {
        this.aggregate([
            // подключаем коллекцию с задачами
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assigned.user',
                    as: 'usertasks'
                }
            },
            // разворачиваем массив задач с отображением пользователей, у которых нет задач
            {$unwind: {path: '$usertasks', preserveNullAndEmptyArrays: true}},
            // формируем плоский список для последующей группировки в итоговый массив
            {$project: {
                fullname: {$concat: ['$lname',' ','$fname',' ','$sname']}, 
                taskid: '$usertasks._id',
                //считаем только закрытые задачи
                closed: {
                    $cond: {
                        if: '$usertasks.closed.flag',
                        then: 1,
                        else: 0
                    }
                },
                //считаем все назначенные задачи
                tasks: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$usertasks','']},'']},
                        then: 0,
                        else: 1
                    }
                }        
            }},
            {$group: {
                _id: '$_id',
                fullname: {$first: '$fullname'}, 
                tasks: {$sum: '$tasks'}, 
                closed: {$sum: '$closed'} 
            }},
            {$sort : { fullname : 1} }
        ]).
        exec((err, list) => {
            if (err) {
                reject(err);
            } else {
                log(list);
                resolve(list);
            }
        });
    })
};

var User = mongoose.model('users', UserSchema);

module.exports = User;