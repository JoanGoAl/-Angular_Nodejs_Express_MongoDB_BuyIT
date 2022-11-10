import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../core';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':user',
        component: ProfileComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
