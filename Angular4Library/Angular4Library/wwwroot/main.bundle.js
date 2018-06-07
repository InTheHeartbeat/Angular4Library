webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/modules/accounting/sign.module": [
		"../../../../../src/app/modules/accounting/sign.module.ts",
		"sign.module"
	],
	"app/modules/basket/basket.module": [
		"../../../../../src/app/modules/basket/basket.module.ts",
		"basket.module"
	],
	"app/modules/books/books.module": [
		"../../../../../src/app/modules/books/books.module.ts",
		"books.module"
	],
	"app/modules/journals/journals.module": [
		"../../../../../src/app/modules/journals/journals.module.ts",
		"journals.module"
	],
	"app/modules/newspapers/newspapers.module": [
		"../../../../../src/app/modules/newspapers/newspapers.module.ts",
		"newspapers.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_navigation_components_nav_app_nav_component__ = __webpack_require__("../../../../../src/app/modules/navigation/components/nav/app.nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__modules_navigation_components_nav_app_nav_component__["a" /* AppNavComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["d" /* RouterModule */].forRoot([
                { path: '', redirectTo: 'books', pathMatch: 'full' },
                { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },
                { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },
                { path: 'books', loadChildren: 'app/modules/books/books.module#BooksModule' },
                { path: 'journals', loadChildren: 'app/modules/journals/journals.module#JournalsModule' },
                { path: 'newspapers', loadChildren: 'app/modules/newspapers/newspapers.module#NewspapersModule' },
                { path: 'basket', loadChildren: 'app/modules/basket/basket.module#BasketModule' }
            ])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/navigation/components/nav/app.nav.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"header-bar\">\n    <div class=\"header-title\">       \n    </div>\n    <div class=\"header-bar-menu-container\">\n        <ul id=\"header-bar-menu\">\n            <li [hidden]=\"!currentUser.isVisitor\">\n                <span>\n                    <a [routerLink]=\"['/sign/signin']\">Sign in</a>\n                </span>\n            </li>\n            <li [hidden]=\"currentUser.isVisitor\">\n                <span>Hello, {{currentUser.login}}!</span>\n            </li>\n        </ul>\n    </div>\n</header>\n\n<div class=\"sidebar\">\n    <div class=\"sidebar-header\">\n        <span class=\"company\">company </span>       \n    </div>\n    <div class=\"sidebar-subheader\">\n        <span class=\"title\">Library</span>\n    </div>\n    <div class=\"sidebar-items-container\">\n        <h4 class=\"label\">Main</h4>\n        <ul class=\"section-selector\">            \n            <li [ngClass]=\"{'active': currentSection == sections[0]}\" (click)=\"setCurrentSection(sections[0])\"><span>{{sections[0].name}}</span></li>            \n            <li [ngClass]=\"{'active': currentSection == sections[1]}\" (click)=\"setCurrentSection(sections[1])\"><span>{{sections[1].name}}</span></li>            \n            <li [ngClass]=\"{'active': currentSection == sections[2]}\" (click)=\"setCurrentSection(sections[2])\"><span>{{sections[2].name}}</span></li>            \n        </ul>\n        <h4 class=\"label\">Sell</h4>\n        <ul class=\"section-selector\">\n            <li [ngClass]=\"{'active': currentSection == sections[3]}\" (click)=\"setCurrentSection(sections[3])\"><span>{{sections[3].name}}</span></li>            \n            \n        </ul>\n        <h4 class=\"label\">Account</h4>\n        <ul class=\"section-selector\">            \n            <li [hidden]=\"!currentUser.isVisitor\" [ngClass]=\"{'active': currentSection == sections[4]}\" (click)=\"setCurrentSection(sections[4])\"><span>{{sections[4].name}}</span></li>\n            <li [hidden]=\"!currentUser.isVisitor\" [ngClass]=\"{'active': currentSection == sections[5]}\" (click)=\"setCurrentSection(sections[5])\"><span>{{sections[5].name}}</span></li>            \n\n            <li [hidden]=\"currentUser.isVisitor\"><a (click)=\"signOut()\" >Sign out</a></li>\n        </ul>\n\n        <h5>All rights reserved. <br>Tyner©2017</h5>\n    </div>\n</div>\n\n<div class=\"body-content\"><router-outlet></router-outlet></div> \n"

/***/ }),

