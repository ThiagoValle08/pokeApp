import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-intro',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-intro.component.html',
  styleUrl: './modal-intro.component.css',
})
export class ModalIntroComponent {
  constructor(public dialogRef: MatDialogRef<ModalIntroComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
