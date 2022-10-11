import { NgModule } from '@angular/core'

import { CarouselComponent } from '.'
import { CarouselModule } from 'primeng/carousel';
import { CategoriesComponent } from './categories/categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailsProductComponent } from './details-product/details-product.component';

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent
  ],
  imports: [
    CarouselModule,
    InfiniteScrollModule
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent,
    DetailsProductComponent
  ]
})

export class SharedModule { }
