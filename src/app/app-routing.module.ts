import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MasterComponent } from './pages/master/master.component';
import { CoursesComponent } from './components/courses/courses.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: MasterComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['']),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main',
      },
      {
        path: 'main',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          title: 'Courses',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
