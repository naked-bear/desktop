const Datastore = require('nedb');
const filesDB = new Datastore({ filename: 'data/files.db', autoload: true });

module.exports = {
    loadFiles: function() {
        return new Promise(function (resolve, reject) {

            filesDB.find({}, function (err, files) {
                if (err) {
                    reject('failed to load files');
                }
                resolve(files);
            });

        });
    },
    addFiles: function(newFiles) {
        return new Promise(function (resolve, reject) {

            filesDB.insert(newFiles, function (err, files) {

                if(err){
                    reject('failed to add files');
                }

                resolve(files);

            });

        });
    },
    removeFile: function(fileId){
        return new Promise(function (resolve, reject) {
            filesDB.remove({ _id: fileId }, {}, function (err, num) {

                if(err){
                    reject('failed to remove file')
                }

                resolve(num);

            });

        });
    },
    removeAllFiles: function(){
        return new Promise(function (resolve, reject) {
            filesDB.remove({}, { multi: true }, function (err, num) {

                if(err){
                    reject('failed to remove files')
                }

                resolve(num);

            });

        });
    }
};

