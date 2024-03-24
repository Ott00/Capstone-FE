import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utils/token.interceptor';
import { ErrorHandlerInterceptor } from './utils/error-handler.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExpertsComponent } from './views/experts/experts.component';
import { PerformancesComponent } from './views/performances/performances.component';
import { ReservedComponent } from './views/reserved/reserved.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ServicesComponent } from './components/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NewServiceComponent } from './components/dialog/new-service/new-service.component';
import { EditServiceComponent } from './components/dialog/edit-service/edit-service.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PerformanceCardComponent } from './components/performance-card/performance-card.component';
import { PerformanceDetailsComponent } from './components/performance-details/performance-details.component';
import { PerformanceExplorerComponent } from './components/performance-explorer/performance-explorer.component';
import { NewAppointmentComponent } from './components/dialog/new-appointment/new-appointment.component';
import { RoleGuard } from './auth/guard/role.guard';
import { AppointmentExpertComponent } from './components/appointment-expert/appointment-expert.component';
import { AppointmentRequestComponent } from './components/dialog/appointment-request/appointment-request.component';
import { AppointmentClientComponent } from './components/appointment-client/appointment-client.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'services',
    component: PerformancesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'explorer',
        component: PerformanceExplorerComponent,
      },
      {
        path: ':id',
        component: PerformanceDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'explorer',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'experts',
    component: ExpertsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reserved',
    component: ReservedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'expertAppointments',
        component: AppointmentExpertComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'FREELANCER' },
      },
      {
        path: 'clientAppointments',
        component: AppointmentClientComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'CLIENT' },
      },
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'FREELANCER' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ExpertsComponent,
    PerformancesComponent,
    ReservedComponent,
    UserCardComponent,
    UserProfileComponent,
    ServicesComponent,
    NewServiceComponent,
    EditServiceComponent,
    SpinnerComponent,
    PerformanceCardComponent,
    PerformanceExplorerComponent,
    PerformanceDetailsComponent,
    NewAppointmentComponent,
    AppointmentExpertComponent,
    AppointmentRequestComponent,
    AppointmentClientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
