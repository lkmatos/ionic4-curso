import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TaskItemComponent
  ],
  exports: [
    TaskItemComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ComponentsModule { }
