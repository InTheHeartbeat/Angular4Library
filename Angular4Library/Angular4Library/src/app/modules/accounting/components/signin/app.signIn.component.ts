import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
	selector:'app-signin',
	templateUrl: './app.signin.component.html',
	styleUrls: ['./app.signin.component.min.css']
})
export class AppSignInComponent {

    currUserUpdateSub: Subscription;
    signInError: Subscription;

    message: string;
    isLoading :boolean;

	constructor(private accountService: AccountService, private router:Router) {        
        this.message = "";
	    this.isLoading = false;
	}

    trySignIn(login: string, pass: string) {
        this.isLoading = true;
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(result => {            
            if (!result.message) {                
                this.router.navigateByUrl('/');
            }            
            this.isLoading = false;
        });
        this.signInError = this.accountService.error$.subscribe(message => {
            this.message = message;
            this.isLoading = false;
        });

	    this.accountService.trySignIn(login, pass);
    }

    showSignUpDialog() {
        this.router.navigateByUrl('/sign/signup');
    }
}
