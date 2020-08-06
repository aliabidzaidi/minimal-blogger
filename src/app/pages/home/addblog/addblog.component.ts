import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

// install @angular/core, @angular/common, @angular/forms, @angular/platform-browser, quill, and rxjs
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss'],
})
export class AddblogComponent implements OnInit {
  @ViewChild('editor') editor;
  title = new FormControl('');
  isAutoSaving = false;

  modules = {
    // formula: true,
    toolbar: [
      // [{ header: [1, 2, false] }],
      [{ header: 1 }],
      [{ header: 2 }],
      ['clean'],
      [{ color: [] }, { background: ['#f00', '#0f0', '#00f'] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  logChange($event) {
    console.log(this.editor);
    console.log($event);
  }

  saveBlog() {
    this.isAutoSaving = !this.isAutoSaving;
  }

  // Add  Title text box

  // Save blog (autosave draft)
  // Publish blog button
  // Autosave button

  // delete draft

  // think about edit blog ??

  // Add tags to blogs
}
