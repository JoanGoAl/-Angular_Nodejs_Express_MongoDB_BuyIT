import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/core/models';
import { CategoryService, ProductsXCategoryService, ProductService } from 'src/app/core/services';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  filters?: any
  products?: Product[]

  allCategories?: Category[]

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private pXc: ProductsXCategoryService,
    private router: Router
  ) {
    this.aRouter.queryParams.subscribe(res => {
      this.filters = res
    })

    // this.filters.category = this.aRouter.snapshot.queryParamMap.get('category') ? this.aRouter.snapshot.queryParamMap.get('category') : 'allProducts'; //obtiene la 'id' del link
    // if (this.filters.category === 'allProducts') {
    //   productService.getProducts().subscribe(res => {
    //     this.products = res
    //   })
    // } else {
    //   pXc.getPxC(this.filters.category).subscribe(res => {
    //     this.products = res
    //   })
    // }



  }

  redirect(id?: String) {
    this.router.navigateByUrl(`shop/product/${id}`)
  }

  ngOnInit(): void {
  }

}
