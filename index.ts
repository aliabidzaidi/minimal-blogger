import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win;
function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: true,
    //   allowRunningInsecureContent: false
    // }
  });
  // require('electron-reload')(__dirname, {
  //   electron: require(`${__dirname}/node_modules/electron`)
  // });
  win.loadURL(`http://localhost:4200`);

  win.on('closed', () => {
    win = null;
  });

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


