import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = false;
  isAdmin = false;
  idUtente: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedValue = localStorage.getItem('isLogged');
      const isAdminValue = localStorage.getItem('isAdmin');
      const idUtenteValue = localStorage.getItem('idUtente');

      if (
        isLoggedValue != null &&
        isAdminValue != null &&
        idUtenteValue != null
      ) {
        console.log('Token exists in local storage');
        // Convert string to number properly
        this.idUtente = parseInt(idUtenteValue, 10);
        this.isLogged = isLoggedValue === '1';
        this.isAdmin = isAdminValue === '1';
        console.log('is admin: ' + this.isAdmin);
      } else {
        // Set default values when no valid data exists
        localStorage.setItem('isLogged', '0');
        localStorage.setItem('isAdmin', '0');
        localStorage.setItem('idUtente', '');
        this.idUtente = null;
        this.isLogged = false;
        this.isAdmin = false;
      }
    }
  }

  isAutentificated(): boolean {
    return this.isLogged && this.idUtente != null;
  }

  isRoleAdmin(): boolean {
    return this.isAdmin;
  }

  setAutentificated(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLogged', '1');
      localStorage.setItem('isAdmin', '0');
      localStorage.setItem('idUtente', id.toString());
    }
    this.isLogged = true;
    this.isAdmin = false;
    this.idUtente = id;

    console.log('User authenticated with ID:', this.idUtente);
  }

  setAdmin(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdmin', '1');
    }
    this.isAdmin = true;
  }

  resetAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLogged', '0');
      localStorage.setItem('isAdmin', '0');
      localStorage.setItem('idUtente', '');
    }
    this.isLogged = false;
    this.isAdmin = false;
    this.idUtente = null;
  }
}
