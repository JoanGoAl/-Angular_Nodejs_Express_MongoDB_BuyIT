import { ProfileService } from './../../core/services/profile.service';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Profile } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsProductComponent implements OnInit {
  productId: any;
  product!: Product;
  userProfile!: Profile
  user = {} as { name: string; n_products: number };

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  getProduct() {
    this.productId = this.aRouter.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId).subscribe((res) => {
      this.product = res[0];
    });
  }

  getUser_NProducts() {
    this.profileService.getNProducts('gfmois').subscribe((e) => this.user.n_products = parseInt(e))
  }

  getUserInfo() {
    this.profileService.getProfile(this.userService.getCurrentUser().username).subscribe((e) => this.userProfile = e.profile)
  }

  ngOnInit(): void {
    this.getProduct();
    this.getUser_NProducts();

    this.getUserInfo()
  }
}
