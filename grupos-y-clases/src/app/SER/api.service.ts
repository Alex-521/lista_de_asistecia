import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
export interface interC {
  id_c: string;
  fecha: string;
  grupo: string;
  nombre: string;

  tema_programado: string;
  avances: string;
  comentarios: string;
}
export interface interG {
  id_g: string;
  nombre: string;
}
export interface interGH {
  id_g: string;
  nombre: string;
  ano:string;
  cuatri:string;
}
@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }
  //private URL = 'http://localhost/IDGS704/ARSO/API-GruposYClases/Home';
  private URL ='http://localhost/IDGS704/ARSO/API';

  getC() {
    return this.http.get<[interC]>(this.URL + '/appC');
  }
  getG() {
    return this.http.get<[interG]>(this.URL + '/appG');
  }
  getC2(id:string) {
    return this.http.get<[interC]>(this.URL + '/appC/'+id);
  }

  removeC(id: string){
    return this.http.delete(this.URL+'/appC/'+id);
  }
  removeG(id: string){
    return this.http.delete(this.URL+'/appG/'+id);
  }

  createC(i: interC){
    return this.http.post(this.URL+'/appC/',i);
  }
  createG(i: interGH){
    return this.http.post(this.URL+'/appG/',i);
  }


  updateC(i:interC,id: String){
    return this.http.put(this.URL+'/appC/'+id, i);
  }
  updateG(i:interG,id: String){
    return this.http.put(this.URL+'/appG/'+id, i);
  }

}
