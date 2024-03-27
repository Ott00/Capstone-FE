import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-delete-element',
  templateUrl: './delete-element.component.html',
  styleUrls: ['./delete-element.component.scss'],
})
export class DeleteElementComponent implements OnInit {
  confirmed!: boolean;
  id!: string;
  title: string;
  dialogRef: MatDialog;

  constructor(
    private reservedSrv: ReservedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.title = data.title;
    this.dialogRef = data.dialog;
  }

  ngOnInit(): void {}

  deleteService() {
    this.reservedSrv.deleteService(this.id).subscribe(() => {
      this.dialogRef.closeAll();
    });
  }
}
