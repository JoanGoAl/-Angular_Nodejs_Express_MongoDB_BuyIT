import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Filters, Product } from 'src/app/core/models';
import {
  CategoryService,
  ProductService,
  ProductsXCategoryService,
} from 'src/app/core/services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit {
  @Output() products = new EventEmitter<Product[]>();

  catsSelected: Array<any> = [];
  filters!: Filters;
  categories: Category[] = [];
  model: any[] = [];

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private pXcService: ProductsXCategoryService
  ) {}

  getProducts() {
    this.aRouter.url.subscribe((flt) => {
      if (flt.length != 0) {
        this.filters = Object.fromEntries(
          atob(flt[0].path)
            .split('?')
            .splice(1)
            .map((item) => item.split('&'))
            .map((e) => e[0].split('='))
        );

        console.log(this.filters);
      }
    });

    if (
      typeof this.filters == 'undefined' ||
      this.filters.category == 'all' ||
      typeof this.filters.category == 'undefined'
    ) {
      this.productService.getProducts().subscribe((items) => {
        this.router.navigateByUrl(`shop/${btoa(`filters?category=all`)}`);
        this.products.emit(items);
      });
    }

    if (
      this.filters.category != 'undefined' &&
      this.filters.category != 'all'
    ) {
      this.pXcService.getPxC(this.filters.category).subscribe((items) => {
        this.products.emit(items);
      });
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  changeCategoryUrl = () => {
    let options = this.catsSelected.map((i: Category) => i.title.toLowerCase());

    this.router.navigateByUrl(
      `shop/${btoa(`filters?category=${options}`)}`
    );

    this.productService.getProducts().subscribe((items) => {
      console.log(items);
      this.products.emit(items);
    });

    // if (e.target.value != 'undefined' && e.target.value != 'all') {
    //   this.pXcService.getPxC(e.target.value).subscribe((items) => {
    //     this.products.emit(items);
    //   });
    // }
  };

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
}
