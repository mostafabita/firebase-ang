import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  loginWidthGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        if (result.user !== undefined) {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
