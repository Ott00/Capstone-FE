import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Service } from 'src/app/interfaces/service';
import { ReservedService } from 'src/app/services/reserved.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewServiceComponent } from '../dialog/new-service/new-service.component';
import { EditServiceComponent } from '../dialog/edit-service/edit-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  categories: Category[] = [];
  services: Service[] = [];
  dialog: MatDialog;
  editMode: boolean = false;
  constructor(
    private reservedSrv: ReservedService,
    private dialogRef: MatDialog
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
    this.getServices();
    this.getCategories();
  }

  getServices() {
    this.reservedSrv.getServices().subscribe((response) => {
      this.services = response.content;
    });
  }

  deleteService(id: string) {
    this.reservedSrv.deleteService(id).subscribe(() => {
      this.getServices();
    });
  }

  getCategories() {
    this.reservedSrv.getCategories().subscribe((response) => {
      this.categories = response.content;
    });
  }

  //DIALOG
  addService(categories: Category[]) {
    const dialog = this.dialogRef.open(NewServiceComponent, {
      data: { categories, dialog: this.dialog },
    });

    dialog.afterClosed().subscribe(() => {
      this.getServices();
    });
  }

  editService(categories: Category[], service: Service) {
    const dialog = this.dialogRef.open(EditServiceComponent, {
      data: { categories, dialog: this.dialog, service },
    });

    dialog.afterClosed().subscribe(() => {
      this.getServices();
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
