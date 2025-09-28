import { Component, OnInit } from '@angular/core';
import { AnimaliService } from '../../../services/animali.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-animale',
  standalone: false,
  templateUrl: './create-animale.component.html',
  styleUrl: './create-animale.component.css'
})
export class CreateAnimaleComponent implements OnInit {

  userId: number=Number(localStorage.getItem('idUtente'));
  tipi = ['cane', 'gatto', 'uccello', 'roditore', 'pesce', 'rettile'];
  form!: FormGroup;   
  msg: string='';
  constructor(
    private service: AnimaliService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.form = new FormGroup({ 
      nomeAnimale: new FormControl ('', Validators.required),
      razza: new FormControl ('', Validators.required),
      tipo: new FormControl ('', Validators.required),
      noteMediche: new FormControl ('', Validators.maxLength(500)),
      utente : new FormControl ({id: this.userId})
    })
  }

  onSubmit() {
    const params = this.form.value; 
    console.log(params); 
    this.service.create(params).subscribe((resp : any)=> {
      if(resp.rc){
        this.router.navigate(['animali/:id'])
        window.location.reload()
      }else{
        this.msg = resp.msg 
      }
    })
  }
}
