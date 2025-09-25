import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-profilo',
  standalone: false,
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css',
})
export class ProfiloComponent implements OnInit {
  constructor(
    private utente: UtenteService,
    private auth: AuthService,
    private router: Router
  ) {}

  msg = '';
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
    // Check if user is authenticated and has a valid ID
    if (this.auth.isAutentificated() && this.auth.idUtente != null) {
      this.utente.getPersona(this.auth.idUtente).subscribe({
        next: (resp: any) => {
          console.log('User data received:', resp);
          this.utenteInfo = resp.dati ? resp.dati[0] : resp;
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
        },
        error: (error) => {
          console.error('Error fetching user ', error);
          // Optionally redirect to login on error
          this.router.navigate(['/login']);
          window;
        },
      });
    } else {
      console.error('User not authenticated or ID not available');
      // Redirect to login page
      // this.router.navigate(['/login']);
    }
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
        this.router.navigate(['profilo']);
        window.location.reload();
      } else {
        this.msg = resp.msg;
      }
    });
  }
  onDelete() {
    this.utente.delete({ id: this.utenteInfo.id }).subscribe((resp: any) => {
      if (resp.rc) {
        this.auth.resetAll();
        this.router.navigate(['welcome']);
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
