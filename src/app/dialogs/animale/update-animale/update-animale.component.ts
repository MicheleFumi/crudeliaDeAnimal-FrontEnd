import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppuntamentoComponent } from '../../appuntamento/appuntamento.component';
import { UtenteService } from '../../../services/utente.service';
import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-update-animale',
  standalone: false,
  templateUrl: './update-animale.component.html',
  styleUrls: ['./update-animale.component.css'],
})
export class UpdateAnimaleComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AppuntamentoComponent>);

  msg: string = '';
  id!: number;
  form!: FormGroup;
  constructor(
    private routing: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private animale: AnimaliService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeAnimale: ['', Validators.required],
      razza: ['', Validators.required],
      tipo: ['', Validators.required],
      noteMediche: ['', [Validators.maxLength(500)]],
    });
    //serve per valorizzare i campi passati
    if (this.data && this.data.animale) {
      this.form.patchValue({
        nomeAnimale: this.data.animale.nomeAnimale,
        razza: this.data.animale.razza,
        tipo: this.data.animale.tipo,
        noteMediche: this.data.animale.noteMediche,
      });
    }
  }

  onSubmit() {
    /*
    const params = this.updateForm.value;
    console.log('Salvato:', params);
    if (this.updateForm.controls['nomeAnimale'].touched) {
      params.nomeAnimale = this.updateForm.value.nomeAnimale;
    }
    if (this.updateForm.controls['razza'].touched) {
      params.razza = this.updateForm.value.razza;
    }
    if (this.updateForm.controls['tipo'].touched) {
      params.tipo = this.updateForm.value.tipo;
    }
    if (this.updateForm.controls['noteMediche'].touched) {
      params.noteMediche = this.updateForm.value.noteMediche;
    }
    if (this.updateForm.controls['utente'].touched) {
      params.utente = this.updateForm.value.utente;
    }
  
  */
  }
}
