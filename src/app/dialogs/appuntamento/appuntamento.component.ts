import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SlotService } from '../../services/slot.service';
import { UtenteService } from '../../services/utente.service';

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
    private utente: UtenteService,
    private slot: SlotService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  slotDisponibili: any;
  titolo!: string;
  form!: FormGroup;
  submitting = false;
  formError = '';

  today = new Date();
  ymd = this.today.toISOString().slice(0, 10);
  utenti: any[] = [];
  animali: any[] = [];
  veterinarioId: any;

  ngOnInit(): void {
    this.titolo = 'Nuova prenotazione';

    this.slot
      .slotDisponibili(this.data.veterinarioId, this.ymd)
      .subscribe((resp: any) => {
        this.slotDisponibili = resp.dati;
        console.log(resp.dati);
        console.log(this.veterinarioId);
        console.log(this.slotDisponibili);
      });

    this.form = this.fb.group({
      id_utente: [this.data?.record?.id_utente ?? null, Validators.required],
      id_animale: [this.data?.record?.id_animale ?? null, Validators.required],
      id_veterinario: [
        this.data?.record?.id_veterinario ?? null,
        Validators.required,
      ],
      data_visita: [this.data?.record?.data_visita, Validators.required],
      ora_visita: [
        this.data?.record?.ora_visita ?? '',
        [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)],
      ],
      motivo_visita: [
        this.data?.record?.motivo_visita ?? '',
        [Validators.required, Validators.maxLength(255)],
      ],
      stato_visita: [
        this.data?.record?.stato_visita ?? 'IN_LAVORAZIONE',
        Validators.required,
      ],
      tipo_pagamento: [
        this.data?.record?.tipo_pagamento ?? 'CONTANTI',
        Validators.required,
      ],
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
    this.submitting = true;
    this.formError = '';

    const raw = this.form.value as any;

    const payload = {
      id: this.data?.isEdit ? this.data?.record?.id : undefined,
      id_utente: raw.id_utente,
      id_animale: raw.id_animale,
      id_veterinario: raw.id_veterinario,
      data_visita: raw.data_visita,
      ora_visita: raw.ora_visita,
      motivo_visita: raw.motivo_visita,
      stato_visita: raw.stato_visita,
      tipo_pagamento: raw.tipo_pagamento,
    };

    //   const req$ = this.data?.isEdit
    //     ? this.prenSrv.update(payload)
    //     : this.prenSrv.create(payload);

    //   req$.subscribe({
    //     next: (res: ResponseBase) => {
    //       this.submitting = false;
    //       if (!res.rc) {
    //         this.formError = res.msg || 'Operazione non riuscita';
    //         return;
    //       }
    //       this.dialogRef.close(res);
    //     },
    //     error: err => {
    //       this.submitting = false;
    //       this.formError = err?.error?.message || 'Errore durante la richiesta';
    //     }
    //   });
    // }
  }
}
