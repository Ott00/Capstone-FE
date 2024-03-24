import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
import { User } from 'src/app/interfaces/user';
import { PerfomancesService } from 'src/app/services/performances.service';
import { NewAppointmentComponent } from '../dialog/new-appointment/new-appointment.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-performance-details',
  templateUrl: './performance-details.component.html',
  styleUrls: ['./performance-details.component.scss'],
})
export class PerformanceDetailsComponent implements OnInit {
  id!: string | null;
  performance!: Service;
  freelancer!: User;
  dialog: MatDialog;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private performanceSrv: PerfomancesService,
    private dialogRef: MatDialog,
    private reservedSrv: ReservedService
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getIdAndPerformance();
  }

  getCurrentUser() {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;
    });
  }

  getIdAndPerformance() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.getPerformance();
    }
  }

  getPerformance() {
    this.performanceSrv.getPerfomancesById(this.id!).subscribe((response) => {
      this.performance = response;
      this.freelancer = response.freelancer;
    });
  }

  bookAppointment(user: User, performance: Service) {
    const dialog = this.dialogRef.open(NewAppointmentComponent, {
      data: { user, dialog: this.dialog, performance },
    });

    dialog.afterClosed().subscribe(() => {
      // alert('Prenotazione Effettuata');
    });
  }
}
