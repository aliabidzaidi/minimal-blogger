import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';
import { Interface } from 'readline';

// install @angular/core, @angular/common, @angular/forms, @angular/platform-browser, quill, and rxjs
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss'],
})
export class AddblogComponent implements OnInit {
  @ViewChild('editor') editor;
  title = new FormControl('');

  listOfCategories: Array<{ label: string; value: string }> = [
    { label: 'C language', value: 'clang' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'C Sharp', value: 'csharp' },
    { label: 'Angular', value: 'angular' },
    { label: 'MongoDB', value: 'mongodb' },
    { label: 'SQL Server', value: 'sqlserver' },
    { label: 'NodeJS', value: 'nodejs' },
  ];
  blogForm: FormGroup;

  isAutoSaving = false;
  isSaved = true;
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
  listOfOption: Array<{ label: string; value: string }> = [];

  constructor(private dbCaller: DbCallerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let opt of this.listOfCategories) {
      console.log(opt);
      children.push({ label: opt.label, value: opt.value });
    }

    // for (let i = 10; i < 36; i++) {
    //   children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    // }
    this.listOfOption = children;
    this.formInitializer();

    this.blogForm.valueChanges.subscribe(console.log);
  }

  print() {}

  formInitializer() {
    this.blogForm = this.fb.group({
      tags: new FormControl([]), //array of strings
      published: [false, [Validators.required]], // boolean
      date: '', // date
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ],
      ], // string
      body: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2500),
        ],
      ],
    });
  }

  saveBlog() {
    // this.isAutoSaving = !this.isAutoSaving;
    // this.isSaved = !this.isSaved;
    this.blogForm.patchValue({
      body: document.querySelector('.ql-editor').innerHTML,
    });
    console.log();
    if (!this.blogForm.valid) {
      console.log('form is dirty');
    } else {
      console.log('Form submitted with =>', this.blogForm.value);
    }
    // console.log(this.editor);
    // let blog = new Blog();
    // blog.Title = this.title.value;
    // blog.Title = this.title.value;
  }

  getDateNow() {
    console.log(Date().toString());
    this.blogForm.patchValue({
      date: Date(),
    });
  }
}

class Blog {
  id: Number;
  title: string;
  body: string;
  date: string;
  published: string;
  tags: [];
  userId: Number;

  constructor() {}
}
