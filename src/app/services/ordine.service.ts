import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {
  private UrlOrdine = 'http://localhost:9090/rest/ordine/';

  constructor(private http: HttpClient) {}

  // Lista ordini utente
  getOrdiniUtente(idUtente: number): Observable<any> {
    const params = new HttpParams().set('idUtente', idUtente);
    return this.http.get(this.UrlOrdine + 'findByUser', { params: { idUtente } });
  }

  // Dettaglio singolo ordine
  getOrdine(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.UrlOrdine + 'findById',  { params: { id } });
  }

  // Cancella ordine
  deleteOrdine(id: number): Observable<any> {
    return this.http.post(this.UrlOrdine + 'deleteOrdine', {id});
  
  }
}