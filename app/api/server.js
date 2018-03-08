const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyparser = require('body-parser');
const log = console.log;
const appport = 1337;

//подключаем методы для работы с пользователями
const users = require('./users');

/**подключаем к нашему приложению возможность разбирать json и urlencoded body in request*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.all('/', (req,res) => {
    res.end('use api as u wish');
});

http.listen(appport, (err) => {
    if (err) {
        log(err);
    } else {
        log(`connected at port ${appport}`)
    }
});