const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyparser = require('body-parser');

const db = require('./dbmethods');
const log = console.log

app.use(express.static(__dirname+'/client/')); //здесь будем хранить все файлы, которые понадобятся на клиенте
app.use(bodyparser.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/contacts/', (req, res) => {
    if (req.query.name) {
        log('search');
        search(req, res);
    } else {
        db.selectcontacts(0,25)
        .then(contacts => {
            if (contacts instanceof Error) {
                dberr(contacts, res);
            } else {
                res.json(contacts);
            }
        })
        .catch(err => {dberr(err, res)});
    }
});

app.post('/contacts/', (req, res) => {
    if (req.body.name) {
        db.insertcontact(req.body)
        .then(id => {
            if (id instanceof Error) {
                dberr(id, res);
            } else {  
                res.redirect(`/contacts/${id}`); //пока будем открывать страницу нового пользователя
            }
        })
        .catch(err => dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a contact JSON in body`);        
    }
});

app.put('/contacts/:id', (req, res) => {
    if (req.params.id) {
        if (req.body.name) {
            db.updatecontactbyid(req.params.id, req.body)
            .then(id => {
                if (id instanceof Error) {
                    dberr(id, res);
                } else {  
                    res.redirect(`/contacts/${id}`); //пока будем открывать страницу нового пользователя
                }
            })
            .catch(err => dberr(err, res));
        } else {
            res.statusCode = 400;
            res.end(`Please, add a contact JSON in body`);        
        }
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid contact id');     
    }
});

app.get('/contacts/:id', (req, res) => {
    if (req.params.id) {
        db.selectcontactbyid(req.params.id)
        .then(contact => {
            if (contact instanceof Error) {
                dberr(contact, res);
            } else {
                log(contact);
                res.json(contact);
            }
        })
        .catch(err => {dberr(err, res)})
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid contact id');
    }
});

app.delete('/contacts/:id', (req, res) => {
    if (req.params.id) {
        db.deletecontactbyid(req.params.id)
        .then(contact => {
            if (contact instanceof Error) {
                dberr(contact, res);
            } else {
                if (contact.result.ok) {
                    res.redirect('/contacts');
                } else {
                    dberr(new Error(`Can't delete document ${req.params.id}`), res);
                }
            }
        })
        .catch(err => {dberr(err, res)})
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid contact id');
    }
});

http.listen(1337);

function search(req, res) {
    query = req.query;
    log(query);
    if (query) {
        db.searchcontacts(query)
        .then(contacts => {
            if (contacts instanceof Error) {
                dberr(contacts, res);
            } else {
                res.json(contacts);
            }
        })
        .catch(err => {dberr(err, res)})
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid contact id');
    }
};

function dberr(err, res) {
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('DB Error');
};