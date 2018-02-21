const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;
const uri = 'mongodb://127.0.0.1:27017/test';
const log = console.log
// var filter = {};
var updatestr = {name:'Sveta'};

mongoclient.connect(uri, (err, client) => {
    if (err) {
        log(`can't connect to mongodb ${uri}`);
    } else {
        log(`connection successful to ${uri}`);
        var collection = client.db('test').collection('users');

        var user1 = {name: 'Alex', gender: 'M', language: ['eng','rus']};
        var user2 = {name: 'Lena', gender: 'F'};
        var user3 = {name: 'Valuya', gender: 'F', language: 'rus'};

        collection.insertMany([user1, user2, user3], (err, result) => {
            if (err) {
                log(err);
            } else {
                log('В БД были добавлены новые пользователи');
            }
        });

        collection.find({}).toArray(logfind);
        collection.find({gender:'F'}).toArray(logfind);

        collection.findOneAndUpdate({gender:'F'}, {'$set': updatestr})
        .then(result => {log(`Пользователь ${result.value.name} изменил свое имя на ${updatestr.name}`);})
        .then(result => {
            collection.find({gender:'F'}).toArray(logfind);
            collection.deleteOne({gender:'F'}, () => {
                log('Один пользователь успешно удален');
            });
            collection.find({gender:'F'}).toArray(logfind);
    
            collection.deleteMany({}, () => {
                log('Все пользователи успешно удалены');
            });
        })
        .catch(err => {log(err)});
        

        
    }
});

function logfind(err, result) {
    if (err) {
        log(err);
    } else if (result.length) {       
        phrase = 'Список пользователей';
        log('-'.repeat(50));
        result.forEach(item => {
            log(item.name);
        });
        log('-'.repeat(50));        

    } else {
        log('Не найдено ни одного документа по запросу');
    }
};
