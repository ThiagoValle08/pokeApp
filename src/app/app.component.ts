import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalIntroComponent } from './components/modal-intro/modal-intro.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dialog.open(ModalIntroComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
