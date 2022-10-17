import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models';
import { CategoryService, ProductService, ProductsXCategoryService } from 'src/app/core/services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters!: any
  @Output() products = new EventEmitter<Product[]>();

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private pXc: ProductsXCategoryService,
  ) {

  }

  getProducts(e: any) {
    this.changeCategoryUrl(e.target?.value || "allProducts")
    this.aRouter.queryParams.subscribe(res => {
      this.filters = res
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

  changeCategoryUrl = (category: String) => {
    this.router.navigateByUrl(`shop/filters?category=${category}`)
  }

  ngOnInit(): void {
    this.getProducts("allProducts")
  }

}
