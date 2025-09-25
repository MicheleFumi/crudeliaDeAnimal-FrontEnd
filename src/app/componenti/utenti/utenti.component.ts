import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.css',
})
export class UtentiComponent implements OnInit {
  constructor(private utente: UtenteService) {}

  listaUtenti: any;
  ngOnInit(): void {
    this.utente.listUtenti().subscribe((resp: any) => {
      console.log(resp.dati);
      this.listaUtenti = resp.dati;
    });
  }
}
