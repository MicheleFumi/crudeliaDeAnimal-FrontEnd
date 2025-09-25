import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface carrelloItem {
  idUtente?: number;
  idProdotto : number;
  nomeProdotto: string;
  prezzo: number;
  quantita: number;
  totale?: number;
  urlFoto:string;

}

export interface insertProReq{
   prodotto : carrelloItem,
    quantitaRicheste: number;

}
@Injectable({
  providedIn: 'root'
})

export class CarrelloService {
    
  private items: carrelloItem[] = [];
  private cartSubject = new BehaviorSubject<carrelloItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(item: carrelloItem) {
    const existing = this.items.find(i => i.idUtente === item.idUtente);
    if (existing) {
      existing.quantita += item.quantita;
    } else {
      this.items.push(item);
    }
    this.cartSubject.next(this.items);
  }

  getItems() {
    return this.items;
  }
}
