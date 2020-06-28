import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { auth, User } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { CustomUser } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<CustomUser> | any;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore
            .doc<CustomUser>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signInWithGoogle() {
    try {
      this.spinner.show();
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.spinner.hide();
      if (credential.user !== undefined) {
        await this.updateUserData(credential.user);
        this.router.navigate(['/dashboard/tasks']);
      }
    } catch (error) {
      this.spinner.hide();
      this.toast.error(error.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      this.spinner.show();
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.spinner.hide();
      this.router.navigate(['/dashboard/tasks']);
    } catch (error) {
      this.spinner.hide();
      this.toast.error(error.message);
    }
  }

  async createUser(displayName: string, email: string, password: string) {
    try {
      this.spinner.show();
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await credential.user.updateProfile({
        displayName,
      });
      await this.updateUserData(credential.user);
      this.spinner.hide();
      this.router.navigate(['/dashboard/tasks']);
    } catch (error) {
      this.spinner.hide();
      this.toast.error(error.message);
    }
  }

  async logout() {
    this.spinner.show();
    await this.afAuth.auth.signOut();
    this.spinner.hide();
    this.router.navigate(['/landing']);
  }

  private updateUserData(user: CustomUser) {
    const userRef: AngularFirestoreDocument<CustomUser> = this.afStore.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }
}
