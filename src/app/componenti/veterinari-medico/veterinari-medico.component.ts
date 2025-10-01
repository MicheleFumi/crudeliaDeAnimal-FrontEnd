import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { VeterinariService } from '../../services/veterinari.service';

@Component({
  selector: 'app-veterinari-medico',
  standalone: false,
  templateUrl: './veterinari-medico.component.html',
  styleUrl: './veterinari-medico.component.css',
})
export class VeterinariMedicoComponent implements OnInit {

 
  constructor(
    private veterinariService: VeterinariService,
    private auth: AuthService,
    private router: Router
  ) {}

  msg = '';
  veterinariaInfo: any = null;
  isLoading: boolean = true;
  isEditMode: boolean = false; // True if data is loaded, false if we are creating new data

  updateVeterinariaForm: FormGroup = new FormGroup({
    nome: new FormControl(),
    tipostrutture: new FormControl(),
    indirizzo: new FormControl(),
    provincia: new FormControl(),
    regione: new FormControl(),
    cap: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    orariApertura: new FormControl(),
    serviziVO: new FormControl(),
  });

  ngOnInit(): void {
    if (this.auth.isAutentificated() && this.auth.idUtente != null) {
      this.isLoading = true;
      this.veterinariService.findByIdUtente(this.auth.idUtente).subscribe({
        next: (resp: any) => {
          this.isLoading = false;
          // The backend returns a ResponseList, so data is in dati[0]
          const dati = resp.dati ? resp.dati[0] : null;

          if (dati && dati.id) {
            this.veterinariaInfo = dati;
            this.isEditMode = true;

            // Initialize the form with received data and Validators
            this.updateVeterinariaForm = new FormGroup({
              nome: new FormControl(
                this.veterinariaInfo.nome,
                Validators.required
              ),
              tipostrutture: new FormControl(
                this.veterinariaInfo.tipostrutture,
                Validators.required
              ),
              indirizzo: new FormControl(
                this.veterinariaInfo.indirizzo,
                Validators.required
              ),
              provincia: new FormControl(
                this.veterinariaInfo.provincia,
                Validators.required
              ),
              regione: new FormControl(
                this.veterinariaInfo.regione,
                Validators.required
              ),
              cap: new FormControl(
                this.veterinariaInfo.cap,
                Validators.required
              ),
              telefono: new FormControl(
                this.veterinariaInfo.telefono,
                Validators.required
              ),
              email: new FormControl(this.veterinariaInfo.email, [
                Validators.required,
                Validators.email,
              ]),
              orariApertura: new FormControl(
                this.veterinariaInfo.orariApertura,
                Validators.required
              ),
              serviziVO: new FormControl(
                this.veterinariaInfo.serviziVO,
                Validators.required
              ),
            });
          } else {
            // No data found for this user
            this.veterinariaInfo = null;
            this.isEditMode = false;
            this.onAdd(); // Reset form for creation
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching veterinaria data ', error);
          this.msg = 'Errore nel caricamento dei dati della struttura.';
        },
      });
    } else {
      console.error('User not authenticated or ID not available');
      this.isLoading = false;
      this.router.navigate(['/login']);
    }
  }

  // Sets the form up for creating a new entry
  onAdd() {
    this.isEditMode = false;
    this.updateVeterinariaForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      tipostrutture: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      regione: new FormControl('', Validators.required),
      cap: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      orariApertura: new FormControl('', Validators.required),
      serviziVO: new FormControl('', Validators.required),
    });
    this.msg = ''; // Clear any previous error messages
  }

  // Combined handler for Update and Create submission
  onUpdateOrAdd() {
    if (this.updateVeterinariaForm.invalid) {
      this.msg = 'Per favore, compila tutti i campi richiesti.';
      return;
    }

    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  // Logic for creating a new structure
  onCreate() {
    const v = this.updateVeterinariaForm.value;

    const payload = {
      // ID is omitted for creation
      utente: { id: this.auth.idUtente }, // FIX for JSON parse error
      nome: v.nome,
      tipostrutture: v.tipostrutture,
      indirizzo: v.indirizzo,
      provincia: v.provincia,
      regione: v.regione,
      cap: v.cap,
      telefono: v.telefono,
      email: v.email,
      orariApertura: v.orariApertura,
      serviziVO: v.serviziVO,
    };

    this.veterinariService.create(payload).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          this.router.navigate(['veterinari-medico']);
          window.location.reload();
        } else {
          this.msg = resp.msg || 'Creazione fallita.';
        }
      },
      error: (error) => {
        this.msg = 'Errore durante la creazione della struttura.';
        console.error('Creation failed:', error);
      },
    });
  }

  // Logic for updating the existing structure
  onUpdate() {
    const v = this.updateVeterinariaForm.value;

    if (!this.veterinariaInfo) {
      this.msg = 'Impossibile aggiornare: ID struttura mancante.';
      return;
    }

    const payload = {
      id: this.veterinariaInfo.id,
      utente: { id: this.veterinariaInfo.utente || this.auth.idUtente }, // FIX for JSON parse error
      nome: v.nome,
      tipostrutture: v.tipostrutture,
      indirizzo: v.indirizzo,
      provincia: v.provincia,
      regione: v.regione,
      cap: v.cap,
      telefono: v.telefono,
      email: v.email,
      orariApertura: v.orariApertura,
      serviziVO: v.serviziVO,
    };

    this.veterinariService.update(payload).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          this.router.navigate(['veterinari-medico']);
          window.location.reload();
        } else {
          this.msg = resp.msg || 'Aggiornamento fallito.';
        }
      },
      error: (error) => {
        this.msg = "Errore durante l'aggiornamento della struttura.";
        console.error('Update failed:', error);
      },
    });
  }

  onDelete() {
    if (!this.veterinariaInfo) {
      this.msg = 'Nessuna struttura da eliminare.';
      return;
    }

    this.veterinariService.delete({ id: this.veterinariaInfo.id }).subscribe({
      next: (resp: any) => {
        if (resp.rc) {
          window.location.reload();
        } else {
          this.msg = resp.msg || 'Eliminazione fallita.';
        }
      },
      error: (error) => {
        this.msg = "Errore durante l'eliminazione della struttura.";
        console.error('Deletion failed:', error);
      },
    });
  }
}
