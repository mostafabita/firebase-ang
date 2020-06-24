import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage$ = new BehaviorSubject(null);

  constructor(public angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe((messaging) => {
      messaging.onMessage = messaging.onMessage.bind(messaging);
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (error) => {
        console.error('Unable to get permission to notify.', error);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage$.next(payload);
    });
  }
}
