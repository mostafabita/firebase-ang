import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> | any;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private toast: ToastService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signInWithGoogle() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      if (credential.user !== undefined) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async createUser(displayName: string, email: string, password: string) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await credential.user.updateProfile({
        displayName,
      });
      await this.updateUserData(credential.user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/landing']);
  }

  private updateUserData(user: User) {
    debugger;
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(
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
