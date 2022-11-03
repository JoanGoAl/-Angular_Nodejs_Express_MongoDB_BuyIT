import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core/services';
// import {NotificationService} from '../core/services';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit {
    authType: String = '/login';
    // title: String = '';
    isSubmitting = false;
    form: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        //   private cd: ChangeDetectorRef,
        //   // private notifyService: NotificationService
    ) {
        //   // use FormBuilder to create a form group
        this.form = this.fb.group({
            name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }

    ngOnInit() {
        // // Get the last piece of the URL (it's either 'login' or 'register')
        // this.authType = this.router.url;
        // // Set a title for the page accordingly
        // this.title = this.authType === '/login' ? 'Sign in' : 'Sign up';
        // // add form control for username if this is the register page
        // if (this.authType === '/register') {
        //   this.authForm.addControl('username', new FormControl());
        // }
        // this.cd.markForCheck();
    }

    onSubmit() {
        this.isSubmitting = true;
        const credentials = this.form.value;

        this.userService.attemptAuth(this.authType, credentials).subscribe(
            (data) => {
                console.log(data);

                // this.notifyService.showSuccess('Ya estás dentro', 'Bualabob');
                // this.router.navigateByUrl('/');
            },
            (err) => {
                // this.notifyService.showError(
                //   'Ha habido algún error en el formulario, compruebe que los datos estén corréctamente',
                //   'Bualabob'
                // );
                console.log(err);


                this.isSubmitting = false;
                // this.cd.markForCheck();
            }
        );
    }
}