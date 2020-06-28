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
import { Task, CustomUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { ToastService } from '../../services/toast.service';

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
  user: CustomUser;

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private toast: ToastService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      task: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.db
        .collection('/tasks', (ref) =>
          ref.where('userId', '==', user.uid).orderBy('order')
        )
        .valueChanges({ idField: 'id' })
        .pipe(
          switchMap((tasks: any[]) => {
            return combineLatest(
              of(tasks),
              this.db.collection('/users').valueChanges()
            );
          }),
          map(([tasks, users]: [Task[], CustomUser[]]) => {
            return tasks.map((task: Task) => {
              return {
                ...task,
                user: users.find(
                  (user: CustomUser) => user.uid === task.userId
                ),
              };
            });
          })
        )
        .subscribe((data) => {
          this.tasks = data;
        });
    });
  }

  submit(form: FormGroupDirective) {
    if (form.invalid) {
      return;
    }
    const data: Task = {
      title: form.value.task,
      done: false,
      userId: this.user.uid,
      order: this.tasks.length,
    };
    this.db.collection('/tasks').add(data);
    form.resetForm();
  }

  toggleStatus(task: Task) {
    const taskRef = this.db.doc(`/tasks/${task.id}`);
    const data = {
      title: task.title,
      done: !task.done,
      userId: task.userId,
      order: task.order,
    };
    taskRef.set(data).catch((error) => {
      this.toast.error(error.message);
    });
  }

  removeTask(task: Task) {
    this.db
      .doc(`/tasks/${task.id}`)
      .delete()
      .catch((error) => {
        this.toast.error(error.message);
      });
  }
}
