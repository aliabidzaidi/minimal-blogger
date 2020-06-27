"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    // require('electron-reload')(__dirname, {
    //   electron: require(`${__dirname}/node_modules/electron`)
    // });
    win.loadURL("http://localhost:4200");
    win.on('closed', function () {
        win = null;
    });
    return win;
}
try {
    electron_1.app.allowRendererProcessReuse = true;
    electron_1.app.on('ready', createWindow);
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        if (win == null) {
            createWindow();
        }
    });
}
catch (error) {
    throw error;
}
