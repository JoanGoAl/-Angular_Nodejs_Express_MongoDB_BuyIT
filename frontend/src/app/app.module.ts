import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Http
import { HttpClientModule } from '@angular/common/http'

// Components
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
// import { HomeComponent } from './home/home.component';
// import { CarouselComponent, FooterComponent, HeaderComponent } from './shared';


// PrimeNG
import { AccordionModule } from 'primeng/accordion'
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';

import { FooterComponent, HeaderComponent, SharedModule } from './shared';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AccordionModule,
    MegaMenuModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
