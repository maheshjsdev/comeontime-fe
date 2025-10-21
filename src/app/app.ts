import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material-module';
import { CommonModule } from '@angular/common';
import { Header } from './core/header/header';
import { Shared } from './shared/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showFiller = false;
  sharedServ = inject(Shared);
  protected title = 'comeontime-fe';
  isAuth = computed(() =>
    this.sharedServ.isAuthenticated() || this.sharedServ.isAuthAccess()
  );

}
