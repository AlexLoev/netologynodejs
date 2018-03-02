var RPC = {
    create: function(usersdata, params, callback) {
        if (params.name) {
            usersdata.push(params);
        }
        callback(null, params);
    },
    read: function(usersdata, params, callback) {
        callback(null, usersdata);
    },
    update: function(usersdata, params, callback) {
        if (params) {
            if (params.name) {
                let userid = usersdata.findIndex(user => user.name===params.name);
                if (userid != -1) {
                    usersdata[userid] = params;
                    callback(null, usersdata[userid]);
                } else {
                    const err = new Error(`Sorry, but we can't find user.name ${params.name} in DB. Make sure that you input a name of a user correctly.`);
                    err.code = 404;
                    callback(err, usersdata);
                }
            } else {
                const err = new Error(`Please, add a name of a user you wish to update`);
                err.code = 400;
                callback(err, usersdata);
            }
        } else {
            const err = new Error(`Please, add a user JSON you wish to update`);
            err.code = 400;
            callback(err, usersdata);
        }
    },
    delete: function(usersdata, params, callback) {
        if (params.name) {
            let userid = usersdata.findIndex(user => user.name===params.name);
            if (userid != -1) {
                usersdata.splice(userid,1);
                callback(null, usersdata);
            } else {
                const err = new Error(`Sorry, but we can't find user.name ${params.name} in DB. Make sure that you input a name of a user correctly.`);
                err.code = 404;
                callback(err, usersdata);
            }
        } else {
            const err = new Error(`Please, add a name of a user you wish to delete`);
            err.code = 400;
            callback(err, usersdata);
        }
    }
}

module.exports = RPC;