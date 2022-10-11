import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { DetailsProductComponent } from '../shared/details-product/details-product.component';

const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: ':category', component: ShopComponent },
    { path: 'product/:id', component: DetailsProductComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
