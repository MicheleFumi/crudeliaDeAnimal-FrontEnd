import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface carrelloItem {
  idUtente?: number;
  id : number;
  nomeProdotto: string;
  prezzo: number;
  quantita: number;
  urlFoto:string;

}

export interface insertProReq{
   prodotto : carrelloItem,
    quantitaRicheste: number;

}
export interface getCarrelloResp{
    rc:string;
    msg:string;
    dati:getCarrelloDati
}
export interface getCarrelloProdotto{
   id: number;
      nomeProdotto : string;
   descrizione: string;
   prezzo: number;
   categoria: string;
   tipoAnimale: string;
   quantitaRicheste:number;
     immagineUrl:string;
        
}
export interface getCarrelloDati{
    idUtente:string;
    totale:number;
    prodotto:getCarrelloProdotto[]
}

export interface createOrdReq{

    idUtente?: number;

}
 
@Injectable({
  providedIn: 'root'
})

export class CarrelloService {
  private items: carrelloItem[] = [];

  private cartSubject = new BehaviorSubject<carrelloItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  // total quantity (sum of quantita)
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  /** Add/merge ONE item locally (component triggers DB separately if you want) */
  addToCart(item: carrelloItem) {
    const existing = this.items.find(i => i.id === item.id); // match by product id
    if (existing) {
      existing.quantita += item.quantita;
      // keep latest details if they changed
      existing.nomeProdotto = item.nomeProdotto || existing.nomeProdotto;
      existing.prezzo = item.prezzo ?? existing.prezzo;
      existing.urlFoto = item.urlFoto || existing.urlFoto;
      //existing.totale = existing.prezzo * existing.quantita;
    } else {
      //this.items.push({ ...item, totale: item.prezzo * item.quantita });
    }

    this.cartSubject.next([...this.items]);
    this.countSubject.next(this.items.reduce((s, it) => s + it.quantita, 0));
  }

  setCart(items: carrelloItem[]) {
      // ensure totals
      this.items = (items || []).map(it => ({
        ...it,
        totale: it.prezzo * it.quantita
      }));
      this.cartSubject.next([...this.items]);
      this.countSubject.next(this.items.reduce((s, it) => s + it.quantita, 0));
    }
  getItems() {
    return this.items;
  }
}
