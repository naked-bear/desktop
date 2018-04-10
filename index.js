const electron = require('electron');
const {app, BrowserWindow} = electron;
const SessionOperations = require('./templates/js/crud_session');

const viewsDir = '/templates/views/';

let win;

app.on('ready', () => {

    win = new BrowserWindow({
        width: 800,
        height: 640,
        minWidth: 800,
        minHeight: 640,
        title: "NakedBear - Direct File Sharing",
        icon: 'templates/images/nakedbear.png'
    });


    SessionOperations.loadSession().then(function (session) {
        win.loadURL('file://' + __dirname + viewsDir + 'index.html');
    }).catch(function (err) {
        win.loadURL('file://' + __dirname + viewsDir + 'noauth.html');
    });


});