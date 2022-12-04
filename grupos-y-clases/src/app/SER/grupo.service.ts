import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
export interface G {
  id_g: string;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})


export class GrupoService {
  constructor(private http: HttpClient) { }
  private URL ='http://localhost/IDGS704/ARSO/API';

  getAll() {
    return this.http.get<[G]>(this.URL + '/grupos');
  }
  get(id:number) {
    return this.http.get<[G]>(this.URL + '/grupos/'+id);
  }
  
  create(i: G){
    return this.http.post(this.URL+'/grupos/',i);
  }
  update(i:G,id:number){
    return this.http.put(this.URL+'/grupos/'+id, i);
  }
  remove(id: number){
    return this.http.delete(this.URL+'/grupos/'+id);
  }
}
