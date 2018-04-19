'use strict';

const electron = require('electron');
const {app, BrowserWindow} = electron;

let win;


function build(){

    win = new BrowserWindow({
        width: 1280,
        height: 960,
        minWidth: 1280,
        minHeight: 960,
        title: "NakedBear - Direct File Sharing",
        icon: 'templates/images/nakedbear.png'
    });

    // win.setMenu(null);

    win.loadURL('file://' + __dirname + '/templates/index.html');


    win.on('closed', function() {
        win = null;
    });

}



app.on('ready', () => build());


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (win === null) {
        build();
    }
});