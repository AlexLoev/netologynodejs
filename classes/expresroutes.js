const express = require('express');
const app = express();
const log = console.log;
const appport = 1338

app.use(require('body-parser').json());

app.get('/',function(req,res) {
    res.send('Hello, Express.js');
});

app.get('/hello',function(req,res) {
    res.send('Hello, stranger');
});

app.get('/hello/*',function(req,res) {
    log(req.params);
    res.send(`Hello, ${req.params[0]}`);
});

app.all('/sub/*',function(req,res) {
    res.send(`You requested URI: ${req.method} ${req.protocol}://${req.hostname}:${appport}${req.originalUrl}`);
});



const routerpost = express.Router();
app.use('/post/',routerpost);

function checkheaderkey(req,res,next) {
    if (req.header('key')) {
        next();
    } else {
        res.statusCode = 401;
        res.end();
    }
};
routerpost.use(checkheaderkey); 

routerpost.post('/',function(req,res) {
    // log(req.body);
    // log(req.header('key'));
    if (req.body) {
        res.json(req.body);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

app.listen(appport);