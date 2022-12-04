import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'data',
    loadChildren: () => import('./data-modal/data-modal.module').then( m => m.DataModalPageModule)
  },
  {
    path: 'del',
    loadChildren: () => import('./mod/del/del.module').then( m => m.DelPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./mod/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'lista-de-asistencia/:id',
    loadChildren: () => import('./lista-de-asistencia/lista-de-asistencia.module').then( m => m.ListaDeAsistenciaPageModule)
  }
];








@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
