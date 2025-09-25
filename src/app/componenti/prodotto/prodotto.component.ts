import { Component, OnInit, Inject ,Input, inject} from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CarrelloService , insertProReq } from '../../services/carrello.service';
import { carrelloItem } from '../../services/carrello.service';
import {CarrelloServiceAPI } from '../../services/carrelloAPI.service';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-prodotto',
  standalone: false,
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css',
})


export class ProdottoComponent implements OnInit {
  id!: number;
  @Input() prodotto: any;
  isLogged: boolean = false;
  quantita = 1;

  constructor(
    private route: ActivatedRoute,
    private service: ProdottiService, 
    private carrelloSerivce: CarrelloService,
    private carrelloServiceAPI: CarrelloServiceAPI,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.service.findById(this.id).subscribe((resp: any) => {
          this.prodotto = resp.dati;
        });
      }
    });
    this.isLogged = this.auth.isAutentificated();
  }
  aggiungiAlCarrello() {
    let itemCarrello :carrelloItem ={idProdotto:this.id , 
      nomeProdotto:this.prodotto["nomeProdotto"],
      prezzo:this.prodotto["prezzo"],
      quantita:this.prodotto["quantita"],
      urlFoto:this.prodotto["immagineUrl"],
      idUtente : this.auth.idUtente ?? undefined

    };
    let insertProReq : insertProReq ={prodotto : itemCarrello,quantitaRicheste : this.quantita};

    //this.carrelloSerivce.addToCart(itemCarrello);
    this.carrelloServiceAPI.insertProdotto(insertProReq);
    console.log("after insert prodotto")

  }

  


}
