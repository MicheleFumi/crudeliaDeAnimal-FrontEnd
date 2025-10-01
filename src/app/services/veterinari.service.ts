import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeterinariService {
  url = 'http://localhost:9090/rest/veterinario/';

  constructor(private http: HttpClient) {}

  listVeterinari(): Observable<any> {
    return this.http.get(this.url + 'list');
  }

  findById(id: number): Observable<any> {
    const param = new HttpParams().set('id', id);
    return this.http.get(this.url + 'findById', { params: param });
  }

  findByIdUtente(id: number): Observable<any> {
    const param = new HttpParams().set('idUtente', id);
    return this.http.get(this.url + 'findByIdUtente', { params: param });
  }

  create(payload: any): Observable<any> {
    console.log(payload);
    return this.http.post(this.url + 'create', payload);
  }

  update(payload: any): Observable<any> {
    return this.http.put(this.url + 'update', payload);
  }

  delete(payload: any): Observable<any> {
    return this.http.post(this.url + 'remove', payload);
  }

  findByCap(cap: string): Observable<any> {
    const param = new HttpParams().set('cap', cap);
    return this.http.get(this.url + 'findByCap', { params: param });
  }

  findByProvincia(provincia: string): Observable<any> {
    const param = new HttpParams().set('provincia', provincia);
    return this.http.get(this.url + 'findByProvincia', { params: param });
  }

  findByRegione(regione: string): Observable<any> {
    const param = new HttpParams().set('regione', regione);
    return this.http.get(this.url + 'findByRegione', { params: param });
  }
}
