import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdiniService } from '../../services/ordine.service';

@Component({
  selector: 'app-ordini',
  standalone: false,
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.css'
})
export class OrdiniComponent implements OnInit{

    ordini: any[] = [];
    

  constructor(
    private route: ActivatedRoute,
    private ordiniService: OrdiniService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

 ngOnInit(): void {
    const idUtente = this.auth.idUtente ?? 0;

    this.ordiniService.getOrdiniUtente(idUtente).subscribe({
      next: resp => this.ordini = resp.dati,
      error: err => console.error('Errore caricamento ordini', err)
    });
  }

caricaOrdini() {
  if (this.auth.idUtente !== null) {
    this.ordiniService.getOrdiniUtente(this.auth.idUtente).subscribe({
      next: (resp: any) => {
        this.ordini = Array.isArray(resp) ? resp : resp.ordini || [];
      },
      error: () => this.snackBar.open('Errore nel caricamento degli ordini', 'Chiudi', { duration: 3000 })
    });
  } else {
    this.ordini = [];
    this.snackBar.open('Utente non loggato', 'Chiudi', { duration: 3000 });
  }
}


 cancellaOrdine(idOrdine: number) {
    this.ordiniService.deleteOrdine(idOrdine).subscribe({
      next: () => {
        this.snackBar.open('Ordine cancellato con successo', 'Chiudi', { duration: 2000 });
        // Aggiorna lo stato localmente per rimuovere il pulsante
        this.ordini = this.ordini.map(o =>
          o.id === idOrdine ? { ...o, statoOrdine: 'CANCELLATO' } : o
        );
      },
      error: () => this.snackBar.open('Errore durante la cancellazione dell\'ordine', 'Chiudi', { duration: 3000 })
    });
  }



  }



