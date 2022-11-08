import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';

// Http
import { HttpClientModule } from '@angular/common/http'

// Components
import { AppComponent } from './app.component';

// PrimeNG
import { AccordionModule } from 'primeng/accordion'
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CoreModule } from './core/core.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

// import { AuthComponent } from './auth/auth.component';

// Shared
import { FooterComponent, HeaderComponent, SharedModule } from './shared';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Icons
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AccordionModule,
    MegaMenuModule,
    CardModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ConfirmPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_library: FaIconLibrary) {
    _library.addIconPacks(far, fas)
  }
}
