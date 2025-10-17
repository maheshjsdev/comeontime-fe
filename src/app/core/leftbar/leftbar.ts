import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material-module';
import { TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  imports: [MaterialModule],
  templateUrl: './leftbar.html',
  styleUrl: './leftbar.scss'
})
export class Leftbar {
  showFiller = false;
  navItems: any = [
    { icon: 'home', tooltip: 'Practices', route: 'home' },
    { icon: 'assignment', tooltip: 'Invoices', route: 'invoice' },
    { icon: 'person_outline', tooltip: 'user', route: 'user' },
  ];
}
