import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsProductComponent implements OnInit {
  productId: any;
  product!: Product;

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService
  ) {}

  getProduct() {
    this.productId = this.aRouter.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId).subscribe((res) => {
      this.product = res[0];
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }
}
