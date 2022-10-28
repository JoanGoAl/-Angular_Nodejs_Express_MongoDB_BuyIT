import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Filters, Product } from 'src/app/core/models';
import { CapitalizeArrayPipe } from 'src/app/core/pipes';
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
  filters: Filters = { category: 'all' };
  categories: Category[] = [];
  model: any[] = [];

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private pXcService: ProductsXCategoryService,
    private capitalizeArrayPipe: CapitalizeArrayPipe
  ) {}

  getProducts() {
    this.aRouter.url.subscribe((flt) => {
      if (flt.length > 0) {
        this.filters = Object.fromEntries(
          atob(flt[0].path)
            .split('?')
            .splice(1)
            .map((item) => item.split('&'))
            .map((e) => e[0].split('='))
        );
      } else {
        this.filters['category'] = 'all';
      }
    });

    this.filters.category == '' ? (this.filters.category = 'all') : null;
    this.categoryService
      .getCategoryInfo(
        this.filters.category.includes(',')
          ? this.filters.category.split(',')
          : [this.filters.category]
      )
      .subscribe((res) => {
        res.map((e) => this.catsSelected.push(e.value.length > 0 ? e.value[0] : []));
        console.log(this.catsSelected);

        if (
          this.catsSelected.length > 0 &&
          typeof this.catsSelected[0] != 'undefined'
        )
          this.catsSelected = this.capitalizeArrayPipe.transform(
            this.catsSelected
          );
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
      this.pXcService.getPxC([this.filters.category]).subscribe((items) => {
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
    let options = this.catsSelected.map((i: Category) => i.title?.toLowerCase());
    //! Arreglar cuando no hay optiones muestre todos con el ?filters=all
    this.router.navigateByUrl(`shop/${btoa(`filters?category=${options.length > 0 ? options : 'all'}`)}`);

    if (options.length == 0) {
      this.productService.getProducts().subscribe((items) => {
        this.products.emit(items);
      });
    }

    if (this.catsSelected.length > 0) {
      this.pXcService.getPxC(options).subscribe((i) => {
        this.products.emit(i);
      });
    }
  };

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
}
