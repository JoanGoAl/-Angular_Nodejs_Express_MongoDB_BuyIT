import { NgModule } from '@angular/core'

import { CarouselComponent } from '.'
import { CarouselModule } from 'primeng/carousel';
import { CategoriesComponent } from './categories/categories.component'

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent
  ],
  imports: [
    CarouselModule
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent
  ]
})

export class SharedModule {  }
