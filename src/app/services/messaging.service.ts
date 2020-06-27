import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage$ = new BehaviorSubject(null);

  constructor(
    private afMessaging: AngularFireMessaging,
    private afStore: AngularFirestore,
    private auth: AuthService
  ) {
    this.afMessaging.messaging.subscribe((messaging) => {
      messaging.onMessage = messaging.onMessage.bind(messaging);
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(token);
        console.log(token);
      },
      (error) => {
        console.error('Unable to get permission to notify.', error);
      }
    );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage$.next(payload);
    });
  }

  updateToken(token: string) {
    this.auth.user$.subscribe((user: User) => {
      const tokenRef = this.afStore.doc(`fcmTokens/${user.uid}`);
      tokenRef.set({ token });
    });
  }
}
