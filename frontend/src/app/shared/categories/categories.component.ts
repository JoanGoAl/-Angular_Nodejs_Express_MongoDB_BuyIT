import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Category, Product } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('single') single!: TemplateRef<any>;
  @ViewChild('double') double!: TemplateRef<any>;
  @ViewChild('triple') triple!: TemplateRef<any>;

  data: Array<Category[]> = [];

  offset = 3;
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
      .getCategories(this.count, this.offset)
      .subscribe((docs) => {
        if (docs.length != 0) {
          docs.forEach((item: Category) => {
            this._productService.getRandomProduct(<string>item.title).subscribe((d) => item.product_img = d[0])
          })

          console.log(this.data);
          console.log(this.count, this.offset);


          this.data.push(docs);
          this.count += 3;
        }
      });
  }

  getTemplate(length: number) {
    switch (length) {
      case 1:
        return this.single
      case 2:
        return this.double
      case 3:
        return this.triple;
    }

    return null;
  }

  ngOnInit(): void {
    this.getScrollCategories()
  }
}
