import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
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
          if (resp.role == 'ADMIN') {
            console.log(resp.role);
            this.auth.setAdmin();
          }
          if (resp.role == 'MEDICO') {
            console.log(resp.role);
            this.auth.setMedico();
          }
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        } else {
          this.msg = 'Email o Password invalido';
        }
      });
  }
}