/***/ "../../../../../src/app/modules/navigation/components/nav/app.nav.component.min.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/navigation/components/nav/app.nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_account_service__ = __webpack_require__("../../../../../src/app/shared/services/account.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppNavComponent = (function () {
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
        this.router.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]; })
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
    return AppNavComponent;
}());
AppNavComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-nav',
        template: __webpack_require__("../../../../../src/app/modules/navigation/components/nav/app.nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/navigation/components/nav/app.nav.component.min.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1_ngx_cookie_service__["a" /* CookieService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_cookie_service__["a" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_cookie_service__["a" /* CookieService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_account_service__["a" /* AccountService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _c || Object])
], AppNavComponent);

var _a, _b, _c;
//# sourceMappingURL=app.nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/account.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AccountService = (function () {
    function AccountService(http, location) {
        var _this = this;
        this.http = http;
        this.location = location;
        this.currentUserSource = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.errorSource = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
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
    return AccountService;
}());
AccountService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], AccountService);

var _a, _b;
//# sourceMappingURL=account.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/books.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BooksService = (function () {
    function BooksService(http, location) {
        this.http = http;
        this.location = location;
    }
    BooksService.prototype.tryGetBook = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Books/GetBook/' + id)).map(function (book) { return book.json(); });
    };
    BooksService.prototype.tryGetAuthors = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Authors/GetAuthors/' + id)).map(function (author) { return author.json(); });
    };
    BooksService.prototype.tryGetBooks = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Books/GetBooks')).map(function (books) { return books.json(); });
    };
    BooksService.prototype.tryAddBook = function (book) {
        return this.http.post(this.location.prepareExternalUrl('api/Books/AddBook'), book);
    };
    BooksService.prototype.tryRemoveBook = function (id) {
        return this.http.delete(this.location.prepareExternalUrl('api/Books/DeleteBook/' + id));
    };
    BooksService.prototype.tryEditBook = function (book) {
        return this.http.put(this.location.prepareExternalUrl('api/Books/EditBook'), book);
    };
    BooksService.prototype.uploadPhoto = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Books/UploadPhoto"), formData).map(function (resp) { return resp.json(); });
    };
    return BooksService;
}());
BooksService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], BooksService);

var _a, _b;
//# sourceMappingURL=books.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/export.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__("../../../../file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExportService = (function () {
    function ExportService(http, location) {
        this.http = http;
        this.location = location;
    }
    ExportService.prototype.tryExportItems = function (type, ids, isXml) {
        return this.http.post(this.location.prepareExternalUrl("api/Export/TryExport"), { type: type, idsArray: ids, isXml: isXml }, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* ResponseContentType */].Blob }).subscribe(function (data) {
            var blob = new Blob([data._body], { type: data.headers.get('Content-Type') });
            var contentDispositionHeader = data.headers.get('Content-Disposition');
            if (contentDispositionHeader !== null) {
                var contentDispositionHeaderResult = contentDispositionHeader.split(';')[1].trim().split('=')[1];
                var contentDispositionFileName = contentDispositionHeaderResult.replace(/"/g, '');
                __WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"](blob, contentDispositionFileName);
            }
        });
    };
    return ExportService;
}());
ExportService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], ExportService);

var _a, _b;
//# sourceMappingURL=export.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/import.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImportService = (function () {
    function ImportService(http, location) {
        this.http = http;
        this.location = location;
    }
    ImportService.prototype.tryImport = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Import/TryImport"), formData);
    };
    return ImportService;
}());
ImportService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], ImportService);

