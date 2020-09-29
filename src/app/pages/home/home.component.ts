import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/sdk/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  username = '🤔🤔🤔';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    console.log('logging out');
    this.authService.removeUser();
    this.router.navigateByUrl('/login');
  }

  log() {
    console.log('Profile button clicked');
  }
}
