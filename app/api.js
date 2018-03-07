var log = console.log;
var Task = require('./mongoose/tasks');
var User = require('./mongoose/users');

taskid = '5a9fc2bc1043b23040edce04';
userid = '5a9fbd1c8b15332e28574817';

var user = {
    fname: 'Анастасия',
    sname: 'Александровна',
    lname: 'Соколова'
};

var task = {
    title: 'Сделать поиск по названию и описанию задач', 
    body: 'tt1',
    author: '5a9f90ae6f353322d4ca01f4'
};
// assigntouser(taskid, userid)

// User.insertnew(user);
// var alex = User({sname: 'Иван'});
// alex.insertuser({fname: 'Файтрулдинов'});

// User.updatebyid(userid, user);
// Task.insertnew(task);
User.findbyjson();
// Task.findbyjson();
// Task.openbyid(taskid);
Task.assigntouser(taskid,userid)
Task.findbyword('a');

