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
var AppSignUpComponent = /** @class */ (function () {
    function AppSignUpComponent(accountService, router) {
        this.accountService = accountService;
        this.router = router;
        this.message = "";
        this.isLoading = false;
    }
    AppSignUpComponent.prototype.trySignUp = function (login, pass) {
        var _this = this;
        this.isLoading = true;
        this.currUserUpdateSub = this.accountService.currentUser$.subscribe(function (result) {
            if (!result.message) {
                _this.router.navigateByUrl('/');
            }
            _this.isLoading = false;
        });
        this.signUpError = this.accountService.error$.subscribe(function (message) {
            _this.message = message;
            _this.isLoading = false;
        });
        this.accountService.trySignUp(login, pass);
    };
    AppSignUpComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './app.signup.component.html',
            styleUrls: ['./app.signup.component.min.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, router_1.Router])
    ], AppSignUpComponent);
    return AppSignUpComponent;
}());
exports.AppSignUpComponent = AppSignUpComponent;
//# sourceMappingURL=app.signup.component.js.map