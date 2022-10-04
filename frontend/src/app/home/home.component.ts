import { Category } from './../core/models/Category.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../core/services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
<<<<<<< HEAD
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

=======
export class HomeComponent {
  constructor() { }
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
}
