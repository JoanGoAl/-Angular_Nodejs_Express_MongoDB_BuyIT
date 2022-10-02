import { Category } from './../core/models/Category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../core/services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }

  categories!: Category[];

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    if (this._categoryService.categories.length == 0){
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
