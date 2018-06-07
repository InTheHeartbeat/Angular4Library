"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var app_nav_component_1 = require("./modules/navigation/components/nav/app.nav.component");
var shared_module_1 = require("./shared/shared.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                app_nav_component_1.AppNavComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: 'books', pathMatch: 'full' },
                    { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },
                    { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },
                    { path: 'books', loadChildren: 'app/modules/books/books.module#BooksModule' },
                    { path: 'journals', loadChildren: 'app/modules/journals/journals.module#JournalsModule' },
                    { path: 'newspapers', loadChildren: 'app/modules/newspapers/newspapers.module#NewspapersModule' },
                    { path: 'basket', loadChildren: 'app/modules/basket/basket.module#BasketModule' }
                ])
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map