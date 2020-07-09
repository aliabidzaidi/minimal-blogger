"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var Knex = require("knex");
var win;
var knex = Knex({
    client: "sqlite3",
    connection: {
        filename: "./database.sqlite"
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: false
        }
    });
    // require('electron-reload')(__dirname, {
    //   electron: require(`${__dirname}/node_modules/electron`)
    // });
    win.loadURL("http://localhost:4200");
    win.on('closed', function () {
        win = null;
    });
    // ipcMain.on("mainWindowLoaded", function () {
    //   let result = knex.select("FirstName").from("User");
    //   result.then(function (rows) {
    //     console.log(rows);
    //     win.webContents.send("resultSent", rows);
    //   });
    // });
    knex.select("*").from("User").then(function (rows) {
        console.log("Testing sqlite in electron with * Users => ", rows);
    });
    // win.webContents.on('did-finish-load', () => {
    //   ipcMain.on('ping', (event, arg) => {
    //     console.log(arg); // prints "ping by Welcome"
    //     event.returnValue = 'pong by Electron';
    //   });
    // });
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
