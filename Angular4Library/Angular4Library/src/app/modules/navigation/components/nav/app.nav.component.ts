import { Component} from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
	selector:'app-nav',
	templateUrl: './app.nav.component.html',
    styleUrls: ['./app.nav.component.min.css'],
    providers: [CookieService]	
})
export class AppNavComponent {

    currentUser: User;

    currUserUpdateSub: Subscription;
    sections: NavSection[] =
        [{ Name: "Books", Route: "/books" },
         { Name: "Journals", Route: "/journals" },
         { Name: "Newspapers", Route: "/newspapers" },
         { Name: "Basket", Route: "/basket" },
         { Name: "Sign in", Route: "/sign/signin" },
         { Name: "Sign up", Route: "/sign/signup" }
        ];

    currentSection: NavSection = this.sections[0];

    constructor(private cookieService: CookieService, private accountService: AccountService, private router: Router) {                
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
                    if (section.Route === event.urlAfterRedirects) {
                        this.currentSection = section;
                    }
                });
            });
        
    }

    signOut(): void {
        this.accountService.trySignOut();
        this.cookieService.delete("AT");
    }

    setCurrentSection(newSection: NavSection): void {
        this.currentSection = newSection;
        this.router.navigateByUrl(newSection.Route);
    }

    private initCurrentUser(account: User): void {        
        if (account.IsVisitor) {
            if (this.cookieService.check("AT")) {
                this.cookieService.delete("AT");
            }
            this.cookieService.set("VT", account.Token);
        }
        if (!account.IsVisitor) {
            if (this.cookieService.check("VT")) {
                this.cookieService.delete("VT");
            }
            this.cookieService.set("AT", account.Token);
        }
    }
}
