import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AnimaliService } from '../../services/animali.service';
import { PrenotazioniService } from '../../services/prenotazione.service';
import { SlotService } from '../../services/slot.service';

@Component({
  selector: 'app-appuntamento',
  standalone: false,
  templateUrl: './appuntamento.component.html',
  styleUrl: './appuntamento.component.css',
})
export class AppuntamentoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AppuntamentoComponent>);
  constructor(
    private auth: AuthService,
    private slot: SlotService,
    private animali: AnimaliService,
    private router: Router,
    private prenotazione: PrenotazioniService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  slotDisponibili: any;
  titolo!: string;
  form!: FormGroup;
  formError = '';
  formattedDate: any;
  minDate!: Date | null;

  today = new Date();
  ymd = this.today.toISOString().slice(0, 10);
  animaliList: any;
  veterinarioId: any;

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    this.titolo = 'Nuova prenotazione';
    if (this.auth.idUtente !== null) {
      this.animali.findByUserId(this.auth.idUtente).subscribe((resp: any) => {
        this.animaliList = resp.dati;
        console.log(resp.dati);
      });
    }
    this.slot
      .slotDisponibili(this.data.veterinarioId, this.ymd)
      .subscribe((resp: any) => {
        this.slotDisponibili = resp.dati;
        console.log(resp.dati);
        console.log(this.veterinarioId);
        console.log(this.slotDisponibili);
      });

    if (this.data.isEdit) {
      const prenotazione = this.data.prenotazione;
      // Prepara la data formattata per il form se necessario
      this.formattedDate = prenotazione.dataVisita;

      this.form = this.fb.group({
        id_animale: new FormControl(prenotazione.animale?.id), // o il campo corretto per selezionare l'animale
        data_visita: new FormControl(prenotazione.dataVisita), // data come stringa ISO
        ora_visita: new FormControl(prenotazione.oraVisita.substring(0, 5)),
        motivo_visita: new FormControl(prenotazione.motivoVisita),
        stato_visita: new FormControl(prenotazione.statoVisita),
        tipo_pagamento: new FormControl(prenotazione.tipoPagamento),
      });
    } else {
      this.form = this.fb.group({
        id_animale: new FormControl(),
        data_visita: new FormControl(),
        ora_visita: new FormControl(),
        motivo_visita: new FormControl(),
        stato_visita: new FormControl(),
        tipo_pagamento: new FormControl(),
      });
    }
  }
  public dateFilter = (d: Date | null): boolean => {
    // d is the date being checked by the calendar.
    const day = (d || new Date()).getDay();

    // Check if it's Sunday (Sunday is 0 in JavaScript's getDay())
    // Return TRUE if the day is NOT Sunday (i.e., keep it enabled)
    // Return FALSE if the day IS Sunday (i.e., disable it)
    return day !== 0;
  };
  onDateSelected(event: any) {
    const selectedDate: Date = event.value;

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const paddedMonth = String(month).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');

    this.formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

    console.log('Data selezionata:', this.formattedDate);

    this.slot
      .slotDisponibili(this.data.veterinarioId, this.formattedDate)
      .subscribe((resp: any) => {
        this.slotDisponibili = resp.dati;
        console.log(resp.dati);
        console.log(this.veterinarioId);
        console.log(this.slotDisponibili);
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formError = '';

    const raw = this.form.value as any;

    const payload = {
      id: this.data?.isEdit ? this.data?.prenotazione?.id : undefined,
      idUtente: this.auth.idUtente,
      idAnimale: raw.id_animale,
      idVeterinario: this.data.veterinarioId,
      dataVisita: this.formattedDate,
      oraVisita: raw.ora_visita,
      motivoVisita: raw.motivo_visita,
      statoVisita: 'IN_LAVORAZIONE',
      tipoPagamento: 'CONTANTI',
    };

    console.log(payload);

    const req$ = this.data?.isEdit
      ? this.prenotazione.update(payload)
      : this.prenotazione.create(payload);

    req$.subscribe((resp: any) => {
      console.log(resp.rc + resp.msg);
      this.router.navigate(['/prenotazioni']);
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
