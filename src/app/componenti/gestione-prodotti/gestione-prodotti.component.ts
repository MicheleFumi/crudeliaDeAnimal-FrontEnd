import { Component ,OnInit} from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProdottoComponent } from '../../dialogs/prodotto/update-prodotto/update-prodotto.component';
import { CreateProdottoComponent } from '../../dialogs/prodotto/create-prodotto/create-prodotto.component';

@Component({
  selector: 'app-gestione-prodotti',
  standalone: false,
  templateUrl: './gestione-prodotti.component.html',
  styleUrl: './gestione-prodotti.component.css'
})
export class GestioneProdottiComponent implements OnInit{
   prodotti: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private prodottiService: ProdottiService ,private dialog: MatDialog) {}


   ngOnInit(): void {
    this.loadProdotti();
  }

  loadProdotti() {
    this.loading = true;
    this.prodottiService.listProdotti().subscribe({
      next: (resp: any) => {
        this.prodotti = resp.dati || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Errore durante il caricamento dei prodotti.';
        this.loading = false;
      }
    });
  }

  eliminaProdotto(id: number) {
    const userId = Number(localStorage.getItem('idUtente'));
    this.prodottiService.deleteProdotto(id, userId).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          this.prodotti = this.prodotti.filter(p => p.id !== id);
          window.location.reload();
        } else {
          console.error('Errore backend: ', resp.msg);
        }
      },
      error: (err) => {
        console.error('Errore HTTP durante eliminazione:', err);
      }
    });
  }

  modificaProdotto(prodotto: any) {
    const userId = Number(localStorage.getItem('idUtente'));
    const dialogRef = this.dialog.open(UpdateProdottoComponent, {
      width: '500px',
      data: prodotto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prodottiService.updateProdotto(result, userId).subscribe({
          next: (resp: any) => {
            if (resp.rc) {
              this.loadProdotti();
              window.location.reload();
            } else {
              console.error('Errore backend durante aggiornamento:', resp.msg);
            }
          },
          error: (err) => {
            console.error('Errore durante aggiornamento prodotto:', err);
          }
        });
      }
    });
  }

  creaProdotto() {
    const dialogRef = this.dialog.open(CreateProdottoComponent, { width: '500px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = Number(localStorage.getItem('idUtente'));
        this.prodottiService.createProdotto(result, userId).subscribe({
          next: (resp: any) => {
            if (resp.rc && resp.dati) {
              this.prodotti.push(resp.dati); // aggiorna la lista subito
            }
          },
          error: (err) => console.error('Errore durante creazione prodotto:', err)
        });
      }
    });
  }
}





