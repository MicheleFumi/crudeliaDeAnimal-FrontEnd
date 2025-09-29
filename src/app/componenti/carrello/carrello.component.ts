import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrelloServiceAPI } from '../../services/carrelloAPI.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit{
  idUtente!: number;
  prodotti: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private carrelloServiceAPI: CarrelloServiceAPI,
    private snackBar: MatSnackBar
  ) {}

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idUtente = +idParam;
        this.loadCarrello();
      }
    });
  }

    loadCarrello() {
    this.carrelloServiceAPI.getCarrello(this.idUtente).subscribe({
      next: (resp: any) => this.prodotti = resp.dati || [],
      error: (err) => console.error(err)
    });
  }

}
