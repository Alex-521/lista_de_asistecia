import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// import { ListaDeAsistenciaPageRoutingModule } from './lista-de-asistencia-routing.module';

import { ListaDeAsistenciaPage } from './lista-de-asistencia.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component:ListaDeAsistenciaPage
      }
    ])
  ],
  declarations: [ListaDeAsistenciaPage]
})
export class ListaDeAsistenciaPageModule {}
