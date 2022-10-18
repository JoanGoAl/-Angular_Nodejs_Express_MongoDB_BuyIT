import { NgModule } from '@angular/core';

import { CarouselComponent } from '.';
import { CarouselModule } from 'primeng/carousel';
import { CategoriesComponent } from './categories/categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
<<<<<<< HEAD
import { IconsComponent } from './icons/icons.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel'
=======
import { DetailsProductComponent } from './details-product/details-product.component';
import { FiltersComponent } from './filters/filters.component';
>>>>>>> joan-dev

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent,
    FiltersComponent
  ],
  imports: [
    CarouselModule,
    InfiniteScrollModule,
    IconsComponent,
    ScrollTopModule,
    ScrollPanelModule
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent,
<<<<<<< HEAD
    ListProductsComponent
  ],
=======
    ListProductsComponent,
    DetailsProductComponent,
    FiltersComponent
  ]
>>>>>>> joan-dev
})
export class SharedModule {}
