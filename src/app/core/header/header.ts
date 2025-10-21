import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private router: Router, private sharedServ: Shared) { }
  logoutCliked() {
    window.localStorage.clear();
    this.sharedServ.setAuth(false);
    this.router.navigateByUrl('/login');
  }
}
