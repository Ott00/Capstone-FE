import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { ResponseImage } from 'src/app/interfaces/response-image';
import { PerfomancesService } from 'src/app/services/performances.service';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
})
export class NewServiceComponent implements OnInit {
  categories: Category[];
  dialog: MatDialog;
  file!: File;
  urlImage!: ResponseImage;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservedSrv: ReservedService,
    private performanceSrv: PerfomancesService
  ) {
    this.categories = data.categories;
    this.dialog = data.dialog;
  }

  ngOnInit(): void {}

  uploadImage(image: any) {
    this.file = image.target.files[0];
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('image', this.file);

      this.performanceSrv
        .uploadPerformanceImage(formData)
        .subscribe((response) => {
          this.urlImage = response;
          console.log(response);
        });
    } else {
      throw 'Nessun file caricato.';
    }
  }

  saveService(newServiceForm: NgForm) {
    const formData = new FormData();
    newServiceForm.value.image = this.urlImage.image;

    this.reservedSrv.saveService(newServiceForm.value).subscribe((response) => {
      this.dialog.closeAll();
    });
  }
}
