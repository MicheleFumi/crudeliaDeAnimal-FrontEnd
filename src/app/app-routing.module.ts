import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from './auth/auth-admin.guard';
import { authGuard } from './auth/auth.guard';
import { AnimaliComponent } from './componenti/animali/animali.component';
import { HomeComponent } from './componenti/home/home.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { PrenotazioniComponent } from './componenti/prenotazioni/prenotazioni.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { ProdottoComponent } from './componenti/prodotto/prodotto.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { RegisterComponent } from './componenti/register/register.component';
import { SigninComponent } from './componenti/signin/signin.component';
import { UtenteComponent } from './componenti/utente/utente.component';
import { UtentiComponent } from './componenti/utenti/utenti.component';
import { VeterinariComponent } from './componenti/veterinari/veterinari.component';
import { VeterinarioComponent } from './componenti/veterinario/veterinario.component';
import { WelcomeComponent } from './componenti/welcome/welcome.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'prodotti', component: ProdottiComponent },
  { path: 'utenti/utente/:id', component: UtenteComponent },
  { path: 'prodotti/:id', component: ProdottoComponent },
  {path:'carrello/:id' , component: CarrelloComponent},
  { path: 'veterinari', component: VeterinariComponent },
  { path: 'veterinari/:id', component: VeterinarioComponent },
  {
    path: 'prenotazioni',
    component: PrenotazioniComponent,
    canActivate: [authGuard],
  },
  {
    path: 'animali/:id',
    component: AnimaliComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profilo',
    component: ProfiloComponent,
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    canActivate: [authAdminGuard],
  },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
