import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { GrupoEditPage } from './grupo-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component:GrupoEditPage
      }
    ])
  ],
  declarations: [GrupoEditPage]
})
export class GrupoEditPageModule {}
