import { Component} from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd} from '@angular/router';
import {AccountService} from "../../../accounting/account.service";
import 'rxjs/add/operator/filter';

@Component({
	selector:'app-nav',
	templateUrl: './app.nav.component.html',
	styleUrls: ['./app.nav.component.min.css'],
	providers: [CookieService]
})
export class AppNavComponent {
    currentUser: any;

    currUserUpdateSub: Subscription;
    sections = [{ name: "Books", route: "/books" },
                { name: "Journals", route: "/journals" },
                { name: "Newspapers", route: "/newspapers" },
                { name: "Basket", route: "/basket" },
                { name: "Sign in", route: "/signin" },
                { name: "Sign up", route: "/signup" }
    ];
    currentSection: any = this.sections[0];

    constructor(private cookieService: CookieService, private accountService: AccountService, private router: Router) {
        this.currentUser = {};    
        
    }

    ngOnInit() {               
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(user => {            
            this.initCurrentUser(user);            
            this.currentUser = user;            
        });
        this.accountService.loadCurrentUser();

        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {                
                this.sections.forEach((section) => {
                    if (section.route === event.urlAfterRedirects) {
                        this.currentSection = section;
                    }
                });
            });
        
    }

    signOut() {
        this.accountService.trySignOut();
        this.cookieService.delete("AT");
    }

    setCurrentSection(newSection: any) {
        this.currentSection = newSection;
        this.router.navigateByUrl(newSection.route);
    }

    private initCurrentUser(account: any) {        
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