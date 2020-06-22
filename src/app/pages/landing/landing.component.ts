import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
