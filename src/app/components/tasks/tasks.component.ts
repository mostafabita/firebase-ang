import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { faTimes, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { User, Task } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  form: FormGroup;
  tasks: any[];
  removeIcon = faTimes;
  checkedIcon = faCheckSquare;
  uncheckedIcon = faSquare;

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
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.tasks = data;
      });
  }
  submit(form: FormGroupDirective) {
    if (form.invalid) {
      return;
    }
    this.auth.user$.subscribe((user: User) => {
      const data: Task = {
        title: form.value.task,
        done: false,
        userId: user.uid,
        order: this.tasks.length,
      };
      this.db.collection('/tasks').add(data);
      form.resetForm();
    });
  }

  toggleStatus(task: Task) {
    const taskRef = this.db.doc(`/tasks/${task.id}`);
    const data = {
      title: task.title,
      done: !task.done,
      userId: task.userId,
      order: task.order,
    };
    taskRef.set(data);
  }

  removeTask(task: Task) {
    this.db.doc(`/tasks/${task.id}`).delete();
  }
}
