import { Component, OnInit } from '@angular/core';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';

@Component({
  selector: 'app-listblog',
  templateUrl: './listblog.component.html',
  styleUrls: ['./listblog.component.scss'],
})
export class ListblogComponent implements OnInit {
  blogs = [];
  dummyDescription =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim rerum eius ab itaque soluta excepturi, nesciunt maxime dicta tenetur impedit. Totam harum laborum doloribus at saepe atque nesciunt! Possimus, placeat.';
  dummyDescription2 =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.  Totam harum laborum doloribus at saepe atque nesciunt! Possimus, placeat.';

  constructor(private dbCaller: DbCallerService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.dbCaller.getAllBlogs().then((data) => {
      console.log('Inside List Blog component =>', data);
      this.blogs = data;
    });
    console.log(this.blogs);
  }
}
