import { DataModalPage } from '../data-modal/data-modal.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { APIService, interG, interC } from '../SER/api.service';
import { MateriaService, M } from '../SER/materia.service';
import { GrupoEditPage } from '../mod/grupo-edit/grupo-edit.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  GetC: interC[];
  GetG: interG[];
  mat: M[];
  
  vista = 'materias'
  constructor(
    private api: APIService,
    private materia: MateriaService,
    

    private alertC: AlertController,
    private modalC: ModalController
  ) { }

  ngOnInit() {
    this.materia.getAll().subscribe(resp => {
      this.mat = resp;
    });
  }
  // -----------------------------------------------------------------------
  
  add() {
      this.modalC.create({
        component: DataModalPage,
        componentProps: { vista: this.vista }
      }).then(modal => {
        modal.present()
        return modal.onDidDismiss();
      }).then(({ data, role }) => {
        if (role === "created") {
          this.materia.getAll().subscribe(resp => {
            this.mat = resp;
          });
        }
      })
  }
  Delete(id:string){
    this.alertC.create({
      header:'Eliminar grupo?',
      message:'Esta seguro de querer eliminar este grupo?',
      buttons:[{
        text:'Eliminar',
        handler: ()=>{
          this.materia.delete(id).subscribe(()=>{
            this.materia.getAll().subscribe(resp => {
              this.mat = resp;
            });
          });
        }
      },{
        text:'No, cerrar'
      }]
    }).then(AlertEl => AlertEl.present())
  }
  Update(m: M){
    this.modalC.create({
      component:GrupoEditPage,
      componentProps: {m}
    }).then(modal =>{
      modal.present()
      return modal.onDidDismiss();
    }).then(({data,role})=>{
      if (role === "update") {
        this.materia.getAll().subscribe(resp => {
          this.mat = resp;
        });
      }
    });
  }
}
