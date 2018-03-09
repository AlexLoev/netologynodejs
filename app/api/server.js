const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyparser = require('body-parser');
const log = console.log;
const appport = 1337;

//подключаем методы для работы с пользователями
const users = require('./users');
const routerusers = express.Router();
//подключаем методы для работы с задачами
const tasks = require('./tasks');
const routertasks = express.Router();

//подключаем к нашему приложению возможность разбирать json и urlencoded body in request
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//подключаем роуты
app.use('/users/',routerusers);
app.use('/tasks/',routertasks);

app.all('/', (req,res) => {
    res.end('use api as u wish');
    res.statusCode = 200;
    res.statusMessage = 'OK';
});

routerusers.get('/', users.getuserslist);
routerusers.post('/', users.newuser);
routerusers.get('/:id', users.findbyid);
routerusers.delete('/:id', users.removebyid);
routerusers.put('/:id', users.edituser);

routertasks.get('/', tasks.gettaskslist);
routertasks.post('/', tasks.newtask);
routertasks.get('/:id', tasks.findbyid);
routertasks.delete('/:id', tasks.removebyid);
routertasks.put('/:id', tasks.edittask);
routertasks.post('/assignto/:id', tasks.assigntouser);
routertasks.post('/close/:id', tasks.closetask);
routertasks.post('/open/:id', tasks.opentask);


http.listen(appport, (err) => {
    if (err) {
        log(err);
    } else {
        log(`http listen at port ${appport}`)
    }
});