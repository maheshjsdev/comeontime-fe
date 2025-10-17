import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Leftbar } from './core/leftbar/leftbar';
import { MaterialModule } from './shared/material-module';
import { CommonModule } from '@angular/common';
import { Header } from './core/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  showFiller = false;
  isAuth: any = true;
  protected title = 'comeontime-fe';
 ngOnInit() {
  const value = sessionStorage.getItem('isAuthenticated');
  console.log(value)
  // this.isAuth = value === '1'; 
  console.log(typeof this.isAuth, this.isAuth);
}

}
