import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  courses: any[];

  constructor(private db: AngularFirestore) {
    this.db
      .collection('/courses')
      .valueChanges()
      .subscribe((res) => (this.courses = res));
  }
}
