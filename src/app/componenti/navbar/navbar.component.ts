import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  id!: any;
  logged: boolean = false;
  isAdmin: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logged = this.auth.isLogged;
    this.isAdmin = this.auth.isAdmin;
    this.id = this.auth.idUtente;
    console.log(this.logged);
  }

  logout() {
    this.auth.resetAll;
    this.logged = false;
    this.router.navigate(['/welcome']);
    console.log(this.logged);
  }
}
