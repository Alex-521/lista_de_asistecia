import { DataModalPage } from '../data-modal/data-modal.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { APIService, interG, interC } from '../SER/api.service';
import { MateriaService,M } from '../SER/materia.service';
import { GrupoService,G } from "../SER/grupo.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  GetC: interC[];
  GetG: interG[];
  mat: M[];
  gru: G[];
  vista = 'materias'
  constructor(
    private api: APIService,
    private materia:MateriaService,
    private grupo:GrupoService,

    private alertC: AlertController,
    private modalC: ModalController
  ) { }

  ngOnInit() {
    this.grupo.getAll().subscribe(resp => {
      this.gru = resp;
    });
    this.materia.getAll().subscribe(resp => {
      this.mat = resp;
    });
  }
  logs(m:any){
console.log(m);

  }
  // -----------------------------------------------------------------------
  VGrupos() {
    this.vista = 'grupos';
    this.api.getG().subscribe(resp => {
      this.GetG = resp;
    });
  }
  VMaterias() {
    this.vista = 'materias';
    
  }


  VListaC(g:interG){
    this.vista = 'fechas';
    this.GetC = [];
    this.api.getC2(g.id_g).subscribe(resp => {
      this.GetC = resp;
    });
  }

  DelC(id: string) {
    this.alertC.create({
      header: 'Eliminar?',
      message: 'Desae aliminar esta clase?',
      buttons: [{
        text: 'Sipi',

        handler: () => {
          this.api.removeC(id).subscribe(() => {
            this.GetC = this.GetC.filter(c => c.id_c !== id);
          });
        }
      }, {
        text: 'Nop'
      }]
    }).then(AlertEl => AlertEl.present())
  }
  DelG(id: string) {
    this.alertC.create({
      header: 'Eliminar?',
      message: 'Desae aliminar este grupo?',
      buttons: [{
        text: 'Si',

        handler: () => {
          this.api.removeG(id).subscribe(() => {
            this.GetG = this.GetG.filter(g => g.id_g !== id);
          });
        }
      }, {
        text: 'No'
      }]
    }).then(AlertEl => AlertEl.present())
  }


  add() {
    if (this.vista == 'fechas') {
      this.modalC.create({
        component: DataModalPage,
        componentProps: {vista: this.vista}
      }).then(modal => {
        modal.present()
        return modal.onDidDismiss();
      }).then(({data,role})=>{
        if(role === "created"){
          this.api.getC().subscribe(resp => {
            this.GetC = resp;
          });  
        }
      })
    } else {
      this.modalC.create({
        component: DataModalPage,
        componentProps: {vista: this.vista}
      }).then(modal => {
        modal.present()
        return modal.onDidDismiss();
      }).then(({data,role})=>{
        if(role === "created"){
          this.api.getG().subscribe(resp => {
            this.GetG = resp;
          });  
        }
      })
    }
    
  }



  verDetalles(GetC:interC){
    this.modalC.create({
      component:DataModalPage,
      componentProps: {GetC,vista: this.vista}
    }).then(modal =>{
      modal.present()
      return modal.onDidDismiss();
    }).then(({data,role})=>{
      this.api.getC().subscribe(resp => {
        this.GetC = resp;
      });
      this.GetC = this.GetC.filter(std=>{
        if(data.id_c === std.id_c){
          console.log(data);
          return data;
        }
        return std;
      });
    });
  }

  verDetallesG(GetG:interG){
    this.modalC.create({
      component:DataModalPage,
      componentProps: {GetG,vista: this.vista}
    }).then(modal =>{
      modal.present()
      return modal.onDidDismiss();
    }).then(({data,role})=>{
      this.api.getG().subscribe(resp => {
        this.GetG = resp;
      });

      this.GetG = this.GetG.filter(std=>{
        if(data.id_g === std.id_g){
          return data;
        }
        return std;
      });
    });
  }
}
