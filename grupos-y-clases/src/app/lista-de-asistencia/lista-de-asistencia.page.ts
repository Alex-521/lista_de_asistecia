import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { MateriaService,M } from '../SER/materia.service';
@Component({
  selector: 'app-lista-de-asistencia',
  templateUrl: './lista-de-asistencia.page.html',
  styleUrls: ['./lista-de-asistencia.page.scss'],
})
export class ListaDeAsistenciaPage implements OnInit {
  id:any;
  ma:M[];
  m:any = "";
  constructor(
    private ARoute:ActivatedRoute,
    private materia:MateriaService,
  ) { }

  ngOnInit() {
    this.id = this.ARoute.snapshot.paramMap.get('id');
    this.materia.get(this.id).subscribe(resp => {
      // this.ma = JSON.parse(JSON.stringify(resp));
      this.m = resp[0];

      console.log(this.m);
      // console.log(JSON.stringify(this.ma));
    });
  }

}
