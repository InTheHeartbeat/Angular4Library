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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
var AccountService = /** @class */ (function () {
    function AccountService(http, location) {
        var _this = this;
        this.http = http;
        this.location = location;
        this.currentUserSource = new Subject_1.Subject();
        this.errorSource = new Subject_1.Subject();
        this.currentUser$ = this.currentUserSource.asObservable();
        this.error$ = this.errorSource.asObservable();
        this.currentUser$.subscribe(function (user) {
            if (!user.IsVisitor) {
                _this.currentUser = user;
            }
        });
    }
    AccountService.prototype.postTrySignIn = function (login, pass) {
        return this.http.post(this.location.prepareExternalUrl('api/Account/TrySignIn'), { Login: login, Password: pass })
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.postTrySignUp = function (login, pass) {
        return this.http
            .post(this.location.prepareExternalUrl('api/Account/TrySignUp'), { Login: login, Password: pass })
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.postSignOut = function () {
        return this.http.post(this.location.prepareExternalUrl('api/Account/SignOut'), { Token: this.currentUser.Token }).map(function (response) { return response.json(); });
    };
    AccountService.prototype.getCurrentUser = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Account/GetCurrentUser'))
            .map(function (response) { return response.json(); });
    };
    AccountService.prototype.trySignIn = function (login, pass) {
        var _this = this;
        this.postTrySignIn(login, pass).subscribe(function (result) {
            if (result && result.token) {
                _this.currentUserSource.next(result);
            }
            if (result && !result.token && result.message) {
                _this.errorSource.next(result.message);
            }
        });
    };
    AccountService.prototype.trySignUp = function (login, pass) {
        var _this = this;
        this.postTrySignUp(login, pass).subscribe(function (result) {
            if (result && result.token) {
                _this.currentUserSource.next(result);
            }
            if (result && !result.token && result.message) {
                _this.errorSource.next(result.message);
            }
        });
    };
    AccountService.prototype.trySignOut = function () {
        var _this = this;
        if (this.currentUser) {
            this.postSignOut().subscribe(function (result) {
                if (result && result.token) {
                    _this.currentUserSource.next(result);
                }
            });
        }
    };
    AccountService.prototype.loadCurrentUser = function () {
        var _this = this;
        this.getCurrentUser().subscribe(function (user) {
            _this.currentUserSource.next(user);
        });
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, common_1.Location])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map