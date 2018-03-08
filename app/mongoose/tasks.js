const mongoose = require('./db');
const log = console.log;
const Schema = mongoose.Schema;

/** This Schema used for tracker tasks*/
const TaskSchema = new Schema({
    title: String,
    author: {type: mongoose.Schema.ObjectId},
    body: String,
    assigned: [{user: {type: mongoose.Schema.ObjectId}, date: Date}],
    closed: {flag: Boolean, date: Date},
    createdate: {type: Date, default: Date.now()}
});

/**add new task to collection of tasks */
TaskSchema.statics.insertnew = function(newtask) {
    log('insert new task');
    log(newtask);
    var t = this(newtask);
    t.save();
};

/**update the task in collection of tasks by it's Objectid 
 * newtask is an json object
 * it can contains
 *  @title String. If you want to change title of task
 *  @author String. If you want to change author of task
 *  @closed JSON {flag: Boolean, date: Date}. if you want to close/open the task
*/
TaskSchema.statics.updatebyid = function(id, newtask) {
    this.findById(id, (err, res) => {
        if (err) {
            log(err)
        } else {
            if (res) {
                log(`update task: ${res.title} (${res._id})`);
                if (newtask.title) {
                    res.title = newtask.title
                };
                if (newtask.closed) {
                    res.closed = newtask.closed;
                };
                if (newtask.author) {
                    res.author = newtask.author;
                }
                res.save();
            } else {
                log('not matched task');
            }
        };
    });
};

TaskSchema.statics.removebyid = function(id) {
    this.findById(id, (err, res) => {
        if (err) {
            log(err)
        } else {
            if (res) {
                log(`remove task: ${res.title} (${res._id})`);
                res.remove();
            } else {
                log('not matched task to remove');
            };
        };
    });
};

/**функция поиска задачи в коллекции tasks по вхождению word в элементы title или body*/
TaskSchema.statics.findbyword = function(word) {
    var wrapword =  new RegExp(word);
    var filter = {
        $or: [
            {title: wrapword},
            {body: wrapword}
        ]
    };
    this.find(filter, (err, res) => {
        if (err) {
            log(err);
        } else {
            log(res)
            return res
        };
    });
};

TaskSchema.statics.findbyjson = function(task) {
    this.find(task, (err, res) => {
        if (err) {
            log(err);
        } else {
            log(res)
            return res
        };
    });
};

TaskSchema.statics.closebyid = function(id) {
    var now = Date.now();
    var closed = {
        flag: true,
        date: now
    }
    this.updatebyid(id, {closed: closed})
};

TaskSchema.statics.openbyid = function(id) {
    var now = Date.now();
    var closed = {
        flag: false,
        date: now
    }
    this.updatebyid(id, {closed: closed})
};

/** функция прикрепляет определенного пользователя к задаче */
TaskSchema.statics.assigntouser = function(taskid, userid) {
    this.findById(taskid, (err, res) => {
        if (err) {
            log(err);
        } else {
            if (res) {
                var now = Date.now();
                var userdata = {
                    user: userid,
                    date: now
                }
                if (res.assigned) {
                    //проверяем уже прикрепленных пользователей, возможно уже есть
                    var userindex = res.assigned.findIndex(elem => elem.user == userid);
                    if (userindex != -1) {
                        log(userindex)
                        log('Задача уже была делегирована этому пользователю');
                    } else {
                        res.assigned.push(userdata);                        
                    }
                } else {
                    res.assigned.push(userdata);
                }
                res.save();
            } else {
                log('cant find task to assign')
            }
        }
    });
};

var Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;