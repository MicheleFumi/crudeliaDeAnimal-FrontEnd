import { Component, OnInit } from '@angular/core';
import { AnimaliService } from '../../services/animali.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-animali',
  standalone: false,
  templateUrl: './animali.component.html',
  styleUrl: './animali.component.css',
})
export class AnimaliComponent implements OnInit {
  id!: number;
  isLogged: boolean = false;
  animali: any;
  msg: any;
  tipi: string[] = ['cane', 'gatto', 'uccello', 'pesce', 'roditore', 'rettile'];
  selectedAnimale: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: AnimaliService,
    private auth: AuthService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.service.findByUserId(this.id).subscribe((resp: any) => {
          this.animali = resp.dati;
          console.log(this.animali[0]);
        });
      }
    });

    this.isLogged = this.auth.isAutentificated();
  }

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    nomeAnimale: new FormControl(),
    razza: new FormControl(),
    noteMediche: new FormControl(),
    utente: new FormControl(),
    tipo: new FormControl(),
  });

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

  elimina(animale: any) {
    console.log('Eliminato:', animale);
  }

  openUpdateModal(animale: any) {
    this.selectedAnimale = animale;
    this.updateForm.patchValue(animale);
  }

  annullaUpdate() {
    this.selectedAnimale = null;
    this.updateForm.reset();
  }
  aggiungiAnimale() {}
}
