"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
var account_service_1 = require("../../../../shared/services/account.service");
var AppNavComponent = /** @class */ (function () {
    function AppNavComponent(cookieService, accountService, router) {
        this.cookieService = cookieService;
        this.accountService = accountService;
        this.router = router;
        this.sections = [{ Name: "Books", Route: "/books" },
            { Name: "Journals", Route: "/journals" },
            { Name: "Newspapers", Route: "/newspapers" },
            { Name: "Basket", Route: "/basket" },
            { Name: "Sign in", Route: "/sign/signin" },
            { Name: "Sign up", Route: "/sign/signup" }
        ];
        this.currentSection = this.sections[0];
    }
    AppNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(function (user) {
            _this.initCurrentUser(user);
            _this.currentUser = user;
        });
        this.accountService.loadCurrentUser();
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            _this.sections.forEach(function (section) {
                if (section.Route === event.urlAfterRedirects) {
                    _this.currentSection = section;
                }
            });
        });
    };
    AppNavComponent.prototype.signOut = function () {
        this.accountService.trySignOut();
        this.cookieService.delete("AT");
    };
    AppNavComponent.prototype.setCurrentSection = function (newSection) {
        this.currentSection = newSection;
        this.router.navigateByUrl(newSection.Route);
    };
    AppNavComponent.prototype.initCurrentUser = function (account) {
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
    };
    AppNavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './app.nav.component.html',
            styleUrls: ['./app.nav.component.min.css'],
            providers: [ngx_cookie_service_1.CookieService]
        }),
        __metadata("design:paramtypes", [ngx_cookie_service_1.CookieService, account_service_1.AccountService, router_1.Router])
    ], AppNavComponent);
    return AppNavComponent;
}());
exports.AppNavComponent = AppNavComponent;
//# sourceMappingURL=app.nav.component.js.map