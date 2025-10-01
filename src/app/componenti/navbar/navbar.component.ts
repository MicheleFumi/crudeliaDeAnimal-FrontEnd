import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CarrelloDialogComponent } from '../../dialogs/carrello-dialog/carrello-dialog.component';
import { carrelloItem, CarrelloService } from '../../services/carrello.service';
import { CarrelloServiceAPI } from '../../services/carrelloAPI.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  id!: any;
  ordine: any;
  logged: boolean = false;
  isAdmin: boolean = false;
  isMedico: boolean = false;
  itemCount = 0;
  cartItems: carrelloItem[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private carrelloService: CarrelloService,
    private dialog: MatDialog,
    private carrelloServiceAPI: CarrelloServiceAPI
  ) {}

  ngOnInit(): void {
    this.logged = this.auth.isLogged;
    this.isAdmin = this.auth.isAdmin;
    this.isMedico = this.auth.isMedico;

    console.log(this.isMedico);

    this.id = this.auth.idUtente;
    if (this.logged && this.auth.idUtente) {
      // inizializza carrello
      this.carrelloServiceAPI.initCarrello(this.auth.idUtente);

      // sottoscrizione al carrello per aggiornare badge
      this.carrelloServiceAPI.carrello$.subscribe((carrello) => {
        if (carrello?.dati?.prodotto) {
          this.itemCount = carrello.dati.prodotto.reduce(
            (acc: number, p: any) => acc + p.quantitaRicheste,
            0
          );
        } else {
          this.itemCount = 0;
        }
      });
    }
  }

  // 🛒 Apre il dialog del carrello
  apriCarrello() {
    if (!this.auth.idUtente) return;

    this.dialog.open(CarrelloDialogComponent, {
      width: '600px',
      data: { idUtente: this.auth.idUtente },
    });

    // ⚡️ Non serve afterClosed per aggiornare il counter:
    // il BehaviorSubject lo aggiorna automaticamente.
  }

  logout() {
    this.auth.resetAll();
    this.logged = false;
    this.router.navigate(['/welcome']);
    console.log(this.logged);
  }
}
