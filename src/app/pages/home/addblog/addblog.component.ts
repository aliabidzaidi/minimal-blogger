import { Component, OnInit, ViewChild } from '@angular/core';

// install @angular/core, @angular/common, @angular/forms, @angular/platform-browser, quill, and rxjs
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss'],
})
export class AddblogComponent implements OnInit {
  @ViewChild('editor') editor;

  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.initComponent();
  }

  logChange($event) {
    console.log(this.editor);
    console.log($event);
  }

  initComponent() {
    // setTimeout(() => {
    //   console.log('timeout called');
    //   let el = document.querySelector('.tox-statusbar__branding').style.display = 'none';
    // }, 2000);
  }

  // Add  Title text box

  // Save blog (autosave draft)
  // Publish blog button
  // Autosave button

  // delete draft

  // think about edit blog ??

  // Add tags to blogs
}
