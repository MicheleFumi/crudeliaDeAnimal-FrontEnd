import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {
  private UrlOrdine = 'http://localhost:9090/rest/ordine';

  constructor(private http: HttpClient) {}

  // 🔹 Recupera tutti gli ordini di un utente
  getOrdini(idUtente: number): Observable<any> {
    const params = new HttpParams().set('idUtente', idUtente);
    return this.http.get(this.UrlOrdine + 'findById', { params });
  }

  // 🔹 Cancella un ordine
  deleteOrdine(idOrdine: number): Observable<any> {
    const params = new HttpParams().set('idOrdine', idOrdine);
    return this.http.delete(this.UrlOrdine +'deleteOrdine', { params });
  }
}