var _a, _b;
//# sourceMappingURL=import.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/journals.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JournalsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JournalsService = (function () {
    function JournalsService(http, location) {
        this.http = http;
        this.location = location;
    }
    JournalsService.prototype.tryGetJournal = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournal/' + id)).map(function (journal) { return journal.json(); });
    };
    JournalsService.prototype.tryGetJournals = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournals')).map(function (journals) { return journals.json(); });
    };
    JournalsService.prototype.tryAddJournal = function (journal) {
        return this.http.post(this.location.prepareExternalUrl('api/Journals/AddJournal'), journal);
    };
    JournalsService.prototype.tryRemoveJournal = function (id) {
        return this.http.delete(this.location.prepareExternalUrl('api/Journals/DeleteJournal/' + id));
    };
    JournalsService.prototype.tryEditJournal = function (journal) {
        return this.http.put(this.location.prepareExternalUrl('api/Journals/EditJournal'), journal);
    };
    JournalsService.prototype.uploadPhoto = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Journals/UploadPhoto"), formData).map(function (resp) { return resp.json(); });
    };
    return JournalsService;
}());
JournalsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], JournalsService);

var _a, _b;
//# sourceMappingURL=journals.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/newspapers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewspapersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewspapersService = (function () {
    function NewspapersService(http, location) {
        this.http = http;
        this.location = location;
    }
    NewspapersService.prototype.tryGetNewspaper = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspaper/' + id)).map(function (newspaper) { return newspaper.json(); });
    };
    NewspapersService.prototype.tryGetNewspapers = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspapers')).map(function (newspapers) { return newspapers.json(); });
    };
    NewspapersService.prototype.tryAddNewspaper = function (newspaper) {
        return this.http.post(this.location.prepareExternalUrl('api/Newspapers/AddNewspaper'), newspaper);
    };
    NewspapersService.prototype.tryRemoveNewspaper = function (id) {
        return this.http.delete(this.location.prepareExternalUrl('api/Newspapers/DeleteNewspaper/' + id));
    };
    NewspapersService.prototype.tryEditNewspaper = function (newspaper) {
        return this.http.put(this.location.prepareExternalUrl('api/Newspapers/EditNewspaper'), newspaper);
    };
    NewspapersService.prototype.uploadPhoto = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Newspapers/UploadPhoto"), formData).map(function (resp) { return resp.json(); });
    };
    return NewspapersService;
}());
NewspapersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], NewspapersService);

var _a, _b;
//# sourceMappingURL=newspapers.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/sell.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SellService = (function () {
    function SellService(http, location) {
        this.http = http;
        this.location = location;
    }
    SellService.prototype.tryAddToBasket = function (productId, productType) {
        return this.http.post(this.location.prepareExternalUrl('api/Sell/AddToBasket'), { ProductId: productId, ProductType: productType });
    };
    SellService.prototype.tryRemoveFromBasket = function (recordId) {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/RemoveFromBasket/' + recordId));
    };
    SellService.prototype.tryAcceptOrder = function (orderId) {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/AcceptOrder/' + orderId));
    };
    SellService.prototype.tryGetBasket = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Sell/GetBasket')).map(function (basket) { return basket.json(); });
    };
    return SellService;
}());
SellService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _b || Object])
], SellService);

var _a, _b;
//# sourceMappingURL=sell.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_account_service__ = __webpack_require__("../../../../../src/app/shared/services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_journals_service__ = __webpack_require__("../../../../../src/app/shared/services/journals.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_sell_service__ = __webpack_require__("../../../../../src/app/shared/services/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_books_service__ = __webpack_require__("../../../../../src/app/shared/services/books.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_import_service__ = __webpack_require__("../../../../../src/app/shared/services/import.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_newspapers_service__ = __webpack_require__("../../../../../src/app/shared/services/newspapers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_export_service__ = __webpack_require__("../../../../../src/app/shared/services/export.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_account_service__["a" /* AccountService */], __WEBPACK_IMPORTED_MODULE_4__services_books_service__["a" /* BooksService */], __WEBPACK_IMPORTED_MODULE_2__services_journals_service__["a" /* JournalsService */], __WEBPACK_IMPORTED_MODULE_6__services_newspapers_service__["a" /* NewspapersService */], __WEBPACK_IMPORTED_MODULE_3__services_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_7__services_export_service__["a" /* ExportService */], __WEBPACK_IMPORTED_MODULE_5__services_import_service__["a" /* ImportService */]],
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map