import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listblog',
  templateUrl: './listblog.component.html',
  styleUrls: ['./listblog.component.scss']
})
export class ListblogComponent implements OnInit {

  dummyDescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim rerum eius ab itaque soluta excepturi, nesciunt maxime dicta tenetur impedit. Totam harum laborum doloribus at saepe atque nesciunt! Possimus, placeat.";
  dummyDescription2 = "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Totam harum laborum doloribus at saepe atque nesciunt! Possimus, placeat.";

  constructor() { }

  ngOnInit(): void {
  }

}
