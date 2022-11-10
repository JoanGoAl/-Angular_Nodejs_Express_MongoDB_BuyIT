import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared'
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../core';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    CommonModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfileModule { }
