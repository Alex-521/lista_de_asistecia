import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular'

import { MateriaService, M } from '../SER/materia.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-lista-de-asistencia',
  templateUrl: './lista-de-asistencia.page.html',
  styleUrls: ['./lista-de-asistencia.page.scss'],
})
export class ListaDeAsistenciaPage implements OnInit {
  meses = { '01': "Ene", '02': "Feb", '03': "Mar", '04': "Abr", '05': "May", '06': "Jun", '07': "Jul", '08': "Ago", '09': "Sep", '10': "Oct", '11': "Nov", '12': "Dic" };
  id: any;
  ma: M[];
  m: any = "";
  @ViewChild('mySlider') slides: IonSlides;
  alumnos = [];
  clases = [];
  asistencias = [];
  parciales =[];
  contador = [[0], [0], [0], [0]];
  porcentajes = [];

  constructor(private ARoute: ActivatedRoute,private materia: MateriaService,private alertC: AlertController) { }

  ngOnInit() {
    this.porcentajes = [];
    this.id = this.ARoute.snapshot.paramMap.get('id');
    this.materia.get(this.id).subscribe(resp => {
      this.m = resp[0];
      this.alumnos = (JSON.parse(this.m.alumno)).alumnos;
      this.clases = (JSON.parse(this.m.clasesProgramada)).Clases;
      this.asistencias = JSON.parse(this.m.asistencia).asistencias;
      this.parciales = JSON.parse(this.m.parciales);
      (document.getElementById('pol') as HTMLInputElement).value = this.m.politica;
      for (let i = 0; i < this.clases.length; i++) {
        this.contador[0][i] = 0;
        this.contador[1][i] = 0;
        this.contador[2][i] = 0;
        this.contador[3][i] = 0;
      }
      this.asistencias.forEach(fila => {
        const P100 = this.clases.length;
        const Pol = fila.filter(f => f == 'R').length - fila.filter(f => f == 'R').length/this.m.politica;
        var item = 100*(fila.filter(f => f == 'A').length + fila.filter(f => f == 'J').length + Pol)/ P100;
        //var item = 100*(P100 - fila.filter(f => f == 'F').length - (fila.filter(f => f == 'R').length/this.m.politica))/ P100;
        this.porcentajes.push(Math.round(item));
        
        for (let i = 0; i < fila.length; i++) {
          switch (fila[i]) {
            case 'A': this.contador[0][i]++;
              break;
            case 'R': this.contador[1][i]++;
              break;
            case 'J': this.contador[2][i]++;
              break;
            case 'F': this.contador[3][i]++;
              break;

            default: break;
          }
        }
      });
      console.log(this.porcentajes);
    });
  }

  EXCEL() {
    const fileName = this.m.grupo + ' - ' + this.m.materia_nombre + '.xlsx';
    let data = [];

    for (let i = 0; i < this.alumnos.length; i++) {
      var obj = {};
      obj['Nombre'] = this.alumnos[i].nombres + ' ' + this.alumnos[i].apellidos;
      for (let j = 0; j < this.clases.length; j++) {
        obj[this.meses[this.clases[j].substring(5, 7)] + this.clases[j].substring(8, 10)] = this.asistencias[i][j];
      }
      data.push(obj);
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, fileName);
  }
  linkPDF(base64String: any, nombre: string) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${nombre}.pdf`
    link.click();
  }
  PDF(v: number) {
    var pdfParams = new FormData();
    var cla = [];
    var asi = [];
    this.alumnos.forEach(a => {
      var item = [];
      this.clases.forEach(c => { item.push('') });
      asi.push(item);
    });
    this.clases.forEach(c => {
      cla.push(this.meses[c.substring(5, 7)] + ' ' + c.substring(8, 10));
    });
    pdfParams.set('clases', JSON.stringify(cla));
    pdfParams.set('asistencias', JSON.stringify(asi));
    pdfParams.set('alumnos', JSON.stringify(this.alumnos));
    pdfParams.set('grupo', this.m.grupo);
    pdfParams.set('materia', this.m.materia_nombre);
    let base64String: any;
    this.materia.pdf(pdfParams).subscribe(resp => {
      base64String = JSON.parse(JSON.stringify(resp)).result;
      this.linkPDF(base64String, this.m.grupo + ' - ' + this.m.materia_nombre + '.pdf');
    });
  }
  onChangeAsi(f:CharacterData,x:number,y:number){this.asistencias[x][y] = f;}
  save() {
    const P = (document.getElementById('pol') as HTMLInputElement).value;
    let data={asistencia:'',alumno:'',id:this.id,politica:(P ==''? 2 : P)};
    let alu=[];
    for (let i = 0; i < this.alumnos.length; i++) {
      alu.push({
        "nombres": (document.getElementById('alu'+i) as HTMLInputElement).value,
        "apellidos": "" });
    }

    let alumnos = { 'alumnos': alu };
    let asistencia = { 'asistencias': this.asistencias }
    data.alumno= JSON.stringify(alumnos);
    data.asistencia= JSON.stringify(asistencia);
    
    this.materia.updateLista(data).subscribe(resp => {
      const r = JSON.parse(JSON.stringify(resp));
      if (r.status=='ok') {
        this.alertC.create({
          header:'Guardado exitoso',
          message:'Los cambios se guardaron con exito',
        }).then(AlertEl => AlertEl.present())
        this.ngOnInit();
      }
    });
  }

  goToSlide(ini:string){this.slides.slideTo(this.clases.indexOf(ini), 500);}
  addAlu(){
    this.alumnos.push({nombres:'',apellidos:''});
    let a = [];
    this.clases.forEach(c => {a.push('-');});
    this.asistencias.push(a);
  }
  DeleteAlu(a:number){
    this.alertC.create({
      header:'Eliminar alumno?',
      message:'Esta seguro de querer eliminar este alumno?',
      buttons:[{
        text:'Sí, eliminar',
        handler: ()=>{
          this.alumnos.splice(a,a);
          this.asistencias.splice(a,a);
          this.porcentajes.splice(a,a);
        }
      },{
        text:'No, cerrar'
      }]
    }).then(AlertEl => AlertEl.present())
  }
}