import { Category } from './../core/models/Category.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../core/services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() { }
}
