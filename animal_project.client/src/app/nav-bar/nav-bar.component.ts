import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private _router: Router) { }

  constructor(private _router: Router) { }



  get UserId(): any {
    return localStorage.getItem("UserId");
  }

  logout() {
    localStorage.removeItem("UserId");
    this._router.navigate(['/'])
  }
}
