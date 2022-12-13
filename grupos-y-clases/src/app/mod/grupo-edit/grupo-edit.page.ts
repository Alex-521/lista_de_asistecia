import { Component, Input, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { M, MateriaService } from 'src/app/SER/materia.service';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.page.html',
  styleUrls: ['./grupo-edit.page.scss'],
})
export class GrupoEditPage implements OnInit {
  @Input() m: M;
  //data = { name: '', email: '', password: '' };
  data = { materia_nombre: '', grupo: '', escuela: '' }
  
  constructor(
    private api: MateriaService,
    private modalC: ModalController,
  ) { }
  ngOnInit() {
    this.data.materia_nombre = this.m.materia_nombre;
    this.data.grupo = this.m.grupo;
    this.data.escuela = this.m.escuela;
  }

  onSubmit(Form: NgForm) {
    const data = Form.value;
    console.log(data);
    
    this.api.update(data, this.m.id_materia).subscribe(() => {
      data.id = this.m.id_materia;
      this.modalC.dismiss(data, "update")
    });
  }
  closeModal() {this.modalC.dismiss(null, "closed");}
}
