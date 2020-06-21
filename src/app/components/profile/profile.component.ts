import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((data: User) => {
      this.user = {
        displayName: data.displayName,
        photoUrl: data.photoURL,
      };
    });
  }
}
