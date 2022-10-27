import { NgModule } from '@angular/core';

// PrimeNG
import { CarouselModule } from 'primeng/carousel';
import { ScrollTopModule } from 'primeng/scrolltop'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect'


// Components
import { CarouselComponent } from '.';
import { CategoriesComponent } from './categories';
import { ListProductsComponent } from './list-products';
import { DetailsProductComponent } from './details-product';
import { FiltersComponent } from './filters';
import { IconsComponent } from './icons';

// Form
import { FormsModule } from '@angular/forms';

// Scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Pipe
import { CapitalizePipe, CapitalizeArrayPipe } from '../core/pipes'

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    FiltersComponent,
    CapitalizePipe,
    CapitalizeArrayPipe
  ],
  imports: [
    CarouselModule,
    InfiniteScrollModule,
    IconsComponent,
    ScrollTopModule,
    ScrollPanelModule,
    PanelMenuModule,
    FormsModule,
    MultiSelectModule,
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    FiltersComponent,
    CapitalizePipe,
    CapitalizeArrayPipe
  ],
  providers: [ CapitalizeArrayPipe ]
})
export class SharedModule {}
