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

  createProdotto(prodotto: any, userId: number) {
  // aggiungi userId al body se necessario
  const body = { ...prodotto, userId };
  return this.http.post(this.url + 'create', body);
}

deleteProdotto(prodotto: any, userId: number) {
  const body = { ...prodotto, userId }; 
  return this.http.post(this.url + 'delete', body);
}

 updateProdotto(prodotto: any, userId: number) {
  const body = { ...prodotto, userId }; 
  return this.http.post(this.url + 'update', body);
}
}
