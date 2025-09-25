import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  url = 'http://localhost:9090/rest/utente/';

  constructor(private http: HttpClient) {}

  listUtenti(): Observable<any> {
    return this.http.get(this.url + 'listAll');
  }

  signin(body: {}): Observable<any> {
    return this.http.post(this.url + 'signin', body);
  }

  register(body: {}): Observable<any> {
    console.log(body);
    return this.http.post(this.url + 'create', body);
  }

  getPersona(id: number | null): Observable<any> {
    if (id == null) {
      throw new Error('User ID is required');
    }
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'getById', { params });
  }
  update(body: {}) {
    return this.http.put(this.url + 'update', body);
  }

  delete(body: {}) {
    return this.http.delete(this.url + 'delete', { body });
  }
}
