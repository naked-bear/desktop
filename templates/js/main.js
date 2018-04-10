const {
    shell,
    remote
} = require('electron');
const path = require('path');
const nakedbear = require('../../nakedbear');
const FileOperations = require('../js/crud_files');
const SessionOperations = require('../js/crud_session');

let nakedSession = {};
let nakedFiles = [];

const loadNakedFiles = function () {
    return new Promise(function (resolve, reject) {
        let content = "";
        if (nakedFiles.length > 0) {
            for (let i = 0; i < nakedFiles.length; i++) {
                let url = generateFileUrl(nakedFiles[i]._id);
                content += "<tr id='" + nakedFiles[i]._id + "' class='nakedFile'><td>" + nakedFiles[i].name + "</td> <td><a onclick=\"shell.openExternal('" + url + "')\">" + url + "</a></td> <td class='has-text-centered'>0</td> <td class='has-text-right'><a class='delete' onclick=\"removeFile('" + nakedFiles[i]._id + "')\"></a></td> </tr>";
            }
            resolve(content);
        }
        reject('no content');
    });
};


function init(){
    SessionOperations.loadSession().then(function (session) {
        FileOperations.loadFiles().then(function (files) {
            nakedSession = session;
            nakedFiles = files;
            render();
        });
    }).catch(function (err) {
       window.location.replace('noauth.html');
    });
}


function render () {
    loadNakedFiles().then(function (content) {
        $("#yesfiles").removeClass('is-hidden');
        $("#nofiles").addClass('is-hidden');
        $("#files").empty().append(content);
    }).catch(function (err) {
        $("#yesfiles").addClass('is-hidden');
        $("#nofiles").removeClass('is-hidden');
    });
}


function getFileName(path){
    return path.replace(/^.*[\\\/]/, '');
}


function generateFileUrl(fileId){
    return nakedbear.url + '/' + nakedSession.username + '/' + fileId;
}


function removeFile(fileId){
    FileOperations.removeFile(fileId).then(function(num){
        for(let i=0; i<nakedFiles.length; i++){
            if(nakedFiles[i]._id === fileId){
                nakedFiles.splice(i, 1);
                break;
            }
        }
        render();
    }).catch(err => console.log(err));
}


$( document ).ready(function() {

    init();

    $("#clearAll").click(function () {

        remote.dialog.showMessageBox({buttons: ['Ok', 'Cancel'], message: 'Remove all naked files?' }, function (index) {
            if(index === 0){
                FileOperations.removeAllFiles().then(function (num) {
                   nakedFiles = [];
                   render();
                });
            }
        });


    });

    $( "#browse" ).click(function () {

        let newFiles = [];

        let paths = remote.dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});

        if(paths !== null && paths.length > 0) {


            for (let i = 0; i < paths.length; i++) {

                let name = getFileName(paths[i]);

                let file = {
                    name: name,
                    path: paths[i],
                    added: new Date()
                };

                let shouldAddFile = true;

                for(let j=0; j<nakedFiles.length; j++){
                    if(nakedFiles[j].path === file.path){
                        shouldAddFile = false;
                        break;
                    }
                }

                if(shouldAddFile){
                    newFiles.push(file);
                }

            }


            FileOperations.addFiles(newFiles).then(function (addedFiles) {
                nakedFiles.push(...addedFiles);
                render();
            }).catch(err => console.log(err));

        }

    });


    $("#signoutBtn").click(function () {
        SessionOperations.removeSession().then(function () {
           window.location.replace('noauth.html');
        });
    });

    $("#myAccountBtn").click(function () {
        Navigator.navigate('account');
    });

    $("#nakedFilesBtn").click(function () {
        Navigator.navigate('nakedFiles');
    });

});