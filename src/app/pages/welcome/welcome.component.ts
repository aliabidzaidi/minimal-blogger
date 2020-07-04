import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  names;

  constructor(
    // private _electronService: ElectronService,
    private dbService: DbCallerService
  ) { }

  ngOnInit() {
    // const isAnElectronApp: boolean = this._electronService.isElectronApp;
    // console.log(isAnElectronApp);
    // // this.getData();
    // this.playPingPong();

    this.checkDB();
  }

  checkDB() {
    // console.log(this.dbService.knexObj);
    // console.log(this.dbService.knexObj.client);
    // console.log(this.dbService.knexObj.__knex__);


    this.names = this.dbService.getNames();
    this.dbService.knexObj.select("FirstName").from("User").then(function (rows) {
      console.log("Welcome DBcall => ", rows);
      // this.names = rows.values;
      // for (var i = 0; i < rows.length; i++) {
      //   this.names.push(rows[i].FirstName);
      // }
    });
  }

  // playPingPong() {
  //   let pong: string = this._electronService
  //       .ipcRenderer.sendSync('ping', 'ping by Welcome');
  //   console.log(pong);

  // }

  // getData(){

  //   this._electronService.ipcRenderer.send("mainWindowLoaded");
  //   this._electronService.ipcRenderer.on("resultSent", function(evt, result){
  //     let resultDiv = document.getElementById('result');
  //       console.log(result);
  //       // users = result
  //       // for(var i=0;i<result.length;i++){
  //       //     resultDiv.innerHTML += "<h3>" + result[i].FirstName.toString() + '</h3>';
  //       // }
  //   });

  // }
}
