import { NgModule } from '@angular/core'

import { CarouselComponent } from '.'
import { CarouselModule } from 'primeng/carousel';
import { CategoriesComponent } from './categories/categories.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
  ],
  imports: [
    CarouselModule,
    InfiniteScrollModule
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent
  ]
})

export class SharedModule {  }
