import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  form: FormGroup;
  courses: any[];
  searchTerm = new FormControl('');

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.db
      .collection('/courses')
      .valueChanges()
      .subscribe((data) => {
        this.courses = data;
      });

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {
          return this.db
            .collection('/courses', (ref) => {
              return ref.orderBy('title').startAt(term).endAt(`${term}\uf8ff`);
            })
            .valueChanges();
        })
      )
      .subscribe((data) => {
        this.courses = data;
      });
  }
}
