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
var AppBooksPutComponent = /** @class */ (function () {
    function AppBooksPutComponent(booksService, router, route) {
        this.booksService = booksService;
        this.router = router;
        this.route = route;
        this.photoUploaded = true;
        this.currentPhotoPath = "/Upload/Images/no-photo-e.png";
        this.authors = [];
        this.dropdownConfig = {
            displayKey: "fullName",
            search: true,
        };
        this.currentBook = {
            Id: -1,
            Title: '',
            Authors: [],
            Genre: '',
            Year: '',
            Pages: '',
            Amount: '',
            Price: '',
            PhotoPath: '',
        };
    }
    AppBooksPutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idSubscriber = this.route.params.subscribe(function (params) {
            _this.idForEdit = +params['id'];
            if (_this.idForEdit && _this.idForEdit > -1) {
                _this.isEdit = true;
                _this.booksService.tryGetBook(_this.idForEdit).subscribe(function (book) {
                    _this.currentBook = book;
                    _this.currentPhotoPath = book.PhotoPath;
                });
            }
            else {
                _this.isEdit = false;
            }
            _this.booksService.tryGetAuthors(_this.idForEdit).subscribe(function (authors) { _this.authors = authors; console.log(_this.authors); });
        });
    };
    AppBooksPutComponent.prototype.uploadPhotoChange = function (files) {
        var _this = this;
        this.photoUploaded = false;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("image", files[0]);
            this.booksService.uploadPhoto(formData).subscribe(function (res) {
                _this.currentPhotoPath = res.Path;
                _this.currentBook.PhotoPath = res.Path;
                _this.photoUploaded = true;
            });
        }
        else {
            this.photoUploaded = true;
        }
    };
    AppBooksPutComponent.prototype.tryAddBook = function () {
        var _this = this;
        if (this.currentBook.Authors.length > 0) {
            this.booksService.tryAddBook(this.currentBook).subscribe(function (resp) {
                if (resp.ok) {
                    _this.router.navigateByUrl('/books');
                }
            });
        }
    };
    AppBooksPutComponent.prototype.tryEditBook = function () {
        var _this = this;
        if (this.currentBook.Authors.length > 0) {
            this.booksService.tryEditBook(this.currentBook).subscribe(function (resp) {
                if (resp.ok) {
                    _this.router.navigateByUrl('/books');
                }
            });
        }
    };
    AppBooksPutComponent = __decorate([
        core_1.Component({
            selector: 'app-books-put',
            templateUrl: './app.books.put.component.html',
            styleUrls: ['./app.books.put.component.min.css']
        }),
        __metadata("design:paramtypes", [books_service_1.BooksService, router_1.Router, router_1.ActivatedRoute])
    ], AppBooksPutComponent);
    return AppBooksPutComponent;
}());
exports.AppBooksPutComponent = AppBooksPutComponent;
//# sourceMappingURL=app.books.put.component.js.map