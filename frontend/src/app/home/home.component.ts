import { Category } from './../core/models/Category.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../core/services';
import { Carousel } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }

  categories!: Category[];

  ngOnInit(): void {
    this.getCategories()

  }

  getCategories() {
    if (this._categoryService.categories.length == 0) {
      this._categoryService.getCategories().subscribe({
        next: (docs) => {
          this._categoryService.categories = docs
          this.categories = this._categoryService.categories
        }
      })
    }


    this._categoryService.state$.subscribe({
      next: (docs) => this.categories = this._categoryService.categories,
      error: e => console.error(e)
    });
  }

}
