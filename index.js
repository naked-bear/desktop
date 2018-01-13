const electron = require('electron');
const {app, BrowserWindow} = electron;

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

    win.loadURL('file://' + __dirname + '/templates/pages/login.html');
});