import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ProdottiService } from '../../services/prodotti.service';
import { CarrelloServiceAPI } from '../../services/carrelloAPI.service';
import { AuthService } from '../../auth/auth.service';
import { carrelloItem, insertProReq } from '../../services/carrello.service';
import { CarrelloDialogComponent } from '../../dialogs/carrello-dialog/carrello-dialog.component';

@Component({
  selector: 'app-prodotto',
  standalone: false,
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css',
})
export class ProdottoComponent implements OnInit {
  id!: number;
  @Input() prodotto: any;
  isLogged = false;
  quantita = 1;
  itemCount = 0; // ✅ counter automatico

  constructor(
    private route: ActivatedRoute,
    private service: ProdottiService,
    private carrelloServiceAPI: CarrelloServiceAPI,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // 🔎 Carica il prodotto selezionato
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.service.findById(this.id).subscribe((resp: any) => {
          this.prodotto = resp.dati;
        });
      }
    });

    this.isLogged = this.auth.isAutentificated();

    // ✅ Sottoscrizione al BehaviorSubject per aggiornare il counter
    this.carrelloServiceAPI.carrello$.subscribe((carrello) => {
      if (carrello?.dati?.prodotto) {
        this.itemCount = carrello.dati.prodotto
          .reduce((acc: number, p: any) => acc + p.quantitaRicheste, 0);
      } else {
        this.itemCount = 0;
      }
    });

    // ✅ Carica subito il carrello all'avvio (se utente loggato)
    if (this.auth.idUtente) {
      this.carrelloServiceAPI.initCarrello(this.auth.idUtente);
    }
  }

  // ➕ Aggiunge prodotto al carrello
  aggiungiAlCarrello() {
    if (!this.prodotto) return;

    if (this.quantita > this.prodotto.quantitaDisponibile) {
      this.snackBar.open('Quantità richiesta superiore alla disponibilità', 'Chiudi', { duration: 3000 });
      return;
    }

    const itemCarrello: carrelloItem = {
      id: this.id,
      nomeProdotto: this.prodotto.nomeProdotto,
      prezzo: this.prodotto.prezzo,
      quantita: this.prodotto.quantita,
      urlFoto: this.prodotto.immagineUrl,
      idUtente: this.auth.idUtente ?? undefined
    };

    const insertProReq: insertProReq = {
      prodotto: itemCarrello,
      quantitaRicheste: this.quantita
    };

    this.carrelloServiceAPI.insertProdotto(insertProReq).subscribe({
      next: () => {
        this.snackBar.open(
          `${this.quantita} ${this.prodotto.nomeProdotto} aggiunto al carrello`,
          'Chiudi',
          { duration: 3000 }
        );
        this.quantita = 1; // reset input
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Errore nell\'aggiunta al carrello', 'Chiudi', { duration: 3000 });
      }
    });
  }

  // 🛒 Apre il dialog del carrello
  apriCarrello() {
    if (!this.auth.idUtente) return;

    this.dialog.open(CarrelloDialogComponent, {
      width: '600px',
      data: { idUtente: this.auth.idUtente }
    });

    // ⚡️ Non serve afterClosed per aggiornare il counter:
    // il BehaviorSubject lo aggiorna automaticamente.
  }
}
