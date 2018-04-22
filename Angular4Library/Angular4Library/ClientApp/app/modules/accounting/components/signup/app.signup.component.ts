import { Component } from '@angular/core';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component(
{
    selector: 'signup',
    templateUrl: './app.signup.component.html',
    styleUrls: ['./app.signup.component.min.css']
})
export class AppSignUpComponent {

    currUserUpdateSub: Subscription;
    signUpError: Subscription;

    message: string;
    isLoading: boolean;

    constructor(private accountService: AccountService, private router: Router) {
        this.message = "";
        this.isLoading = false;
    }

    trySignUp(login: string, pass: string) {
        this.isLoading = true;
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(result => {
            if (!result.message) {
                this.router.navigateByUrl('/');
            }
            this.isLoading = false;
        });
        this.signUpError = this.accountService.error$.subscribe(message => {
            this.message = message;
            this.isLoading = false;
        });

        this.accountService.trySignUp(login, pass);
    }
}