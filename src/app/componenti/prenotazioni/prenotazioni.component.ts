import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { AppuntamentoComponent } from '../../dialogs/appuntamento/appuntamento.component';
import { PrenotazioniService } from '../../services/prenotazione.service';

@Component({
  selector: 'app-prenotazioni',
  standalone: false,
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css',
})
export class PrenotazioniComponent implements OnInit {
  constructor(
    private prenotazioniService: PrenotazioniService,
    private auth: AuthService
  ) {}

  readonly dialog = inject(MatDialog);
  prenotazioni: any;
  ngOnInit(): void {
    if (this.auth.idUtente !== null) {
      this.prenotazioniService
        .findByIdUtente(this.auth.idUtente)
        .subscribe((resp: any) => {
          this.prenotazioni = resp.dati;
          console.log(this.prenotazioni);
        });
    }
  }
  openUpdatePrenotazione(prenotazione: any) {
    const dialogRef = this.dialog.open(AppuntamentoComponent, {
      width: '800px',
      maxWidth: '100vw',
      height: '600px',
      maxHeight: '100vh',
      data: {
        veterinarioId: prenotazione.veterinario.id,
        prenotazione: prenotazione,
        isEdit: true,
      },
    });
  }
  deletePrenotazione(prenotazione: any) {
    const prenotazioneId: number = prenotazione.id;
    this.prenotazioniService
      .delete({ id: prenotazioneId })
      .subscribe((resp: any) => {
        console.log(prenotazione);
        console.log(resp.msg);
        window.location.reload();
      });
  }
}
