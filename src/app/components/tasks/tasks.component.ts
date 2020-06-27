import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  form: FormGroup;
  tasks: any[];

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      task: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.db
      .collection('/tasks')
      .valueChanges()
      .subscribe((data) => {
        this.tasks = data;
      });
  }

  submit(form: FormGroupDirective) {
    if (form.invalid) {
      return;
    }
    this.auth.user$.subscribe((user: User) => {
      const body = {
        title: form.value.task,
        done: false,
        userId: user.uid,
      };
      this.db.collection('/tasks').add(body);
      form.resetForm();
    });
  }
}
