const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyparser = require('body-parser');

const db = require('./dbmethods');
const log = console.log

app.use(express.static(__dirname+'/client/')); //здесь будем хранить все файлы, которые понадобятся на клиенте
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.set('views',__dirname+'/views');

app.get('/', (req,res) => {
    res.redirect('/contacts?fav=on'); //по умолчанию показываем избранные контакты
});

app.get('/contacts/new', (req,res) => {
    var data = {
        name: '',
        tel: '',
        skype: ''
    }
    res.render('inputcontact',{data, url: '/contacts', method: 'POST'});
});

app.get('/contacts/', (req, res) => {
    if (req.query) {
        search(req, res);
    } else {
        db.selectcontacts(0,25)
        .then(contacts => {
            if (contacts instanceof Error) {
                dberr(contacts, res);
            } else {
                res.render('template', {data: contacts});
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
                res.redirect(`/contacts/`); //пока будем открывать страницу контактов
            }
        })
        .catch(err => dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a contact JSON in body`);        
    }
});


//используется вместо PUT, чтобы не заморачиваться с переопределением метода PUT в html form submit (там могут быть только post и get)
app.post('/contacts/:id', (req, res) => {
    if (req.params.id) {
        if (req.body.name) {
            db.updatecontactbyid(req.params.id, req.body)
            .then(id => {
                if (id instanceof Error) {
                    dberr(id, res);
                } else {  
                    res.redirect(`/contacts/`); //пока будем открывать страницу контактов
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

//добавляем контакт в избранное
app.put('/contacts/setfav/:id&:fav', (req, res) => {
    if (req.params.id) {
        db.contactsetfavbyid(req.params.id,req.params.fav)
        .then(id => {
            if (id instanceof Error) {
                dberr(id, res);
            } else {  
                res.statusCode = 200;
                res.statusMessage = "Set favorite to "+req.params.fav;
                res.end();
            }
        })
        .catch(err => dberr(err, res));
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
                res.render('inputcontact', {data: contact, url: '/contacts/'+contact._id, method: 'POST'});
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
                    res.statusCode = 200;
                    res.statusMessage = "Deleted successfully";
                    res.end();
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


function search(req, res) {
    query = req.query;
    clean(query);
    if (query) {
        db.searchcontacts(query)
        .then(contacts => {
            if (contacts instanceof Error) {
                dberr(contacts, res);
            } else {
                res.render('template', {data: contacts, query});
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

function clean(obj) {
    for (var propName in obj) { 
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
        }
    }
};

http.listen(1337);