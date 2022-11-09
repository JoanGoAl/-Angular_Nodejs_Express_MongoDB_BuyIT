import { ProfileService } from './../../core/services/profile.service';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Profile, Comment, User } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';
import { CommentService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsProductComponent implements OnInit {
  userProfile!: Profile;
  product!: Product;
  currentUser!: User;
  comments!: Comment[];

  productId: any;
  user = {} as { name: string; n_products: number };
  clicked: boolean = true;
  hide: boolean = false;
  commentBody!: string;

  constructor(
    private aRouter: ActivatedRoute,
    private productService: ProductService,
    private profileService: ProfileService,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  getProduct() {
    this.productId = this.aRouter.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId).subscribe((res) => {
      this.commentService
        .getProductComments(res._id as string)
        .subscribe((e) => {
          this.comments = e;
        });
      this.product = res;
    });
  }

  getUser() {
    setTimeout(() => {
      this.profileService
        .getProfileById(this.product.owner as string)
        .subscribe((res) => (this.user.name = res.username));
    }, 100);
  }

  getUser_NProducts() {
    this.profileService
      .getNProducts('gfmois')
      .subscribe((e) => (this.user.n_products = parseInt(e)));
  }

  getUserInfo() {
    this.profileService
      .getProfile(this.userService.getCurrentUser().username)
      .subscribe((e) => (this.userProfile = e.profile));
  }

  changeToAdd() {
    this.hide = true;
    this.clicked = !this.clicked;
  }

  setComment() {
    this.commentService
      .setProductComment({
        body: this.commentBody,
        product_id: this.product._id,
      })
      .subscribe((e) => {
        this.clicked = !this.clicked
        this.hide = !this.hide
        this.comments.push({
          ...e,
          username: this.currentUser.username,
        });

        this.commentBody = ''
      });
  }

  ngOnInit(): void {
    this.getProduct();
    this.getUser_NProducts();
    this.getUser();
    this.getUserInfo();

    this.currentUser = this.userService.getCurrentUser();
  }
}
