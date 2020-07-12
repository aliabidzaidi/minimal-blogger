import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/sdk/data-access/User.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  dateFormat = 'dd/MM/yyyy';
  passwordVisible = false;
  cpasswordVisible = false;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['officer@mail.com', [Validators.email, Validators.required]],
      password: ['123456', [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: ['officer', [Validators.required]],
      // agree: [false],
      // TODO: Add following properties
      dateOfBirth: ['1996-01-01', [Validators.required]],
      gender: [null, [Validators.required]],
    });

    // 'officer@mail.com', '12345', 'officer', '20/06/1996' , 'Male

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

    let username = this.validateForm.get('username').value;
    let email = this.validateForm.get('email').value;
    let password = this.validateForm.get('password').value;
    let dob = this.validateForm.get('dateOfBirth').value;
    let gender = this.validateForm.get('gender').value;
    console.log(username, email, password, dob, gender);

    this.userService.registerUser(username, email, password, dob, gender)
      .then(
        (res) => {
          console.log(res);
          this.toastr.success('Successfully added user, Login to continue', 'Success!', {
            timeOut: 3000
          });
          this.router.navigateByUrl('/login');
        }
      ).catch((err) => {
        console.log(err);
        this.toastr.error('Failed to add User', 'Failed!', {
          timeOut: 3000
        });
      });
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

  getDateToString(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }

}
