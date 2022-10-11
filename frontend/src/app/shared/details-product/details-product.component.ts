import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  productId: any

  constructor(
    private aRouter: ActivatedRoute
  ) {
    console.log(this.aRouter.snapshot.paramMap.get('id'));

    this.productId = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
  }

}
