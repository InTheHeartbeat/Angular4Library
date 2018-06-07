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
var router_1 = require("@angular/router");
var account_service_1 = require("../../../../shared/services/account.service");
var AppSignInComponent = /** @class */ (function () {
    function AppSignInComponent(accountService, router) {
        this.accountService = accountService;
        this.router = router;
        this.message = "";
        this.isLoading = false;
    }
    AppSignInComponent.prototype.trySignIn = function (login, pass) {
        var _this = this;
        this.isLoading = true;
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(function (result) {
            if (!result.message) {
                _this.router.navigateByUrl('/');
            }
            _this.isLoading = false;
        });
        this.signInError = this.accountService.error$.subscribe(function (message) {
            _this.message = message;
            _this.isLoading = false;
        });
        this.accountService.trySignIn(login, pass);
    };
    AppSignInComponent.prototype.showSignUpDialog = function () {
        this.router.navigateByUrl('/sign/signup');
    };
    AppSignInComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './app.signin.component.html',
            styleUrls: ['./app.signin.component.min.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, router_1.Router])
    ], AppSignInComponent);
    return AppSignInComponent;
}());
exports.AppSignInComponent = AppSignInComponent;
//# sourceMappingURL=app.signIn.component.js.map