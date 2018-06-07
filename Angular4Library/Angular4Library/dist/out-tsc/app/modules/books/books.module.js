"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_books_component_1 = require("./components/books/app.books.component");
var app_books_put_component_1 = require("./components/put/app.books.put.component");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ngx_select_dropdown_1 = require("ngx-select-dropdown");
exports.routes = [
    {
        path: '', component: app_books_component_1.AppBooksComponent
    },
    { path: 'put', component: app_books_put_component_1.AppBooksPutComponent },
    { path: 'put/:id', component: app_books_put_component_1.AppBooksPutComponent }
];
var BooksModule = /** @class */ (function () {
    function BooksModule() {
    }
    BooksModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_books_component_1.AppBooksComponent,
                app_books_put_component_1.AppBooksPutComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
                ngx_select_dropdown_1.SelectDropDownModule
            ],
        })
    ], BooksModule);
    return BooksModule;
}());
exports.BooksModule = BooksModule;
//# sourceMappingURL=books.module.js.map