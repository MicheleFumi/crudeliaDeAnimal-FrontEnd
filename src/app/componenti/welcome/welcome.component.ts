import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(
    private utente: UtenteService,
    private router: Router,
    private auth: AuthService
  ) {}

  msg = '';

  signinform = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  registrazioneform = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    indirizzo: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    codiceFiscale: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.signinform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.auth.resetAll();
    this.utente
      .signin({
        email: this.signinform.value.email,
        password: this.signinform.value.password,
      })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.logged) {
          this.auth.setAutentificated(resp.id);
          this.msg = '';
          if ((resp.role = 'ADMIN')) {
            this.auth.setAdmin();
          }
          this.router.navigate(['home']);
          window.location.reload();
        } else {
          this.msg = 'Email o Password invalido';
        }
      });
  }
  OnRegistrazione() {
    this.auth.resetAll();
    this.utente
      .register({
        nome: this.registrazioneform.value.nome,
        cognome: this.registrazioneform.value.cognome,
        email: this.registrazioneform.value.email,
        password: this.registrazioneform.value.password,
        codiceFiscale: this.registrazioneform.value.codiceFiscale,
        indirizzo: this.registrazioneform.value.indirizzo,
        telefono: this.registrazioneform.value.telefono,
        role: this.registrazioneform.value.role ? 'MEDICO' : 'USER',
      })
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.utente
            .signin({
              email: this.registrazioneform.value.email,
              password: this.registrazioneform.value.password,
            })
            .subscribe((resp: any) => {
              console.log(resp);
              if (resp.logged) {
                this.auth.setAutentificated(resp.id);
                this.msg = '';
                if ((resp.role = 'ADMIN')) {
                  this.auth.setAdmin();
                }
                this.router.navigate(['home']);
                window.location.reload();
              } else {
                this.msg = 'Email o Password invalido';
              }
            });
        }
      });
  }
}
