import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  productId: any
  product!: Product;

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService

  ) {
    this.productId = this.aRouter.snapshot.paramMap.get('id')

    productService.getProductById(this.productId).subscribe(res => {
      this.product = res[0]

      console.table(this.product);

    })

  }

  ngOnInit(): void {
  }

}
