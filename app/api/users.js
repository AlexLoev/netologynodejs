const User = require('../mongoose/users');

/**передает список пользователей и количество задач*/
function getuserslist(req, res) {
    User.userlist()
    .then(list => {res.json(list)})
    .catch(err => dberr(err, res));
};

function newuser(req, res){
    if (req.body.fname) {
        User.insertnew(req.body)
        .then(resolve => {res.json(resolve)})
        .catch(err => dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a user JSON in body`);        
    }
};

function findbyid(req, res) {
    if (req.params.id) {
        User.findById(req.params.id)
        .then(resolve => {res.json(resolve)})
        .catch(err => dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid user id');
    }    
};

function removebyid(req, res) {
    if (req.params.id) {
        User.removebyid(req.params.id)
        .then(resolve => {res.json(resolve)})
        .catch(err => dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid user id');
    }    
};

function edituser(req, res) {
    if (req.params.id) {
        if (req.body.fname) {
            User.updatebyid(req.params.id, req.body)
            .then(resolve => {res.json(resolve)})
            .catch(err => dberr(err, res));
        } else {
            res.statusCode = 400;
            res.end(`Please, add a user JSON in body`);     
        }
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid user id');
    }      
}

function dberr(err, res) {
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('Mongoose Error in users collection');
};

module.exports = {
    getuserslist,
    newuser,
    findbyid,
    removebyid,
    edituser
}

// var Task = require('../mongoose/tasks');

// taskid = '5a9fc2bc1043b23040edce04';
// userid = '5a9f90ae6f353322d4ca01f4';

// var user = {
//     lname: 'Соколова',
//     fname: 'Анастасия',
//     sname: 'Александровна'
// };

// var task = {
//     title: 'Сделать невероятно крутой список пользователей', 
//     body: 'Использовать движок aggregate',
//     author: '5aa0261381aa133248e73398'
// };
// assigntouser(taskid, userid)

// User.insertnew(user);
// user = {lname: 'Лоев',fname: 'Алексей',sname: 'Дмитриевич'};
// User.insertnew(user);
// Task.insertnew(task);

// task = {
//     title: 'Разработать CRUD', 
//     body: 'Использовать библиотеку mongoose',
//     author: '5aa025cd9dfc300e88f12121'    
// }
// Task.insertnew(task);

// task = {
//     title: 'Сделать API', 
//     body: 'Использовать express.js',
//     author: '5aa025cd9dfc300e88f12121'    
// }
// Task.insertnew(task);

// task = {
//     title: 'Продумать все возможные роуты', 
//     body: 'Использовать express.js',
//     author: '5aa025cd9dfc300e88f12121'    
// }
// Task.insertnew(task);

// user = {lname: 'Ветохин',fname: 'Юрий',sname: 'Дмитриевич'};
// User.insertnew(user);

// User.findbyjson();
// Task.findbyjson();
// Task.updatebyid('5aa0333847960326e4eb1f18', task)
// User.updatebyid(userid, user);
// Task.openbyid(taskid);

// taskid='5aa0333847960326e4eb1f18';//aggregate task
// userid='5aa03cf37f98ba2dc4e568ce'; //ветохин
// Task.assigntouser(taskid,userid)
// taskid='5aa0333847960326e4eb1f18';//aggregate task
// userid='5aa0261381aa133248e73398';//лоев
// Task.assigntouser(taskid,userid)

// taskid='5aa0333847960326e4eb1f18';//aggregate task
// Task.closebyid(taskid);

// taskid='5aa0342dde40fd2f3c1b16c6' //'Сделать API'
// userid='5aa0261381aa133248e73398';//лоев
// Task.assigntouser(taskid,userid)

// taskid='5aa181607abfe44360abbafd'//Разработать CRUD
// userid='5aa025cd9dfc300e88f12121'//Соколова
// Task.assigntouser(taskid,userid)

// Task.closebyid(taskid);

// User.userlist();


// Task.findbyword('a');