import { Component } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent {
  prodotti: any[] = [];
  filteredProdotti: any[] = [];

  categorie: string[] = [];
  tipiAnimale: string[] = [];

  searchTerm: string = '';
  selectedCategorie: string[] = [];
  selectedTipiAnimale: string[] = [];

  response: any;

  constructor(private service: ProdottiService) {}

  ngOnInit(): void {
    this.service.listProdotti().subscribe((resp) => {
      this.response = resp;
      this.prodotti = this.response.dati;
      this.filteredProdotti = [...this.prodotti];

      this.categorie = [...new Set(this.prodotti.map((p) => p.categoria))];
      this.tipiAnimale = [...new Set(this.prodotti.map((p) => p.tipoAnimale))];
    });
  }

  applyFilters() {
    this.filteredProdotti = this.prodotti.filter((p) => {
      const matchesSearch = p.nomeProdotto
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesCategoria =
        this.selectedCategorie.length === 0 ||
        this.selectedCategorie.includes(p.categoria);

      const matchesTipo =
        this.selectedTipiAnimale.length === 0 ||
        this.selectedTipiAnimale.includes(p.tipoAnimale);

      return matchesSearch && matchesCategoria && matchesTipo;
    });
  }

  toggleCategoria(cat: string, event: any) {
    if (event.target.checked) {
      this.selectedCategorie.push(cat);
    } else {
      this.selectedCategorie = this.selectedCategorie.filter((c) => c !== cat);
    }
    this.applyFilters();
  }

  toggleTipoAnimale(tipo: string, event: any) {
    if (event.target.checked) {
      this.selectedTipiAnimale.push(tipo);
    } else {
      this.selectedTipiAnimale = this.selectedTipiAnimale.filter(
        (t) => t !== tipo
      );
    }
    this.applyFilters();
  }
}
