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
  @Output() n_pages = new EventEmitter<Number>();

  catsSelected: Array<any> = [];
  conditionSelected: Array<any> = [];
  filters: Filters = { category: 'all', page: 1, condition: 'all' };
  categories: Category[] = [];
  conditions: String[] = ['Perfecto', 'Semi-Perfecto', 'Bastante Usado'];
  model: any[] = [];

  count: number = 0;
  offset: number = 6;

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
            .flat()
            .map((e) => e.split('='))
        );

        console.log(this.filters);

        this.count = (this.filters.page - 1) * this.offset;
      } else {
        this.filters['category'] = 'all';
        this.filters.page = 1;
        this.filters.condition = 'all';
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
        res.map((e) => {
          this.catsSelected.push(e.value.length > 0 ? e.value[0] : []);
        });

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
      this.productService
        .getProducts(this.count, this.offset)
        .subscribe((items) => {
          this.router.navigateByUrl(
            `shop/${btoa(`filters?category=all&page=${this.filters.page}`)}`
          );

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

  getFiltersOptions() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  changeCategoryUrl = () => {
    let options = this.catsSelected
      .map((i: Category) => i.title?.toLowerCase())
      .filter((i) => i != undefined);

    options = options.length > 0 ? options : ['all'];

    this.router.navigateByUrl(
      `shop/${btoa(
        `filters?category=${options}&page=${this.filters.page}&condition=${
          this.conditionSelected.length == 0 ? 'all' : this.conditionSelected
        }`
      )}`
    );

    if (options.includes('all')) {
      this.productService
        .getProducts(this.count, this.offset)
        .subscribe((items) => {
          let prd: any[] = [];

          if (this.conditionSelected.length != 0) {
            this.conditionSelected.map((cond) => {
              prd.push(items.filter((i) => i.condition == cond));
            });
          }

          prd = prd.length != 0 ? prd : items;

          this.products.emit(prd.flat());
        });
    }

    if (!options.includes('all')) {
      this.pXcService.getPxC(options).subscribe((items) => {
        let prd: any[] = [];

        if (this.conditionSelected.length != 0) {
          this.conditionSelected.map((cond) => {
            prd.push(items.filter((i) => i.condition == cond));
          });
        }

        prd = prd.length != 0 ? prd : items;

        this.products.emit(prd.flat());
      });
    }
  };

  ngOnInit(): void {
    this.getProducts();
    this.getFiltersOptions();

    this.productService.getNpages().subscribe((e) => {
      this.n_pages.emit(e);
    });
  }
}
