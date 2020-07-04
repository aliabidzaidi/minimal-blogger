import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as Knex from 'knex';

let win;

let knex = Knex({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite",
  },
});

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
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
  win.loadURL(`http://localhost:4200`);

  win.on('closed', () => {
    win = null;
  });

  // ipcMain.on("mainWindowLoaded", function () {
  //   let result = knex.select("FirstName").from("User");

  //   result.then(function (rows) {
  //     console.log(rows);
  //     win.webContents.send("resultSent", rows);
  //   });
  // });

  knex.select("FirstName").from("User").then(function (rows) {
    console.log("electron returned => ", rows);
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
  app.allowRendererProcessReuse = true;

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit(); }
  });

  app.on('activate', () => {
    if (win == null) { createWindow(); }
  });

} catch (error) {
  throw error;
}


