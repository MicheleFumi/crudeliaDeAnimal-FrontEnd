import { CommonModule,   NgClass } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimaliComponent } from './componenti/animali/animali.component';
import { HomeComponent } from './componenti/home/home.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
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
import { AppuntamentoComponent } from './dialogs/appuntamento/appuntamento.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { MatIconModule } from '@angular/material/icon';
import { CarrelloDialogComponent } from './dialogs/carrello-dialog/carrello-dialog.component';
import { OrdiniComponent } from './componenti/ordini/ordini.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotfoundComponent,
    HomeComponent,
    NavbarComponent,
    WelcomeComponent,
    RegisterComponent,
    ProdottiComponent,
    ProdottoComponent,
    ProfiloComponent,
    AnimaliComponent,
    UtentiComponent,
    UtenteComponent,
    VeterinariComponent,
    VeterinarioComponent,
    AppuntamentoComponent,
    CarrelloComponent, 
    CarrelloDialogComponent, OrdiniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    BrowserAnimationsModule,
    NgClass,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
