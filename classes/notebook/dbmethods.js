const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;
const uri = 'mongodb://127.0.0.1:27017/netology';
const dbname = 'netology';
const log = console.log;
const ObjectID = mongodb.ObjectID; //используется для поиска документов по id

async function insertcontact(contact) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            await collection.insertOne(contact);
            return contact._id;
        }
    } catch (err) {
        return new Error(err);
    }
    db.close();
};

async function selectcontacts(skip, limit) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            return await collection.find({}).skip(skip).limit(limit).toArray();
        }
    } catch (err) {
        return new Error(err);
    }
};

async function selectcontactbyid(id) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            var findresults = await collection.find({_id: ObjectID(id)}).toArray();
            if (findresults[0]) {
                return findresults[0];
            } else {
                return new Error(`Not matched by _id:${id}`); 
            }
        }
    } catch (err) {
        return new Error(err);
    }
};

async function updatecontactbyid(id, contact) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            var updateresult = await collection.findOneAndUpdate({_id: ObjectID(id)},contact, {returnNewDocument: 1});
            if (updateresult.value._id) {
                return updateresult.value._id;
            } else {
                return new Error(`Not matched by _id:${id}`); 
            }
        }
    } catch (err) {
        return new Error(err);
    }
};


async function deletecontactbyid(id) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            var deleteresults = await collection.deleteOne({_id: ObjectID(id)});
            if (deleteresults.deletedCount) {
                return deleteresults;
            } else {
                return new Error(`Not matched by id:${id}`);        
            }
        }
    } catch (err) {
        return new Error(err);
    }
};

async function showcontacts(skip, limit) {
    var contacts = await selectcontacts(skip, limit);
    contacts.forEach(element => {
        log(element);
    });
};

async function showcontact(id) {
    var contact = await selectcontactbyid(id);
    if (contact) {
        log(contact);
    } else {
        log(`Not matched by _id:${id}`);        
    }
};

async function searchcontacts(filter) {
    try {
        db = await mongoclient.connect(uri)
        var collection = db.db(dbname).collection('contacts');
        if (collection) {
            var findresults = await collection.find(filter).toArray();
            if (findresults) {
                return findresults;
            } else {
                return new Error(`Not matched by filter:${filter.name} ${filter.tel} ${filter.skype}`); 
            }
        }
    } catch (err) {
        return new Error(err);
    }
};

//var contact = {name: 'Nat', gender: 'F', tel: "115", skype: 'natali', language: ['fra']};
// insertcontact(contact);
//showcontacts(50,10);

// var id = "5a90d753cd637e11788aac9e"
//showcontact(id);
//deletecontactbyid(id);
// updatecontactbyid(id, contact)

module.exports = {
    insertcontact,
    selectcontacts,
    selectcontactbyid,
    updatecontactbyid,
    deletecontactbyid,
    searchcontacts
};