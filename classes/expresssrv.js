var express = require('express');
var app = express();
const bodyparser = require('body-parser');
var RPC = require('../classes/rpcmethods');

const usersdata = [];
const log = console.log;


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/users/',function(req,res) {
    res.json(usersdata);
});

app.post('/users/',function(req,res) {
    if (req.body.name) {
        usersdata.push(req.body);
        res.json({
            id: usersdata.length-1,
            user: req.body
        });        
    } else {
        res.statusCode = 400;
        res.end(`Please, add a name of a user you wish to update`);        
    }
});

app.put('/users/:name',function(req,res) {
    if (req.body.name) {
        if (req.params.name) {
            let userid = usersdata.findIndex(user => user.name===req.params.name);
            if (userid != -1) {
                usersdata[userid] = req.body;
                res.json({
                    id: userid,
                    user: req.body
                });
            } else {
                res.statusCode = 404;
                res.end(`Sorry, but we can't find user.name "${req.params.name}" in DB. \nMake sure that you input a name of a user correctly.`);
            }
        } else {
            res.statusCode = 400;
            res.end(`Please, add a name of a user you wish to update`);
        }
    } else {
        res.statusCode = 400;
        res.end(`Please, add a user JSON you wish to update`);        
    }
});

app.delete('/users/:name',function(req,res) {
    if (req.params.name) {
        let userid = usersdata.findIndex(user => user.name===req.params.name);
        if (userid != -1) {
            usersdata.splice(userid,1);
            res.json(usersdata);
        } else {
            res.statusCode = 404;
            res.end(`Sorry, but we can't find user.name "${req.params.name}" in DB. \nMake sure that you input a name of a user correctly.`);
        }
    } else {
        res.statusCode = 400;
        res.end(`Please, add a name of a user you wish to delete`);
    }
});

app.get('/',function(req,res) {
    res.send('use "/users" to test restAPI or "/rpc" to test RPC');
});

app.post('/rpc',function(req, res) {
    if (req.body.jsonrpc == 2.0) {
        const method = RPC[req.body.method];
        method(usersdata, req.body.params, function(error, result) {
            if (error) {
                res.json({
                    jsonrpc: "2.0",
                    error: {
                        code: error.code,
                        message: error.message},
                    id: req.body.id
                });
            } else {
                res.json({
                    jsonrpc: "2.0",
                    result: result,
                    id: req.body.id
                });
            }
        });
    } else {
        res.statusCode = 400;
        res.end(`Please, use jsonrpc version "2.0" in body request`);   
    };
});
    

httpServer = require('http').createServer(app);
httpServer.listen(1337);


module.exports = httpServer;