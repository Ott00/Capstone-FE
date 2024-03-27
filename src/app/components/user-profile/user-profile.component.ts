import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { ReservedService } from 'src/app/services/reserved.service';
import { EditProfileComponent } from '../dialog/edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: User;

  hide: boolean = true;
  hovered: boolean = false;
  dialog: MatDialog;

  file!: File;

  constructor(
    private reservedSrv: ReservedService,
    private dialogRef: MatDialog
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
    this.getMe();
  }

  getMe() {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;
    });
  }

  editMe() {
    const dialog = this.dialog.open(EditProfileComponent, {
      data: { user: this.user, dialog: this.dialog },
    });
    dialog.afterClosed().subscribe(() => {
      this.getMe();
    });
  }

  uploadImage(image: any) {
    this.file = image.target.files[0];
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('avatar', this.file);

      this.reservedSrv.editUserAvatar(formData).subscribe(() => {
        this.getMe();
      });
    } else {
      throw 'Nessun file caricato.';
    }
  }
}
