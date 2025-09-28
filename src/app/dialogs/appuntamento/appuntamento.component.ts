import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private prenotazione: PrenotazioniService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  slotDisponibili: any;
  titolo!: string;
  form!: FormGroup;
  formError = '';
  formattedDate: any;

  today = new Date();
  ymd = this.today.toISOString().slice(0, 10);
  animaliList: any;
  veterinarioId: any;

  ngOnInit(): void {
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

    this.form = this.fb.group({
      id_animale: new FormControl(),
      data_visita: new FormControl(),
      ora_visita: new FormControl(),
      motivo_visita: new FormControl(),
      stato_visita: new FormControl(),
      tipo_pagamento: new FormControl(),
    });

    // this.loadLists();

    // // Filter animals by selected user if a byUser endpoint exists
    // this.form.get('id_utente')?.valueChanges.subscribe(uid => {
    //   if (!uid) return;
    //   this.animaliSrv.listByUser(uid).subscribe({
    //     next: r => this.animali = r || [],
    //     error: () => {} // keep previous list if filter fails
    //   });
    // });
  }
  onDateSelected(event: any) {
    const selectedDate: Date = event.value;
    this.formattedDate = selectedDate.toISOString().split('T')[0]; // "2020-05-20"
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

  // private loadLists(): void {
  //   this.utentiSrv.list().subscribe({ next: r => this.utenti = r || [], error: () => {} });
  //   this.animaliSrv.list().subscribe({ next: r => this.animali = r || [], error: () => {} });
  //   this.vetSrv.list().subscribe({ next: r => this.veterinari = r || [], error: () => {} });
  // }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formError = '';

    const raw = this.form.value as any;

    const payload = {
      // id: this.data?.isEdit ? this.data?.record?.id : undefined,
      idUtente: this.auth.idUtente,
      idAnimale: raw.id_animale,
      idVeterinario: this.data.veterinarioId,
      dataVisita: this.formattedDate,
      oraVisita: raw.ora_visita,
      motivoVisita: raw.motivo_visita,
      statoVisita: 'IN_LAVORAZIONE',
      tipoPagamento: 'CONTANTI',
    };

    //   const req$ = this.data?.isEdit
    //     ? this.prenSrv.update(payload)
    //     : this.prenSrv.create(payload);

    this.prenotazione.create(payload).subscribe((resp: any) => {
      console.log(resp.rc + resp.msg);
    });
  }
}
