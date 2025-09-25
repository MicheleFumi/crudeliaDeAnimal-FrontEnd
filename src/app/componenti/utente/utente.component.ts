import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-utente',
  standalone: false,
  templateUrl: './utente.component.html',
  styleUrl: './utente.component.css',
})
export class UtenteComponent implements OnInit {
  msg = '';
  constructor(
    private route: ActivatedRoute,
    private utente: UtenteService,
    private router: Router
  ) {}

  id!: number;

  utenteInfo: any;

  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(),
    cognome: new FormControl(),
    email: new FormControl(),
    telefono: new FormControl(),
    codiceFiscale: new FormControl(),
    indirizzo: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const idParam = param.get('id');
      if (idParam !== null) {
        this.utente.getPersona(parseInt(idParam, 10)).subscribe((resp: any) => {
          this.utenteInfo = resp;
          console.log(this.utenteInfo);
          this.updateForm = new FormGroup({
            nome: new FormControl(this.utenteInfo.nome, Validators.required),
            cognome: new FormControl(
              this.utenteInfo.cognome,
              Validators.required
            ),
            email: new FormControl(this.utenteInfo.email, Validators.required),
            telefono: new FormControl(
              this.utenteInfo.telefono,
              Validators.required
            ),
            codiceFiscale: new FormControl(
              this.utenteInfo.codiceFiscale,
              Validators.required
            ),
            indirizzo: new FormControl(
              this.utenteInfo.indirizzo,
              Validators.required
            ),
            password: new FormControl(
              this.utenteInfo.password,
              Validators.required
            ),
            role: new FormControl(this.utenteInfo.role, Validators.required),
          });
        });
      }
    });
  }

  onUpdate() {
    const v = this.updateForm.value;
    const payload = {
      id: this.utenteInfo.id,
      nome: v.nome,
      cognome: v.cognome,
      email: v.email,
      password: v.password,
      codiceFiscale: v.codiceFiscale,
      indirizzo: v.indirizzo,
      telefono: v.telefono,
      role: v.role ? 'MEDICO' : 'USER',
    };

    this.utente.update(payload).subscribe((resp: any) => {
      if (resp.rc) {
        this.router.navigate(['utenti/utente/:id']);
        window.location.reload();
      } else {
        this.msg = resp.msg;
      }
    });
  }
  onDelete() {
    this.utente.delete({ id: this.utenteInfo.id }).subscribe((resp: any) => {
      if (resp.rc) {
        this.router.navigate(['/utenti']);
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
