import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HeaderComponent } from './components/header/header.component';
import { MasterComponent } from './pages/master/master.component';
import { MenusComponent } from './components/menus/menus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './components/toasts/toasts.component';
import { SafeBgUrlPipe } from './pipes/safe-bg-url.pipe';
import { AbbrPipe } from './pipes/abbr.pipe';
import { AuthService } from './services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MessagingService } from './services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    DashboardComponent,
    HeaderComponent,
    MasterComponent,
    MenusComponent,
    ProfileComponent,
    ToastsComponent,
    SafeBgUrlPipe,
    AbbrPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    NgbToastModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireMessagingModule,
    NgxSpinnerModule,
  ],
  providers: [AuthService, MessagingService, AsyncPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
