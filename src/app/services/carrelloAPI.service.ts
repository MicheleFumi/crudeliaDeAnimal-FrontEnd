import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrelloServiceAPI {
  private urlProdotto = 'http://localhost:9090/rest/carrelloProdotto/';
  private urlCarrello = 'http://localhost:9090/rest/carrello/';
  private urlOrdine = 'http://localhost:9090/rest/ordine/';

  // ✅ BehaviorSubject che mantiene lo stato del carrello
  private carrelloSubject = new BehaviorSubject<any>(null);
  carrello$ = this.carrelloSubject.asObservable(); // observable pubblico

  constructor(private http: HttpClient) {}

  /** 🔄 Ricarica il carrello corrente (per esempio all'avvio) */
  initCarrello(idUtente: number) {
    this.getCarrello(idUtente).subscribe(data => this.carrelloSubject.next(data));
  }

  /** Ottiene il carrello senza modificare il BehaviorSubject */
  getCarrello(idUtente: number) {
    const params = new HttpParams().set('idUtente', idUtente);
    return this.http.get(this.urlCarrello + 'getCarrello', { params });
  }

  /** Inserisce un prodotto e aggiorna il BehaviorSubject */
  insertProdotto(carrelloProdotto: any) {
    const idUtente = carrelloProdotto.prodotto.idUtente;
    const params = new HttpParams().set('idUtente', idUtente);
    return this.http.post(this.urlProdotto + 'insertProdotto', carrelloProdotto, { params })
      .pipe(
        switchMap(() => this.getCarrello(idUtente)),
        tap(data => this.carrelloSubject.next(data)) // ✅ aggiorna carrello globale
      );
  }

  updateProdotto(carrelloProdotto: any, idUtente: number) {
    const params = new HttpParams()
      .set('idProdotto', carrelloProdotto.prodotto.id)
      .set('idUtente', idUtente);

    return this.http.post(this.urlProdotto + 'updateProdotto', carrelloProdotto, { params })
      .pipe(
        switchMap(() => this.getCarrello(idUtente)),
        tap(data => this.carrelloSubject.next(data))
      );
  }

  deleteProdotto(carrelloProdotto: any, idUtente: number) {
    const params = new HttpParams()
      .set('idProdotto', carrelloProdotto.prodotto.id)
      .set('idUtente', idUtente);

    return this.http.post(this.urlProdotto + 'deleteProdotto', carrelloProdotto, { params })
      .pipe(
        switchMap(() => this.getCarrello(idUtente)),
        tap(data => this.carrelloSubject.next(data))
      );
  }

  createOrdine(createOrdReq: any) {
    const idUtente = createOrdReq.idUtente;
    return this.http.post(this.urlOrdine + 'create', createOrdReq)
      .pipe(
        switchMap(() => this.getCarrello(idUtente)),
        tap(data => this.carrelloSubject.next(data))
      );
  }
}
