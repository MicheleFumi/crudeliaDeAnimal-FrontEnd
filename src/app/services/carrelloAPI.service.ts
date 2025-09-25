import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { insertProReq } from './carrello.service';



export interface ResponseBare {
  rc: boolean;
  msg: string | null;
}


@Injectable({
  providedIn: 'root',
})


export class CarrelloServiceAPI{
       url = 'http://localhost:9090/rest/carrelloProdotto/';
         constructor(private http: HttpClient) {}

         
insertProdotto(insertProReq : insertProReq){
  const params = new HttpParams().set('idUtente', String(insertProReq.prodotto.idUtente));
  console.log("insert prodotto");

  //const bodyStr = '{"id":2,"prodotto":{"id":5,"nomeProdotto":"testproduct","descrizione":"desc","prezzo":2,"categoria":"categoria","tipoAnimale":"animale","quantitaDisponibile":30,"immagineUrl":"url"},"statoProdotto":"stato","quantitaRicheste":10}';
 // return this.http.post(this.url + 'insertProdotto',JSON.parse(bodyStr) ,{params})

  return this.http.post<ResponseBare>(this.url + 'insertProdotto',insertProReq ,{params})

}
updateProdotto(){
return this.http.get(this.url + 'updateProdotto')

}
deleteProdotto(){
return this.http.get(this.url + 'deleteProdotto')

}

}