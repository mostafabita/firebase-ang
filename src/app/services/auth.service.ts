import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastService
  ) {}

  async signInWithGoogle() {
    try {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      if (credential.user !== undefined) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async createUser(displayName: string, email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await credential.user.updateProfile({
        displayName,
      });
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.toast.error(error.message);
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/landing']);
  }
}
