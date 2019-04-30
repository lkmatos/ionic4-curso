import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';

import { AuthService } from './../../core/services/auth.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task> {

  constructor(
    public db: AngularFirestore,
    private authService: AuthService
  ) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/tasks`, ref =>
          ref
            .orderBy('done', 'asc')
            .orderBy('title', 'asc')
        );
      } else {
        this.setCollection(null);
      }
    });
  }
}
