import { Component, inject, OnInit } from '@angular/core';
import { AnimaliService } from '../../services/animali.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAnimaleComponent } from '../../dialogs/animale/update-animale/update-animale.component';

@Component({
  selector: 'app-animali',
  standalone: false,
  templateUrl: './animali.component.html',
  styleUrl: './animali.component.css',
})
export class AnimaliComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  id!: number;
  isLogged: boolean = false;
  animali: any;
  msg: any;
  tipi: string[] = ['cane', 'gatto', 'uccello', 'pesce', 'roditore', 'rettile'];
  selectedAnimale: any = null;
  updateForm!: FormGroup;
  createForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: AnimaliService,
    private auth: AuthService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isAutentificated();
    if (this.isLogged) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const idParam = params.get('id');
        if (idParam !== null) {
          this.id = +idParam;
          this.service.findByUserId(this.id).subscribe((resp: any) => {
            this.animali = resp.dati;
            console.log(this.animali[0]);
          });
        } else {
          this.routing.navigate(['/signin']).then(() => {
            window.location.reload();
          });
        }
      });
    }

    this.createForm = new FormGroup({
      nomeAnimale: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      razza: new FormControl('', Validators.required),
      noteMediche: new FormControl('', Validators.required),
      utente: new FormControl(),
    });
  }

  onDelete(animale: any) {
    this.service.delete(animale).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/animali', this.id]).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }

  openUpdateModal(animale: any) {
    const dialogRef = this.dialog.open(UpdateAnimaleComponent, {
      data: { animale: animale },
    });
  }

  onCreate() {
    const params = this.createForm.value;

    params.utente = { id: this.id };
    this.service.create(params).subscribe((resp: any) => {
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
