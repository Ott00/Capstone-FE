import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: User;
  dialog: MatDialog;
  showPassword!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservedSrv: ReservedService,
    private snackbar: MatSnackBar
  ) {
    this.user = data.user;
    this.dialog = data.dialog;
  }

  ngOnInit(): void {}

  editMe(registerForm: NgForm) {
    this.reservedSrv.updateMe(registerForm.value).subscribe(() => {
      this.dialog.closeAll();
      this.snackbar.open('Utente mofidicato!', 'Ok', { duration: 2500 });
    });
  }

  showPasswordOrNot() {
    this.showPassword = !this.showPassword;
  }
}
