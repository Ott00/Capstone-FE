import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { Service } from 'src/app/interfaces/service';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  categories: Category[];
  dialog: MatDialog;
  service: Service;

  maxLength: number = 255;
  maxLengthRemaining: number = 255;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservedSrv: ReservedService
  ) {
    this.categories = data.categories;
    this.dialog = data.dialog;
    this.service = data.service;
  }

  ngOnInit(): void {
    this.filterCategories();
  }

  editService(newServiceForm: NgForm, image: string) {
    newServiceForm.value.image = image;
    this.reservedSrv
      .editService(newServiceForm.value, this.service.id)
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }

  filterCategories() {
    this.categories = this.categories.filter(
      (category) => category.name !== this.service.category.name
    );
  }
}
