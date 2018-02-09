const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require('body-parser');


const usersdata = [];
const log = console.log;


app.use(bodyparser.json());

app.get('/users/',function(req,res) {
    res.json(usersdata);
});

app.post('/users/',function(req,res) {
    log(req.get('content-type'));
    log(req.body);
    //res.send(req.body);
    usersdata.push(req.body);
    res.json({
        id: usersdata.length-1,
        user: req.body
    });
});

app.put('/users/:id',function(req,res) {
    res.json(usersdata);
});

app.delete('/users/:id',function(req,res) {
    res.json(usersdata);
});

app.get('/',function(req,res) {
    res.send('use path "users" and CRUD methods to test API');
});

app.listen(1337);