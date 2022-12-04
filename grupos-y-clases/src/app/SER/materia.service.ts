import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
export interface M {
  id_materia: number;
  materia_nombre:string;
  grupo:number;

  maestro:number;
  alumno:any;
  clasesProgramada:any;
  
  asistencia:any;
  id_g:number;
  nombre:string;
}

@Injectable({
  providedIn: 'root'
})



export class MateriaService {
  constructor(private http: HttpClient) { }
  private URL ='http://localhost/IDGS704/ARSO/API';

  getAll() {
    return this.http.get<[M]>(this.URL + '/materias');
  }
  get(id:number) {
    return this.http.get<[M]>(this.URL + '/materias/'+id);
  }
}
