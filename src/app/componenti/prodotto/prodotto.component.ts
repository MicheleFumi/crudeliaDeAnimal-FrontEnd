import { Component, OnInit, Inject } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-prodotto',
  standalone: false,
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css',
})
export class ProdottoComponent implements OnInit {
  id!: number;
  prodotto: any;
  isLogged: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private service: ProdottiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.service.findById(this.id).subscribe((resp: any) => {
          this.prodotto = resp.dati;
        });
      }
    });
    this.isLogged = this.auth.isAutentificated();
  }
}
