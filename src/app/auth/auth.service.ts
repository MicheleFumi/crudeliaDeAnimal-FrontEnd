import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = false;
  isAdmin = false;
  isMedico = false;
  idUtente: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedValue = localStorage.getItem('isLogged');
      const isAdminValue = localStorage.getItem('isAdmin');
      const isMedicoValue = localStorage.getItem('isMedico');
      const idUtenteValue = localStorage.getItem('idUtente');

      console.log('Loading from localStorage:', {
        isLoggedValue,
        isAdminValue,
        isMedicoValue,
        idUtenteValue,
      });

      if (isLoggedValue && isAdminValue && isMedicoValue && idUtenteValue) {
        this.idUtente = parseInt(idUtenteValue, 10);
        this.isLogged = isLoggedValue === '1';
        this.isAdmin = isAdminValue === '1';
        this.isMedico = isMedicoValue === '1';

        console.log('Parsed values:', {
          isLogged: this.isLogged,
          isAdmin: this.isAdmin,
          isMedico: this.isMedico,
          idUtente: this.idUtente,
        });
      } else {
        this.resetAll();
      }
    }
  }

  isAutentificated(): boolean {
    return this.isLogged && this.idUtente != null;
  }

  isRoleAdmin(): boolean {
    return this.isAdmin;
  }

  isRoleMedico(): boolean {
    return this.isMedico;
  }

  setAutentificated(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLogged', '1');
      localStorage.setItem('isAdmin', '0');
      localStorage.setItem('isMedico', '0');
      localStorage.setItem('idUtente', id.toString());
    }
    this.isLogged = true;
    this.isAdmin = false;
    this.isMedico = false;
    this.idUtente = id;

    console.log('User authenticated with ID:', this.idUtente);
  }

  setAdmin(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdmin', '1');
      localStorage.setItem('isMedico', '0');
    }
    this.isAdmin = true;
    this.isMedico = false;
  }

  setMedico(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isMedico', '1');
      localStorage.setItem('isAdmin', '0');
    }
    this.isMedico = true;
    this.isAdmin = false;
  }

  resetAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isMedico');
      localStorage.removeItem('idUtente');
    }
    this.isLogged = false;
    this.isAdmin = false;
    this.isMedico = false;
    this.idUtente = null;
    console.log('Force reset completed');
  }
}
