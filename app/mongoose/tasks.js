const mongoose = require('./db');
const log = console.log;
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: String,
    author: String,
    body: String,
    assigned: [{user: String, date: Date}],
    closed: {flag: Boolean, date: Date}
});

var Task = mongoose.model('tasks', TaskSchema);

function inserttask(newtask) {
    log(newtask);
    var t = new Task(newtask);
    t.save();
    log('saved');
};

function updatetask(id, newtask) {
    Task.findById(id, (err, res) => {
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
                }
                res.save();
            } else {
                log('not matched');
            }
        };
    });
};

function removetask(id) {
    Task.findById(id, (err, res) => {
        if (err) {
            log(err)
        } else {
            if (res) {
                log(`remove task: ${res.title} (${res._id})`);
                res.remove();
            } else {
                log('not matched');
            };
        };
    });
};

function findtask(title) {
    Task.find({title: title}, (err, res) => {
        if (err) {
            log(err);
        } else {
            log(res)
            return res
        };
    });
};

// Task.find({title: 'make an insertdb method'}, (err, res) => {
//     log(res)
// })
var now = Date.now();
//log(now);

// inserttask({title: 'make an insertdb method', assigned: [{user: 'Alex', date: now}]})

// updatetask('5a9ef4add76f372fec66d4af', {closed: {flag: true, date: now}});

// findtask('tt1');
// removetask('5a9ec0127ae1dd0cfcac4774')