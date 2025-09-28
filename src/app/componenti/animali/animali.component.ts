import { Component, inject, OnInit } from '@angular/core';
import { AnimaliService } from '../../services/animali.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAnimaleComponent } from '../../dialogs/animale/update-animale/update-animale.component';
import { CreateAnimaleComponent } from '../../dialogs/animale/create-animale/create-animale.component';

@Component({
  selector: 'app-animali',
  standalone: false,
  templateUrl: './animali.component.html',
  styleUrls: ['./animali.component.css'],
})
export class AnimaliComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  id!: number;
  isLogged: boolean = false;
  animali: any;
  msg: any;

  constructor(
    private service: AnimaliService,
    private auth: AuthService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isAutentificated();

    if (this.isLogged) {
      this.id = Number(localStorage.getItem('idUtente'));
      this.service.findByUserId(this.id).subscribe((resp: any) => {
        this.animali = resp.dati;
      });

    } else {
      this.routing.navigate(['/signin']).then(() => {
        window.location.reload();
      });
    }
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
    this.dialog.open(UpdateAnimaleComponent, {
      data: { animale: animale },
    });
  }

  openCreateModal() {
    this.dialog.open(CreateAnimaleComponent);
  }
}
