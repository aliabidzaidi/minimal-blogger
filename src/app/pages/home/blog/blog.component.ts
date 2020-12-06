import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';
import { Blog } from 'src/sdk/Types/Blogs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  id: Number;
  blog: Blog = new Blog();

  constructor(
    private route: ActivatedRoute,
    private dbCaller: DbCallerService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getBlogById();
  }

  getBlogById() {
    this.dbCaller.getBlogById(this.id).then((data) => {
      console.log('fetched data =>', data);
      this.blog.id = data[0].Id;
      this.blog.title = data[0].Title;
      this.blog.body = data[0].Body;
      this.blog.date = data[0].Date;
      this.blog.tags = data[0].tags;
      this.blog.userId = data[0].UserId;
    });
  }
}
