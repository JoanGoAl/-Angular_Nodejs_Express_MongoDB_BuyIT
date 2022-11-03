import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() product!: Product;

  constructor (private productService: ProductService) { }

  likeDislike() {
    this.productService.setLikeDislike()
  }

  ngOnInit(): void { }

}
