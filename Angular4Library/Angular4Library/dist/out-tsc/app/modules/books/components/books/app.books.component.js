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
var books_service_1 = require("../../../../shared/services/books.service");
var account_service_1 = require("../../../../shared/services/account.service");
var import_service_1 = require("../../../../shared/services/import.service");
var export_service_1 = require("../../../../shared/services/export.service");
var sell_service_1 = require("../../../../shared/services/sell.service");
var AppBooksComponent = /** @class */ (function () {
    function AppBooksComponent(accountService, booksService, router, sellService, exportService, importService) {
        this.accountService = accountService;
        this.booksService = booksService;
        this.router = router;
        this.sellService = sellService;
        this.exportService = exportService;
        this.importService = importService;
        this.busyId = -1;
        this.exportMode = false;
        this.isXml = false;
    }
    AppBooksComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }
        this.accountService.currentUser$.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.booksService.tryGetBooks().subscribe(function (books) { return _this.books = books; });
    };
    AppBooksComponent.prototype.editBookForm = function (id) {
        this.router.navigate(['books/put', id]);
    };
    AppBooksComponent.prototype.tryRemoveBook = function (id) {
        var _this = this;
        this.busyId = id;
        this.booksService.tryRemoveBook(id).subscribe(function (resp) {
            if (resp.ok) {
                _this.books.forEach(function (value, index, array) {
                    if (value.id === id) {
                        _this.books.splice(index, 1);
                    }
                });
            }
        });
    };
    AppBooksComponent.prototype.addToBasket = function (id) {
        var _this = this;
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 1).subscribe(function (resp) {
            if (resp.ok) {
                _this.busyId = -1;
            }
        });
    };
    AppBooksComponent.prototype.switchExportMode = function () {
        this.exportMode = !this.exportMode;
    };
    AppBooksComponent.prototype.tryExportBooks = function () {
        var ids = [];
        this.books.forEach(function (value, index, array) {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(1, ids, this.isXml);
    };
    AppBooksComponent.prototype.importChange = function (files) {
        var _this = this;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(function (res) {
                _this.booksService.tryGetBooks().subscribe(function (books) { return _this.books = books; });
                alert("Import " + res.status);
            });
        }
    };
    AppBooksComponent.prototype.joinAuthors = function (authors) {
        return authors.map(function (author) { return author.fullName; }).join(", ");
    };
    AppBooksComponent = __decorate([
        core_1.Component({
            selector: 'app-books',
            templateUrl: './app.books.component.html',
            styleUrls: ['./app.books.component.scss']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, books_service_1.BooksService,
            router_1.Router, sell_service_1.SellService,
            export_service_1.ExportService, import_service_1.ImportService])
    ], AppBooksComponent);
    return AppBooksComponent;
}());
exports.AppBooksComponent = AppBooksComponent;
//# sourceMappingURL=app.books.component.js.map