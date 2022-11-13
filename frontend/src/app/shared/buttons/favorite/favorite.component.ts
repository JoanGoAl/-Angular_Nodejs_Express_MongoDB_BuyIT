import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models';
import { ProductService, UserService } from 'src/app/core/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() product!: Product;
  isLiked: boolean = false

  constructor (
    private productService: ProductService,
    private userService: UserService,
    private router: Router
    ) { }

  toggleLike() {
    console.log();

    if (typeof this.userService.getCurrentUser().token == "undefined") {
      this.router.navigateByUrl('/auth/login')
    } else {
      this.productService.toggleLike(this.product.slug).subscribe((res) => this.isLiked = res)
    }
  }

  ngOnInit(): void {
    this.isLiked =  this.product?.liked || false
  }

}
