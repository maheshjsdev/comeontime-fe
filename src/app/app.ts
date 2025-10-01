import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Leftbar } from './core/leftbar/leftbar';
import { MaterialModule } from './shared/material-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Leftbar, MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showFiller = false;
  protected title = 'comeontime-fe';
}
