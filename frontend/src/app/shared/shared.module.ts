import { NgModule } from '@angular/core';

// PrimeNG
import { CarouselModule } from 'primeng/carousel';
import { ScrollTopModule } from 'primeng/scrolltop'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect'
import { DataViewModule } from 'primeng/dataview'

// Components
import { CarouselComponent } from '.';
import { CategoriesComponent } from './categories';
import { ListProductsComponent } from './list-products';
import { DetailsProductComponent } from './details-product';
import { FiltersComponent } from './filters';
import { IconsComponent } from './icons';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Pipe
import { CapitalizePipe, CapitalizeArrayPipe } from '../core/pipes';
import { FavoriteComponent } from './buttons/favorite/favorite.component';
import { FollowComponent } from './buttons/follow/follow.component'

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    FiltersComponent,
    CapitalizePipe,
    CapitalizeArrayPipe,
    FavoriteComponent,
    FollowComponent
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
    DataViewModule,
    ReactiveFormsModule,
    ConfirmPopupModule
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
  providers: [CapitalizeArrayPipe, ConfirmationService]
})
export class SharedModule { }
