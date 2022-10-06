import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';
import { ProductsXCategoryService } from 'src/app/core/services/productsXcategory.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  category: any;
  products?: Product[]

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private pXc: ProductsXCategoryService
  ) {
    this.category = this.aRouter.snapshot.paramMap.get('category') ? this.aRouter.snapshot.paramMap.get('category') : 'allProducts'; //obtiene la 'id' del link
    if (this.category === 'allProducts') {
      productService.getProducts().subscribe(res => {
        this.products = res
        console.log(this.products);
      })
    } else {
      pXc.getPxC(this.category).subscribe(res => {
        this.products = res
        console.log(this.products);
      })
    }
  }

  ngOnInit(): void {
    console.log(this.category);

  }

}
