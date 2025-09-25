import { Component, OnInit } from '@angular/core';
import { VeterinariService } from '../../services/veterinari.service';

@Component({
  selector: 'app-veterinari',
  standalone: false,
  templateUrl: './veterinari.component.html',
  styleUrls: ['./veterinari.component.css'],
})
export class VeterinariComponent implements OnInit {
  veterinari: any[] = [];
  veterinariOriginali: any[] = [];

  regioni: string[] = [];
  province: string[] = [];
  serviziDisponibili: string[] = [];

  filtro = {
    regione: '',
    provincia: '',
    servizio: '',
    tipostruttura: '',
  };

  constructor(private service: VeterinariService) {}

  ngOnInit(): void {
    this.service.listVeterinari().subscribe((resp: any) => {
      this.veterinariOriginali = resp.dati;
      this.veterinari = [...this.veterinariOriginali];

      // valori unici per dropdown
      this.regioni = [...new Set(this.veterinari.map((v) => v.regione))];
      this.province = [...new Set(this.veterinari.map((v) => v.provincia))];
      this.serviziDisponibili = [
        ...new Set(this.veterinari.map((v) => v.serviziVO)),
      ];
    });
  }

  filtraPerRegione() {
    if (this.filtro.regione) {
      this.veterinari = this.veterinariOriginali.filter(
        (v) => v.regione === this.filtro.regione
      );
    } else {
      this.resetFiltri();
    }
  }

  filtraPerProvincia() {
    if (this.filtro.provincia) {
      this.veterinari = this.veterinariOriginali.filter(
        (v) => v.provincia === this.filtro.provincia
      );
    } else {
      this.resetFiltri();
    }
  }

  filtraPerServizio() {
    if (this.filtro.servizio) {
      this.veterinari = this.veterinariOriginali.filter(
        (v) => v.serviziVO === this.filtro.servizio
      );
    } else {
      this.resetFiltri();
    }
  }

  filtraPerStruttura() {
    if (this.filtro.tipostruttura) {
      this.veterinari = this.veterinariOriginali.filter(
        (v) => v.tipostruttura === this.filtro.tipostruttura
      );
    } else {
      this.resetFiltri();
    }
  }

  resetFiltri() {
    this.veterinari = [...this.veterinariOriginali];
  }
}
