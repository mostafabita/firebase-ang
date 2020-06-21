import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit() {}

  submit() {
    this.afAuth
      .signInWithEmailAndPassword(
        this.form.value.email,
        this.form.value.password
      )
      .then((res) => {
        debugger;
        console.log(res);
      });
  }
}
