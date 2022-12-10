import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { MateriaService, M } from '../SER/materia.service';
@Component({
  selector: 'app-lista-de-asistencia',
  templateUrl: './lista-de-asistencia.page.html',
  styleUrls: ['./lista-de-asistencia.page.scss'],
})
export class ListaDeAsistenciaPage implements OnInit {
  meses = [
    "ENE", "FEB", "MAR",
    "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP",
    "OCT", "NOV", "DIC"
  ]
  id: any;
  ma: M[];
  m: any = "";

  alumnos = [];
  clases = [];
  asistencias = [];
  contador = [[0],[0],[0],[0]];

  constructor(
    private ARoute: ActivatedRoute,
    private materia: MateriaService,
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('id');
    this.materia.get(this.id).subscribe(resp => {
      // this.ma = JSON.parse(JSON.stringify(resp));
      this.m = resp[0];
      this.alumnos = (JSON.parse(this.m.alumno)).alumnos;
      this.clases = (JSON.parse(this.m.clasesProgramada)).Clases;
      this.asistencias = JSON.parse(this.m.asistencia).asistencias;
      //console.log(JSON.stringify(this.ma));

      for (let i = 0; i < this.clases.length; i++) {
        this.contador[0][i]=0;
        this.contador[1][i]=0;
        this.contador[2][i]=0;
        this.contador[3][i]=0;
      }
      this.asistencias.forEach(fila => {
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

            default:break;
          }
        }
      });
      //   for(var k in result) {
      //     alert(result[k]);
      //  }

    });
  }

  pdf(){
    var pdf = {
      fechaInicio:this.clases[0],
      fechaFin:this.clases[this.clases.length],
      diasClase: this.clases,
      cantidadAlumons: this.alumnos,
      materia:this.m.materia_nombre,
      grupo:this.m.grupo
    }
    
    this.materia.pdf(pdf).subscribe(res => {});
  }
}
