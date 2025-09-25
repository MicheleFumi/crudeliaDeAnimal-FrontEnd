import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioniService {
  private url = 'http://localhost:9090/rest/prenotazione/';

  constructor(private http: HttpClient) {}

  listAll(): Observable<any> {
    return this.http.get(this.url + 'listAll');
  }

  findById(id: number | null): Observable<any> {
    if (id == null) {
      throw new Error('User ID is required');
    }
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'getById', { params });
  }

  create(body: {}): Observable<any> {
    return this.http.post(this.url + 'create', body);
  }

  update(body: {}): Observable<any> {
    return this.http.post(this.url + 'update', body);
  }

  delete(body: {}): Observable<any> {
    return this.http.delete(this.url + 'delete', { body });
  }
}
