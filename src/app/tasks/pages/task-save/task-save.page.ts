import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { TasksService } from './../../services/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskForm: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  init() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskId = taskId;
      this.pageTitle = 'Edit Task';
      this.tasksService
        .get(taskId)
        .pipe(take(1))
        .subscribe(({ title, done }) => {
          this.taskForm.get('title').setValue(title);
          this.taskForm.get('done').setValue(done);
        });
    } else {
      this.pageTitle = 'Create Task';
    }

  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const task = !this.taskId
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
          id: this.taskId,
          ...this.taskForm.value
        });
      this.navCtrl.navigateBack('/tasks');
    } catch (error) {
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }

}
