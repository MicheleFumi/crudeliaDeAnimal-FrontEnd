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
  tipi: string[] = ['Cane', 'Gatto', 'Uccello', 'Pesce', 'Roditore', 'Rettile'];
  selectedAnimale: any;
  constructor(
    private route: ActivatedRoute,
    private service: AnimaliService,
    private auth: AuthService,
    private router: Router
  ) {}

  updateForm: FormGroup = new FormGroup({
    nomeAnimale: new FormControl(),
    razza: new FormControl(),
    noteMediche: new FormControl(),
    utente: new FormControl(),
    tipo: new FormControl(),
  });

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

  getBadgeClass(tipo: string): string {
    switch (tipo?.toLowerCase()) {
      case 'cane':
        return 'fa-solid fa-dog';
      case 'gatto':
        return 'bg-success';
      case 'uccello':
        return 'bg-info text-dark';
      case 'pesce':
        return 'bg-warning text-dark';
      case 'roditore':
        return 'bg-danger';
      case 'rettile':
        return 'bg-secondary';
      default:
        return 'bg-dark';
    }
  }

  OnUpdate() {
    const params = this.updateForm.value;
    console.log('Salvato:', params);
  }

  elimina(animale: any) {
    console.log('Eliminato:', animale);
  }
}
