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
    return new Promise((resolve, reject) => {
        var task = this(newtask);
        task.save((err, res) => {
            if (err) {
                reject(err);
            } else {
                log(res);
                resolve(res);
            }   
        });
    });
};

/**update the task in collection of tasks by it's Objectid 
 * newtask is an json object
 * it can contains
 *  @title String. If you want to change title of task
 *  @author String. If you want to change author of task
 *  @closed JSON {flag: Boolean, date: Date}. if you want to close/open the task
*/
TaskSchema.statics.updatebyid = function(id, newtask) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, task) => {
            if (err) {
                log(err)
            } else {
                if (task) {
                    log(`update task: ${task.title} (${task._id})`);
                    if (newtask.title) {
                        task.title = newtask.title
                    };
                    if (newtask.closed) {
                        task.closed = newtask.closed;
                    };
                    if (newtask.author) {
                        task.author = newtask.author;
                    }
                    task.save((err, task) => {
                        if (err) {
                            reject(err);
                        } else {
                            log(task);
                            resolve(task);
                        }   
                    });
                } else {
                    log('not matched task');
                }
            };
        });
    });
};

TaskSchema.statics.removebyid = function(id) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, task) => {
            if (err) {
                log(err)
            } else {
                if (task) {
                    log(`remove task: ${task.title} (${task._id})`);
                    task.remove((err, delres) => {
                        if (err) {
                            reject(err);
                        } else {
                            log(delres);
                            resolve(delres);
                        }   
                    });
                } else {
                    log('not matched task to remove');
                };
            };
        });
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
    return new Promise((resolve, reject) => {
        this.find(filter, (err, tasks) => {
            if (err) {
                reject(err);
            } else {
                log(tasks);
                resolve(tasks);
            };
        });
    })
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
    return new Promise((resolve, reject) => {
        this.updatebyid(id, {closed: closed})
        .then(task => {resolve(task)})
        .catch(err => {reject(err)});
    });
};

TaskSchema.statics.openbyid = function(id) {
    var now = Date.now();
    var closed = {
        flag: false,
        date: now
    }
    return new Promise((resolve, reject) => {
        this.updatebyid(id, {closed: closed})
        .then(task => {resolve(task)})
        .catch(err => {reject(err)});
    });
};

/** функция прикрепляет определенного пользователя к задаче */
TaskSchema.statics.assigntouser = function(taskid, userid) {
    return new Promise((resolve, reject) => {
        this.findById(taskid, (err, task) => {
            if (err) {
                reject(err);
            } else {
                if (task) {
                    var now = Date.now();
                    var userdata = {
                        user: userid,
                        date: now
                    }
                    if (task.assigned) {
                        //проверяем уже прикрепленных пользователей, возможно уже есть
                        var userindex = task.assigned.findIndex(elem => elem.user == userid);
                        if (userindex != -1) {
                            log(userindex)
                            resolve('Задача уже была делегирована этому пользователю');
                        } else {
                            task.assigned.push(userdata);                        
                        }
                    } else {
                        task.assigned.push(userdata);
                    }
                    task.save((err, savedtask) => {
                        if (err) {
                            reject(err);
                        } else {
                            log(savedtask);
                            resolve(savedtask);
                        }   
                    });
                } else {
                    resolve('cant find task to assign')
                }
            }
        });
    });
};

var Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;