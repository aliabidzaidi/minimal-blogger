import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    console.log('check user is logged in?');
    if (!this.authService.checkUser()) {
      this.router.navigateByUrl('/login');
    } else {
      return true;
    }
  }

}
