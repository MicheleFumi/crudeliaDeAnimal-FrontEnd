import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AnimaliService {
  url = 'http://localhost:9090/rest/animale/';
  constructor(private http: HttpClient) {}

  listAnimali() {
    return this.http.get(this.url + 'listAll');
  }
  findById(id: number) {
    let param = new HttpParams().set('id', id);
    return this.http.get(this.url + 'findById', {
      params: param,
    });
  }
  findByUserId(id: number) {
    let param = new HttpParams().set('id', id);
    return this.http.get(this.url + 'findByUserId', {
      params: param,
    });
  }

  update(animale: any) {
    console.log(animale);

    return this.http.post(this.url + 'update', animale);
  }
}
