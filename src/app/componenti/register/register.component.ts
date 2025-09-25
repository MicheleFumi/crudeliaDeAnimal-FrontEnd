import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg = '';

  registrazioneform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utente: UtenteService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.registrazioneform = this.fb.group(
      {
        nome: new FormControl<string | null>(null, [
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/),
        ]),
        cognome: new FormControl<string | null>(null, [
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/),
        ]),
        indirizzo: new FormControl<string | null>(null, [Validators.required]),
        telefono: new FormControl<string | null>(null, [
          Validators.required,
          Validators.pattern(/^[0-9+\s()-]{7,20}$/),
        ]),
        codiceFiscale: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern(/^[A-Z0-9]{16}$/),
        ]),
        email: new FormControl<string | null>(null, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirm: new FormControl<string | null>(null, [
          Validators.required,
        ]),

        role: new FormControl<boolean>(false),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.registrazioneform.controls;
  }

  private passwordsMatchValidator = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirm = group.get('passwordConfirm')?.value;
    return pass && confirm && pass !== confirm
      ? { passwordMismatch: true }
      : null;
  };

  OnRegistrazione(): void {
    this.msg = '';
    if (this.registrazioneform.invalid) {
      this.registrazioneform.markAllAsTouched();
      return;
    }

    this.auth.resetAll();

    const v = this.registrazioneform.value;
    const payload = {
      nome: v.nome,
      cognome: v.cognome,
      email: v.email,
      password: v.password,
      codiceFiscale: v.codiceFiscale,
      indirizzo: v.indirizzo,
      telefono: v.telefono,
      role: v.role ? 'MEDICO' : 'USER',
    };

    this.utente.register(payload).subscribe({
      next: (resp: any) => {
        if (resp?.rc) {
          this.utente
            .signin({ email: v.email, password: v.password })
            .subscribe({
              next: (loginResp: any) => {
                if (loginResp?.logged) {
                  this.auth.setAutentificated(loginResp?.id);
                  this.msg = '';

                  if (loginResp.role === 'ADMIN') {
                    this.auth.setAdmin();
                  }
                  console.log('in the routing process');
                  this.router.navigate(['/home']);
                } else {
                  this.msg = 'Email o Password invalido';
                }
              },
              error: () => {
                this.msg = 'Accesso fallito dopo la registrazione';
              },
            });
        } else {
          this.msg = 'Registrazione non riuscita';
        }
      },
      error: () => {
        this.msg = 'Errore durante la registrazione';
      },
    });
  }
}
