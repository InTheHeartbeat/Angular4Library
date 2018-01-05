import { Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import { CookieService } from "ngx-cookie-service";
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector:'app-nav',
	templateUrl: './app.nav.component.html',
	styleUrls: ['./app.nav.component.min.css'],
	providers: [CookieService]
})
export class AppNavComponent {
    currentUser: any;

    currUserUpdateSub: Subscription;

    constructor(private cookieService: CookieService, private accountService: AccountService) {
        this.currentUser = {};          
    }

    ngOnInit() {
        this.accountService.loadCurrentUser();        
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(user => {            
            this.initCurrentUser(user);            
            this.currentUser = user;
            console.log(this.accountService.currentUser$);
        });
    }

    signOut() {
        this.accountService.trySignOut();
        this.cookieService.delete("AT");
    }

    private initCurrentUser(account: any) {
        console.log(account);
        if (account.isVisitor) {
            if (this.cookieService.check("AT")) {
                this.cookieService.delete("AT");
            }
            this.cookieService.set("VT", account.token);
        }
        if (!account.isVisitor) {
            if (this.cookieService.check("VT")) {
                this.cookieService.delete("VT");
            }
            this.cookieService.set("AT", account.token);
        }
    }
}