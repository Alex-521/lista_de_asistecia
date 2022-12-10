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
  create(mat:any){
    return this.http.post(this.URL+'/materias',mat);
  }
  pdf(mat:any){
    let params = new HttpParams();
    
      // let headers=new HttpHeaders({
      //   'Access-Control-Allow-Headers': 'Accept,X-Custom-Header',
      //   'Access-Control-Allow-Origin':'*',
      //   'Access-Control-Allow-Credentials':'true'
      // });
      params = params.append('Content-Type','application/json');
      params = params.append('Accept','application/json');
      
    return this.http.post('https://chav.satech.com.mx/api/generarlista',mat,{params});
  }
}
