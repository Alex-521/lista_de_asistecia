import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { MateriaService, M } from '../SER/materia.service';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.page.html',
  styleUrls: ['./data-modal.page.scss'],
})
export class DataModalPage implements OnInit {
  @Input() vista: string;
  NPer = 1;
  per = [{}];
  asu = [];
  curso = { ini: '', fin: '' };
  dias = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
  constructor(
    private modalC: ModalController,
    private apiM: MateriaService,
    private alertC: AlertController
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
      var data = { materia_nombre: '', grupo: '', alumno: '', clasesProgramada: '', 
      asistencia: '' ,parciales:''};

      var tiempo = new Date(f.fecI);
      var fin = new Date(f.fecF);
      fin.setDate(fin.getDate() + 1);
      var alu0 = [];
      var cla0 = [];
      var asi0 = [];
      var asueto = [];
      var asueto0 = [];
      var parciales = [];

      for (let i = 0; i < f.NAsueto; i++) {
        asueto.push(
          {
            "fecha": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value,
            "nom": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value
          });
        asueto0.push({ "fecha": (document.getElementById('asuetoFec' + i) as HTMLInputElement).value });
      }
      while (tiempo.toISOString().substring(0, 10) < fin.toISOString().substring(0, 10)) {
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
        tiempo.setDate(tiempo.getDate() + 1);
      }


      for (let i = 0; i < f.alu; i++) {
        alu0.push({ "nombres": " - ", "apellidos": "" });
        let A = [];
        cla0.forEach(c => {
          A.push('-');
        });
        asi0.push(A);
      }

      for (let i = 0; i < f.NPer; i++) {
        parciales.push({
          ini:(document.getElementById('fecI'+i) as HTMLInputElement).value,
          fin:(document.getElementById('fecF'+i) as HTMLInputElement).value
        });
      }

      let alumnos = { 'alumnos': alu0 };
      let Clases = { 'Clases': cla0 };
      let asistencia = { 'asistencias': asi0 }

      data.materia_nombre = f.mat;
      data.grupo = (f.gru + f.gra);
      data.parciales = JSON.stringify(parciales);
      data.alumno = JSON.stringify(alumnos);
      data.clasesProgramada = JSON.stringify(Clases);
      data.asistencia = JSON.stringify(asistencia);

      console.log(data.parciales);
      
      this.apiM.create(data).subscribe(res => {
        this.modalC.dismiss(res, "created");
      });
    } else {
      alert('Debe tener al menor 1 dia de clase por semana');
    }
  }




  validarDia(dia: string, id: any) {
    const D = new Date(dia);
    if (dia != '') {
      const validos = [
        (document.getElementsByName('lun')[0] as HTMLInputElement).value,
        (document.getElementsByName('mar')[0] as HTMLInputElement).value,
        (document.getElementsByName('mie')[0] as HTMLInputElement).value,
        (document.getElementsByName('jue')[0] as HTMLInputElement).value,
        (document.getElementsByName('vie')[0] as HTMLInputElement).value,
        (document.getElementsByName('sab')[0] as HTMLInputElement).value, 0];
      if (validos[D.getDay()] != '' || 0) {
        switch (id.id) {
          case 'fecI': (document.getElementById('fecI0') as HTMLInputElement).value = dia; break;
          case 'fecF': (document.getElementById('fecF' + (this.per.length - 1)) as HTMLInputElement).value = dia; break;

          case 'fecI0': (document.getElementById('fecI') as HTMLInputElement).value = dia; break;
          case 'fecF' + (this.per.length - 1): (document.getElementById('fecF') as HTMLInputElement).value = dia; break;

          default:
            break;
        }
      } else {
        id.value = '';
        this.alertC.create({ header: 'Día no habil', message: 'El día en el que inicia o termina un periodo o el curso debe ser un día de clase', }).then(AlertEl => AlertEl.present())
      }
    }
  }
















}
