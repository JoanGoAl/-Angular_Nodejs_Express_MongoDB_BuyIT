import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor (private productService: ProductService) { }

  likeDislike() {
    this.productService.setLikeDislike()
  }

  ngOnInit(): void { }

}
