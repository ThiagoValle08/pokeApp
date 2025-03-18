import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [DividerModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  title = 'pokeApp';
  activeLink = 'dashboard';

  toggleSidebar() {}

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
