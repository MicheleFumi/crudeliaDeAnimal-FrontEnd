import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProdottiService } from '../../../services/prodotti.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-prodotto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-prodotto.component.html',
  styleUrls: ['./update-prodotto.component.css'],
})
export class UpdateProdottoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProdottoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prodottiService: ProdottiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.id],
      nomeProdotto: [this.data.nomeProdotto, Validators.required],
      descrizione: [this.data.descrizione, Validators.required],
      prezzo: [this.data.prezzo, [Validators.required, Validators.min(0)]],
      quantitaDisponibile: [
        this.data.quantitaDisponibile,
        [Validators.required, Validators.min(0)],
      ],
      categoria: [this.data.categoria, Validators.required],
      tipoAnimale: [this.data.tipoAnimale, Validators.required],
    });
  }

  annulla(): void {
    this.dialogRef.close();
  }

 onSubmit(): void {
  if (this.form.invalid) return;

  const updatedProdotto = this.form.value;
  const userId = Number(localStorage.getItem('idUtente'));

  this.prodottiService.updateProdotto(updatedProdotto, userId).subscribe({
    next: (resp: any) => {
      if (resp.rc) {
        // Chiudi il dialog e restituisci i nuovi valori
        this.dialogRef.close(this.form.value);
      } else {
        // Log in console invece di alert
        console.error('Errore backend:', resp.msg || 'Impossibile aggiornare.');
      }
    },
    error: (err) => {
      console.error('Errore durante l’aggiornamento del prodotto:', err);
    },
  });
}

}
