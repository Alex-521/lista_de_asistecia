import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { APIService, interG, interC } from '../SER/api.service';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.page.html',
  styleUrls: ['./data-modal.page.scss'],
})
export class DataModalPage implements OnInit {
  @Input() GetC: interC;
  @Input() GetG: interG;
  @Input() vista: string;

  opc: interG[];
  isUpdate = false;
  dataC = {
    id_c:'',
    fecha: '',
    grupo: '',
    nombre: '',

    tema_programado: '',
    avances: '',
    comentarios: ''
  };
  dataG={
    id_g:'',
    nombre:''
  }
  dataGOP={}

  constructor(
    private api: APIService,
    private modalC: ModalController,
  ) {
  }

  ngOnInit() {
    if (this.GetC) {
      this.isUpdate = true;
      this.dataC = this.GetC;
    }
    if (this.GetG) {
      this.isUpdate = true;
      this.dataG = this.GetG;
      this.dataGOP = {
        nombre:this.dataG.nombre.substring(7, this.dataG.nombre.length),
        cuatri:this.dataG.nombre.substring(5, 6),
        ano:this.dataG.nombre.substring(0,4)
      }
    }
    this.api.getG().subscribe(resp => {
      this.opc = resp;
    });
  }

  onSubmit(Form: NgForm) {
        const data = Form.value;
        if (this.vista == 'fechas') {
          if (this.isUpdate) {
            this.api.updateC(data, this.GetC.id_c).subscribe(() => {
              data.id = this.GetC.id_c;
              this.modalC.dismiss(data, "update")
            });
          } else {
      
            this.api.createC(data).subscribe(res => {
              this.modalC.dismiss(res, "created");
            });
          }
        } else {
          if (this.isUpdate) {
            this.api.updateG(data, this.GetG.id_g).subscribe(() => {
              data.id = this.GetG.id_g;
              this.modalC.dismiss(data, "update")
            });
          } else {
            this.api.createG(data).subscribe(res => {
              this.modalC.dismiss(res, "created");
            });
          }
        }
        
    }
  closeModal() {this.modalC.dismiss('', "closed");}
}