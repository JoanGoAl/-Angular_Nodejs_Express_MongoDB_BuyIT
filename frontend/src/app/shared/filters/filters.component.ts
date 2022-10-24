import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category, Product } from 'src/app/core/models';
import { CategoryService, ProductService, ProductsXCategoryService } from 'src/app/core/services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters!: { category: String };
  @Output() products = new EventEmitter<Product[]>();
  categories!: Category[];

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private pXc: ProductsXCategoryService,
  ) {

  }

  getProducts(e: any) {
    this.changeCategoryUrl(e.target?.value || e)
    this.aRouter.queryParams.subscribe(res => {
      this.filters = res as { category: String }
    })

    if (this.filters.category === 'allProducts') {
      this.productService.getProducts().subscribe(res => {
        this.products.emit(res)
      })
    } else {
      this.pXc.getPxC(this.filters.category).subscribe(res => {
        this.products.emit(res)
      })

    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  changeCategoryUrl = (category: String) => {
    this.router.navigateByUrl(`shop/filters?category=${category}`)
  }

  ngOnInit(): void {
    this.getProducts("allProducts")
    this.getCategories()
  }

}
