import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-animale',
  standalone: false,
  templateUrl: './create-animale.component.html',
  styleUrl: './create-animale.component.css'
})
export class CreateAnimaleComponent implements OnInit {

  userId: number=Number(localStorage.getItem('idUtente'));
  tipi = ['cane', 'gatto', 'uccello', 'roditore', 'pesce', 'rettile'];

  constructor() { }

  ngOnInit(): void {
    
  }

}
