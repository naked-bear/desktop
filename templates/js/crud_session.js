const Datastore = require('nedb');
const sessionDB = new Datastore({ filename: 'data/session.db', autoload: true });

module.exports = {
    createSession: function (user) {
        return new Promise(function (resolve, reject) {
            sessionDB.insert(user, function (err, user) {
                if(err){
                    reject('failed to add user');
                }
                resolve(user);
            });

        });
    },
    loadSession: function() {
        return new Promise(function (resolve, reject) {
            sessionDB.find({}, function (err, sessions) {
                if (err || sessions.length === 0) {
                    reject('failed to load session');
                }
                resolve(sessions[0]);
            });
        });
    },
    removeSession: function() {
        return new Promise(function (resolve, reject) {
            sessionDB.remove({}, { multi: true }, function (err, num) {
                if(err){
                    reject('failed to remove session')
                }
                resolve(num);
            });
        });
    }
};

