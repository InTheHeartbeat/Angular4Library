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
    sections = [{ name: "Books", route: "/books" }, { name: "Journals", route: "/journals" },
        { name: "Newspapers", route: "newspapers" }
    ];
    currentSection: any = this.sections[0];

    constructor(private cookieService: CookieService, private accountService: AccountService) {
        this.currentUser = {};          
    }

    ngOnInit() {               
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(user => {            
            this.initCurrentUser(user);            
            this.currentUser = user;
            console.log("1");
        });
        this.accountService.loadCurrentUser(); 
    }

    signOut() {
        this.accountService.trySignOut();
        this.cookieService.delete("AT");
    }

    setCurrentSection(newSection: any) {
        this.currentSection = newSection;
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