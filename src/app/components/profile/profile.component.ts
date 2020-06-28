import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {}
}
