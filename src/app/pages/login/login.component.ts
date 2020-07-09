import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nzSpanLeft = 12;
  nzSpanRight = 6;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  isSmallScreen = false;
  loginForm: FormGroup;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.updateScreen(window.innerWidth);
    this.resizeObservable$ = fromEvent(window, "resize");
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.updateScreen(evt["target"]["innerWidth"]);
    });
  }


  submitForm(): void {
    console.log('form submited');
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateScreen(width) {
    if (width <= 1000) {
      this.isSmallScreen = true;
      this.nzSpanLeft = 20;
      this.nzSpanRight = 0;
    } else {
      this.isSmallScreen = false;
      this.nzSpanLeft = 10;
      this.nzSpanRight = 6;
    }
  }

  // submitForm(){
  //   console.log('form submitted')
  // }
}
