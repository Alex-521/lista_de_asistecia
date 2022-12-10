import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { APIService, interG, interC } from '../SER/api.service';
import { MateriaService } from '../SER/materia.service';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.page.html',
  styleUrls: ['./data-modal.page.scss'],
})
export class DataModalPage implements OnInit {
  @Input() GetC: interC;
  @Input() GetG: interG;
  @Input() vista: string;

  per = [{}];
  asu = [];
  curso = { ini: '', fin: '' };
  dias = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
  constructor(
    private api: APIService,
    private modalC: ModalController,
    private apiM: MateriaService
  ) {
  }

  ngOnInit() { }
  NPeriodoUpdate(p: number) { this.per.length = p; }
  NAsuetoUpdate(p: number) { this.asu.length = p; }
  InicioUpdate(f: Date, i: number) { if (i == 0) { this.curso.ini = f + ""; (document.getElementById('fecI0') as HTMLInputElement).value = this.curso.ini; } }
  FinUpdate(f: Date, i: number) {
    if (i == this.per.length - 1) { this.curso.fin = f + ""; }
    if (i == this.per.length) { (document.getElementById('fecF' + (i - 1)) as HTMLInputElement).value = this.curso.fin; }
  }





  closeModal() { this.modalC.dismiss('', "closed"); }


  onSubmit(Form: NgForm) {
    const f = Form.value;
    if (f.lun || f.mar || f.mie || f.jue || f.vie || f.sab != undefined) {
      var data = {materia_nombre:'',grupo:'',alumno:'',clasesProgramada:'',asistencia:''};
      const inicio = new Date(this.curso.ini);
      const fin = new Date(this.curso.fin);
      var tiempo = inicio;

      var alu0 = [];
      var cla0 = [];
      var asi0 = [];
      var asueto = [];
      var asueto0 = [];

      for (let i = 0; i < f.NAsueto; i++) {
        asueto.push(
          {
            "fecha": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value,
            "nom": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value
          });
        asueto0.push({ "fecha": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value });
      }
      while (tiempo < fin) {
        tiempo.setDate(tiempo.getDate() + 1);
        const Manana = tiempo.toISOString().substring(0, 10);
        if (f.vacI != '' && f.vacF != '') { if (f.vacI == Manana) { tiempo = f.vacF; } }

        if (asueto.find(ele => ele == Manana) == undefined) {
          if (f.lun != 0 && this.dias[tiempo.getDay()] == 'lun') { for (let i = 0; i < f.lun; i++) { cla0.push(Manana); } }
          if (f.mar != 0 && this.dias[tiempo.getDay()] == 'mar') { for (let i = 0; i < f.mar; i++) { cla0.push(Manana); } }
          if (f.mie != 0 && this.dias[tiempo.getDay()] == 'mie') { for (let i = 0; i < f.mie; i++) { cla0.push(Manana); } }
          if (f.jue != 0 && this.dias[tiempo.getDay()] == 'jue') { for (let i = 0; i < f.jue; i++) { cla0.push(Manana); } }
          if (f.vie != 0 && this.dias[tiempo.getDay()] == 'vie') { for (let i = 0; i < f.vie; i++) { cla0.push(Manana); } }
          if (f.sab != 0 && this.dias[tiempo.getDay()] == 'sab') { for (let i = 0; i < f.sab; i++) { cla0.push(Manana); } }
        }
      }


      for (let i = 0; i < f.alu; i++) {
        alu0.push({ "nombres": " - ", "apellidos": "" });
        let A = [];
        cla0.forEach(c => {
          A.push('-');
        });
        asi0.push(A);
      }

      let alumnos = { 'alumnos': alu0 };
      let Clases = { 'Clases': cla0 };
      let asistencia = { 'asistencias': asi0 }
      
      data.materia_nombre = f.mat;
      data.grupo=( f.gru + f.gra);
      data.alumno= JSON.stringify(alumnos);
      data.clasesProgramada= JSON.stringify(Clases);
      data.asistencia =JSON.stringify(asistencia);

      this.apiM.create(data).subscribe(res => {
        this.modalC.dismiss(res, "created");
      });
    }else{
      alert('Debe tener al menor 1 dia de clase por semana');
    }

  }
}