import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  submit() {
    this.afAuth
      .createUserWithEmailAndPassword(
        this.form.value.email,
        this.form.value.password
      )
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.form.value.name,
          })
          .then((res) => {
            this.router.navigate(['/dashboard']);
          })
          .catch((error) => {
            this.toast.error(error.message);
          });
      })
      .catch((error) => {
        this.toast.error(error.message);
      });
  }
}
