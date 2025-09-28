import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppuntamentoComponent } from '../../dialogs/appuntamento/appuntamento.component';
import { VeterinariService } from '../../services/veterinari.service';

@Component({
  selector: 'app-veterinario',
  standalone: false,
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css'],
})
export class VeterinarioComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  veterinario: any;
  id!: number;
  mapUrl!: SafeResourceUrl;
  constructor(
    private service: VeterinariService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.service.findById(this.id).subscribe((resp: any) => {
          this.veterinario = resp.dati;

          if (this.veterinario?.indirizzo && this.veterinario?.cap) {
            const url = `https://www.google.com/maps?q=${this.veterinario.indirizzo},${this.veterinario.cap}&output=embed`;
            this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
        });
      }
    });
  }

  prenotaVisita(veterinario: any) {
    console.log('certificato selected...');

    const dialogRef = this.dialog.open(AppuntamentoComponent, {
      width: '800px',
      maxWidth: '100vw',
      height: '600px',
      maxHeight: '100vh',
      data: { veterinarioId: veterinario.id, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((resp: any) => {
      if (resp == 'reload') {
        console.log('realod is required...');
      }
    });
  }
}
