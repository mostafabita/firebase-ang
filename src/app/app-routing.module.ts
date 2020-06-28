import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MasterComponent } from './pages/master/master.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { TasksComponent } from './components/tasks/tasks.component';

function customRedirectLoggedInTo() {
  return redirectLoggedInTo(['/dashboard']);
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    component: LandingComponent,
    ...canActivate(customRedirectLoggedInTo()),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(customRedirectLoggedInTo()),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(customRedirectLoggedInTo()),
  },
  {
    path: 'dashboard',
    component: MasterComponent,
    ...canActivate(redirectUnauthorizedTo(['landing'])),
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
        path: 'tasks',
        component: TasksComponent,
        data: {
          title: 'Tasks',
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
