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

/**Функция формирует список пользователей и количество задач.
 * Элементы массива: 
 * 
 * @_id ObjectID пользователя,
 * @fullname ФИО пользователя
 * @tasks количество назначенных задач
 * @closed количество закрытых задач
 */
UserSchema.statics.userlist = function() {
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
        {$group: {_id: '$_id', fullname: {$first: '$fullname'}, tasks: {$sum: '$tasks'}, closed: {$sum: '$closed'} }}
    ]).
    exec((err, res) => {
        log(res);
        return res
    });
};

var User = mongoose.model('users', UserSchema);

module.exports = User;