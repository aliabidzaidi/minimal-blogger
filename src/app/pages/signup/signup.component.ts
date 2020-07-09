import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  nzSpanLeft = 6;
  nzSpanRight = 12;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  isSmallScreen = false;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      agree: [false]

      // TODO: Add following properties
      // DateOfBirth: [null, [Validators.required]],
      // Gender: [null, [Validators.required]],
    });

    this.updateScreen(window.innerWidth);
    this.resizeObservable$ = fromEvent(window, "resize");
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.updateScreen(evt["target"]["innerWidth"]);
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateScreen(width) {
    if (width <= 1000) {
      this.isSmallScreen = true;
      this.nzSpanLeft = 0;
      this.nzSpanRight = 20;
    } else {
      this.isSmallScreen = false;
      this.nzSpanLeft = 6;
      this.nzSpanRight = 12;
    }
  }

}
