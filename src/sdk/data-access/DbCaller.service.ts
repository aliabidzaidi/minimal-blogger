import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, BrowserWindow } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as Knex from 'knex';

@Injectable({
  providedIn: 'root'
})
export class DbCallerService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  knexObj: Knex;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      this.knexObj = window.require('knex')({
        client: "sqlite3",
        connection: {
          filename: "./database.sqlite",
        },
      });
      this.knexObj.schema.hasTable('User').then(function (exists) { console.log(`User table exists ${exists}`); });


    }
  }

  getAllUsers(): Promise<any> {
    console.log('get names called');
    let names: any[];
    return this.knexObj.select("*").from("User");
  }


}