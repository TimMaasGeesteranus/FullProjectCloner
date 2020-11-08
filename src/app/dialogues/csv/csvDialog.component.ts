import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  templateUrl: './csvDialog.component.html',
  styleUrls: ['./csvDialog.component.sass']
})

export class CsvDialogComponent {

  constructor(public dialogRef: MatDialogRef<CsvDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
