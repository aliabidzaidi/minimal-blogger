import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DbCallerService } from 'src/sdk/data-access/dbCaller.service';
import { Interface } from 'readline';
import { Blog } from 'src/sdk/Types/Blogs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// install @angular/core, @angular/common, @angular/forms, @angular/platform-browser, quill, and rxjs
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss'],
})
export class AddblogComponent implements OnInit {
  title = new FormControl('');
  bodyLoaded = false;

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
  isSaved = false;
  modules = {
    // formula: true,
    toolbar: [
      // [{ header: [1, 2, false] }],
      [{ header: 1 }],
      [{ header: 2 }],
      ['clean'],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
  };
  listOfOption: Array<{ label: string; value: string }> = [];

  constructor(
    private router: Router,
    private dbCaller: DbCallerService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let opt of this.listOfCategories) {
      children.push({ label: opt.label, value: opt.value });
    }

    // for (let i = 10; i < 36; i++) {
    //   children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    // }
    this.listOfOption = children;
    this.formInitializer();

    // this.blogForm.valueChanges.subscribe(console.log);
  }

  ngOnDestroy() {
    this.saveForm();
  }

  ngAfterViewChecked() {
    this.updateBody();
  }

  formInitializer() {
    this.blogForm = this.fb.group({
      tags: new FormControl([]), //array of strings
      published: [false, [Validators.required]], // boolean
      date: [Date(), [Validators.required]], // date
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
          Validators.minLength(20),
          Validators.maxLength(2500),
        ],
      ],
    });
    this.getForm();
  }

  saveBlog() {
    // this.isAutoSaving = !this.isAutoSaving;
    // this.isSaved = !this.isSaved;
    this.blogForm.patchValue({
      body: document.querySelector('.ql-editor').innerHTML,
    });
    if (!this.blogForm.valid) {
      console.log('form is dirty');

      for (const i in this.blogForm.controls) {
        this.blogForm.controls[i].markAsDirty();
        this.blogForm.controls[i].updateValueAndValidity();
      }
    } else {
      console.log('Form submitted with =>', this.blogForm.value);
      const newBlog = new Blog();
      newBlog.title = this.blogForm.value.title;
      newBlog.published = Boolean(this.blogForm.value.published) ? 1 : 0;
      let d = new Date(this.blogForm.value.date);
      console.log(d);
      console.log(d.toLocaleDateString());
      newBlog.date = d.toLocaleDateString();
      newBlog.body = this.blogForm.value.body;
      newBlog.tags = this.blogForm.value.tags.toString();
      newBlog.userId = Number(localStorage.getItem('userId'));
      this.dbCaller
        .saveBlog(newBlog)
        .then((res) => {
          console.log(res);
          this.toastr.success('Successfully added Blog', 'Success!', {
            timeOut: 3000,
          });
          console.log('Blog inserted');
          this.clearForm();
          this.router.navigateByUrl('/home/blogs');
        })
        .catch((err) => {
          console.log(err);
          this.toastr.error('Failed to add User', 'Failed!', {
            timeOut: 3000,
          });
        });
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

  clearForm() {
    localStorage.removeItem('form-data');
  }

  saveForm() {
    this.blogForm.patchValue({
      body: document.querySelector('.ql-editor').innerHTML,
    });
    localStorage.setItem('form-data', JSON.stringify(this.blogForm.value));
  }

  getForm() {
    const formLocal = localStorage.getItem('form-data');
    // console.log(formLocal);
    if (formLocal != null) {
      const formValues = JSON.parse(formLocal);

      this.blogForm.patchValue({
        published: formValues.published,
        tags: formValues.tags,
        date: formValues.date,
        title: formValues.title,
        body: formValues.body,
      });
    }
  }

  updateBody() {
    // document.querySelector('.ql-editor').innerHTML = formValues.body;
    const editor = this.elementRef.nativeElement.querySelector('.ql-editor');
    if (editor != null) {
      if (!this.bodyLoaded) {
        console.log('Blog body value=>', this.blogForm.value.body);
        editor.innerHTML = this.blogForm.value.body;
        this.bodyLoaded = true;
      }
      // console.log(editor.innerHTML);
    }
  }
}
