import { OverlayService } from './../../../core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from './../../services/tasks.service';
import { Task } from './../../models/task.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task) {
    this.navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'No'
      ]
    });
  }

  async onDone(task: Task) {
    const taskToUpdate = { ...task, done: !task.done};
    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}" ${taskToUpdate.done ? 'completed' : 'updated'}!`
    });
  }

}
