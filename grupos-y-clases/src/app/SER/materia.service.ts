import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
export interface M {
  id_materia: number;
  materia_nombre:string;
  grupo:string;
  maestro:string;
  escuela:string;
  politica:number;

  alumno:any;
  clasesProgramada:any;  
  asistencia:any;
}

@Injectable({
  providedIn: 'root'
})

export class MateriaService {
  constructor(private http: HttpClient) { }
  private URL ='http://localhost/IDGS704/ARSO/API';

  getAll() {return this.http.get<[M]>(this.URL + '/materias');}

  get(id:number) {return this.http.get<[M]>(this.URL + '/materias/'+id);}

  create(mat:any){return this.http.post(this.URL+'/materias',mat);}

  pdf(mat:FormData){
    return this.http.post('https://chav.satech.com.mx/api/alumnospdf',mat);
  }
  update(mat: any,id:number){return this.http.put(this.URL+`/materias/${id}`,mat);}

  updateLista(id: any){return this.http.post(this.URL+'/materia-asistencia/',id);}

  delete(id: string){
    return this.http.delete(this.URL+'/materias/'+id);
  }
}
