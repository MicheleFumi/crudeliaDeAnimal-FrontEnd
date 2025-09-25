import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  url = 'http://localhost:9090/rest/prodotto/';
  constructor(private http: HttpClient) {}

  listProdotti() {
    return this.http.get(this.url + 'listAll');
  }
  findById(id: number) {
    let param = new HttpParams().set('id', id);
    return this.http.get(this.url + 'findById', { params: param });
  }
}
