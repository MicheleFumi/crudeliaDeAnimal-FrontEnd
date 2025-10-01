import { Component, OnInit } from '@angular/core';

import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  prodotti: any;
  response: any;
  prodottiCane: any[] = [];
  prodottiGatto: any[] = [];
  prodottiUccello: any[] = [];
  prodottiPesce: any[] = [];
  prodottiRettile: any[] = [];
  constructor(private service: ProdottiService) {}
  ngOnInit(): void {
    this.service.listProdotti().subscribe((resp) => {
      this.response = resp;
      this.prodotti = this.response.dati;

      this.prodottiCane = this.prodotti.filter(
        (p: any) => p.tipoAnimale === 'Cane'
      );
      this.prodottiGatto = this.prodotti.filter(
        (p: any) => p.tipoAnimale === 'Gatto'
      );
      this.prodottiPesce = this.prodotti.filter(
        (p: any) => p.tipoAnimale === 'Pesce'
      );
      this.prodottiUccello = this.prodotti.filter(
        (p: any) => p.tipoAnimale === 'Uccello'
      );
      this.prodottiRettile = this.prodotti.filter(
        (p: any) => p.tipoAnimale === 'Rettile'
      );
    });
  }
}
