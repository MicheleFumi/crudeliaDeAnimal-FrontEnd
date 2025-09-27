import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-update-animale',
  standalone: false,
  templateUrl: './update-animale.component.html',
  styleUrls: ['./update-animale.component.css'],
})
export class UpdateAnimaleComponent implements OnInit {
  private fb = inject(FormBuilder);

  msg: string = '';
  id!: number;
  form!: FormGroup;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AnimaliService
  ) {}

  tipi = ['cane', 'gatto', 'uccello', 'roditore', 'pesce', 'rettile'];

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data?.animale?.id || null],
      nomeAnimale: ['', Validators.required],
      razza: ['', Validators.required],
      tipo: ['', Validators.required],
      noteMediche: ['', [Validators.maxLength(500)]],
      utente: { id: Number(localStorage.getItem('idUtente')) || null },
    });
    //serve per valorizzare i campi passati
    if (this.data && this.data.animale) {
      this.form.patchValue({
        id: this.data.animale.id,
        nomeAnimale: this.data.animale.nomeAnimale,
        razza: this.data.animale.razza,
        tipo: this.data.animale.tipo,
        noteMediche: this.data.animale.noteMediche,
      });
    }
  }

  onSubmit() {
    const params = this.form.value;
    console.log(params);

    this.service.update(params).subscribe((resp: any) => {
      if (resp.rc) {
        this.router.navigate(['animali/:id']);
        window.location.reload();
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
