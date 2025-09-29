import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProdottiService } from '../../../services/prodotti.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-prodotto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './create-prodotto.component.html',
  styleUrls: ['./create-prodotto.component.css']
})
export class CreateProdottoComponent implements OnInit {
  form!: FormGroup;

  categorie: string[] = [
    'Alimentazione', 'Accessori', 'Cucce', 'Igiene', 'Snack', 
    'Decorazioni', 'Lettiera', 'Integratori', 'Giocchi','Trattamenti' ,'altro'
  ];

  tipiAnimale = ['cane', 'gatto', 'uccello', 'roditore', 'pesce', 'rettile','altro'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProdottoComponent>,
    private prodottiService: ProdottiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeProdotto: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: [0, [Validators.required, Validators.min(0)]],
      quantitaDisponibile: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      tipoAnimale: ['', Validators.required],
      immagineUrl: ['']
    });
  }

 onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value); // Passa i dati al componente padre
  }

  annulla(): void {
    this.dialogRef.close(null);
  }
}
