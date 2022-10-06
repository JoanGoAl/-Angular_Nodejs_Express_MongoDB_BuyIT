import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // Data tiene que ser un array con arrays dentro de tres posiciones de categorias
  // [[{ name: "Coches", img: "example" }, { name: "Coches", img: "example" }, { name: "Coches", img: "example" }]]
  data: Array<Category[]> = [];

  sum = 3;
  count = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(
    private categoriesService: CategoryService,
    private _productService: ProductService
    ) {}

  onScrollDown() {
    this.getScrollCategories()
  }

  getScrollCategories() {
    this.categoriesService
      .getCategories(this.count, this.sum)
      .subscribe((docs) => {
        if (docs.length != 0) {
          docs.forEach((item) => {
            item.product_img = this._productService()
          })
          this.data.push(docs);
          this.count = this.sum;
          this.sum += 3;
        }
      });
  }

  ngOnInit(): void {
    this.getScrollCategories()
  }
}
