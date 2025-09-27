import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimaleService } from '../services/animale.service'; // correggi il path se serve

@Component({
  selector: 'app-update-animale',
  templateUrl: './update-animale.component.html',
  styleUrls: ['./update-animale.component.css']
})
export class UpdateAnimaleComponent implements OnInit {
  updateForm!: FormGroup;
  msg: string = '';
  id!: number;

  constructor(
    private service: AnimaleService,
    private routing: Router
  ) { }

  ngOnInit(): void {
    // inizializza il form con FormControls e Validators se vuoi
    this.updateForm = new FormGroup({
      nomeAnimale: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      razza: new FormControl(''),
      noteMediche: new FormControl(''),
      utente: new FormControl('')
    });
  }

  OnUpdate() {
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
    this.service.update(params).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/animali', this.id]).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
