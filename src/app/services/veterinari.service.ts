import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  findById(id: number) {
    let param = new HttpParams().set('id', id);
    return this.http.get(this.url + 'findById', { params: param });
  }
}
