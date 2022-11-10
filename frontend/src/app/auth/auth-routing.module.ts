import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { NoAuthGuard } from '../core/services';
import { LoginComponent } from './login.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: AuthComponent,
    //     // canActivate: [NoAuthGuard]
    // },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NoAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
