import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarrelloServiceAPI } from '../../services/carrelloAPI.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { CarrelloService, carrelloItem ,createOrdReq,getCarrelloProdotto} from '../../services/carrello.service';
import { CarrelloComponent } from '../../componenti/carrello/carrello.component';


@Component({
  selector: 'app-carrello-dialog',
  standalone: false,
  templateUrl: './carrello-dialog.component.html',
  styleUrl: './carrello-dialog.component.css'
})
export class CarrelloDialogComponent implements OnInit{

   prodotti:getCarrelloProdotto[] = [];

    loading = false;
    errorMsg = '';

  constructor(
    public dialogRef: MatDialogRef<CarrelloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idUtente: number },
    private carrelloServiceAPI: CarrelloServiceAPI,
    private snackBar: MatSnackBar,
    private carrelloState: CarrelloService
  ) {
  }
   
  ngOnInit(): void {
    if (this.data.idUtente) {
      console.log("id utente  oninit :  " , this.data.idUtente );
      this.loadCarrello();
    } else {
      console.error('idUtente non presente');
    }
  }

    loadCarrello(): void {
    this.loading = true;
    this.errorMsg = '';
    this.carrelloServiceAPI.getCarrello(this.data.idUtente).subscribe({
      next: (resp: any) => {
              console.log("resp load carrello :  :  " , resp );

        this.prodotti = resp?.dati.prodotto ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error( "error carrello load object ",err );
        this.errorMsg = 'Errore nel caricamento del carrello';
        this.loading = false;
      }
    });
  }

 modificaQuantita(item: any, delta: number) {
    const nuovaQuantita = item.quantitaRicheste + delta;
    if (nuovaQuantita < 1) return;

    item.quantitaRicheste = nuovaQuantita;

    //const carrelloProdotto = { prodotto: item, quantitaRicheste: item.quantita };

    const carrelloProdotto = { 
    prodotto: { id: item.prodotto?.id || item.id },  // invia solo ciò che serve
    quantitaRicheste: item.quantitaRicheste
    };

    this.carrelloServiceAPI.updateProdotto(carrelloProdotto,this.data.idUtente).subscribe({
      next: () => this.snackBar.open('Quantità aggiornata', 'Chiudi', { duration: 2000 }),
      error: () => this.snackBar.open('Errore aggiornamento', 'Chiudi', { duration: 3000 })
    });
  }

  calcolaTotale(): number {
    return this.prodotti.reduce((sum, item) => sum + item.prezzo * item.quantitaRicheste, 0);
  }

  eliminaProdotto(item: any) {

    console.log("ID Utente Ele",this.data.idUtente);
    const conferma = confirm(`Sei sicuro di voler rimuovere "${item.nomeProdotto}" dal carrello?`);
    if (!conferma) return;

    const carrelloProdotto = { prodotto: item };
    this.carrelloServiceAPI.deleteProdotto(carrelloProdotto,this.data.idUtente).subscribe({
      next: () => {
        this.snackBar.open('Prodotto rimosso', 'Chiudi', { duration: 2000 });
        this.prodotti = this.prodotti.filter(p => p !== item);
      },
      error: () => this.snackBar.open('Errore durante la rimozione', 'Chiudi', { duration: 3000 })
    });
  }

  confermaOrdine() {

     let createOrdReq : createOrdReq ={idUtente:this.data.idUtente};

    this.carrelloServiceAPI.createOrdine(createOrdReq).subscribe({
      next: (resp:any) => {
        console.log("conferma ordine ",this.data);
                this.prodotti = resp?.dati.prodotto ?? [];

        this.snackBar.open('Ordina confermato', 'Chiudi', { duration: 2000 });
                // this.dialogRef.close();
      this.dialogRef.close({ ordineConfermato: true });


      },
      error: () => this.snackBar.open('Errore durante la creazione ordine', 'Chiudi', { duration: 3000 })
    });


    
}

  chiudiDialog() {
    this.dialogRef.close();
  }
}
