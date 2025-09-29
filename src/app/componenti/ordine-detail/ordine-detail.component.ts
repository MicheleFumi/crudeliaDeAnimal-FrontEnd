import { Component ,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdiniService } from '../../services/ordine.service'; 

@Component({
  selector: 'app-ordine-detail',
  standalone: false,
  templateUrl: './ordine-detail.component.html',
  styleUrl: './ordine-detail.component.css'
})
export class OrdineDetailComponent implements OnInit {
  ordine: any;

  constructor(
    private route: ActivatedRoute,
    private ordiniService: OrdiniService
  ) {}

 ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.ordiniService.getOrdine(+id).subscribe({
        next: resp => this.ordine = resp.dati,
        error: err => console.error('Ordine non trovato', err)
      });
    }
  });
}
}
