import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { UserService } from 'src/sdk/data-access/User.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  passwordVisible = false;

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private uService: UserService, private router: Router, private toastr: ToastrService) { }

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

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    let iUsername = this.validateForm.get('userName').value;
    let iPassword = this.validateForm.get('password').value;
    let iRemember = this.validateForm.get('remember').value;

    this.uService.authenticateUser(iUsername, iPassword)
      .then((result) => {
        // console.log(result);
        if (result.isAuthenticated) {
          console.log('redirect to home page');
          this.toastr.success('Login Successful', 'Success!', {
            timeOut: 3000
          });
          // save user details wrt. AuthGuards

          // if remember ==true r&d on that keep him logged in even if he closes the app

          // redirect to homepage
          this.router.navigateByUrl('/home');
        }
        else {
          this.toastr.error('Login credentials incorrect', 'Failed!', {
            timeOut: 3000
          });
          console.log('password incorrect');
          // show toastr or some kind of response
        }
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Internal Error', 'Failed', {
          timeOut: 3000
        });
      });
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

}
