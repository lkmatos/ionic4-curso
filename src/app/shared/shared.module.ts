import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';

@NgModule({
  declarations: [
    MenuToggleComponent,
    LogoutButtonComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MenuToggleComponent,
    LogoutButtonComponent
  ]
})
export class SharedModule { }
