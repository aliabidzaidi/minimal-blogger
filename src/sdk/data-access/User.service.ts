import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, BrowserWindow } from 'electron';
import * as Knex from 'knex';
import * as crypto from 'crypto-js';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  knexObj: Knex;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {

      this.knexObj = window.require('knex')({
        client: 'sqlite3',
        connection: {
          filename: './database.sqlite',
        },
        useNullAsDefault: true
      });

      // this.knexObj.schema.hasTable('User').then((exists) => { console.log(`User table exists ${exists}`); });


    }
  }

  getAllUsers(): Promise<any> {
    console.log('get names called');
    let names: any[];
    return this.knexObj.select('*').from('User');
  }

  authenticateUser(username, password): Promise<any> {

    // Call DB and fetch current username
    return this.knexObj.select('*').from('User').where('username', username)
      .then(
        (rows) => {
          let user = rows[0];

          // compare password
          let isAuthenticated = this.comparePassword(password, user.Password);

          // compare password if username found
          if (!isAuthenticated) {
            console.log('password incorrect');
            return { user: null, isAuthenticated: false };
          }
          else {
            console.log('password correct');
          }

          // on success return success response
          return { user, isAuthenticated: true };
        });


  }

  registerUser(username, email, password, dateOfBirth, gender) {

    // check email & username should be unique


    const hashPassword = this.getEncryptedPassword(password);
    console.log(hashPassword);
    // store in Database
    return this.knexObj('User')
      .insert({
        Username: username, Email: email, Password: hashPassword,
        DOB: dateOfBirth, Gender: gender
      });
    // on success return success response

    // on failure return error response
  }

  changePassword(username, oldPassword, newPassword) {
    // get User By Username

    // encrypt current password

    // compare current password

    // update new password in DB

    // return response
  }

  // Decide how to change forgotten password
  // forgotPassword(){}

  getUser(username) {
    // return select * from User where username==username
  }

  private getEncryptedPassword(password) {
    const saltRounds = 3;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    return encryptedPassword;
  }

  private comparePassword(password, hash) {
    const isAuthenticated = bcrypt.compareSync(password, hash);
    return isAuthenticated;
  }


}
