import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  names: any[] = [{ FirstName: 'One' }, { FirstName: 'Two' }];
  
  constructor(
    private dbService: DbCallerService
  ) { }

  ngOnInit() {
    this.getNames();
  }

  getNames() {
    this.dbService.knexObj.select("FirstName").from("User").then((rows) => {
      console.log(rows);
      console.log(this.names);
      this.names = rows;
    });
  }

}
