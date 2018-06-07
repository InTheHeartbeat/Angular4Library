webpackJsonp(["newspapers.module"],{

/***/ "../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"nav-sector-controls\" [hidden]=\"!currentUser.isAdmin\">\n    <div class=\"raw-xml-switch\" [hidden]=\"!exportMode\">\n        <h4>Raw</h4>\n        <label class=\"checkbox-switch\">\n            <input type=\"checkbox\" [(ngModel)]=\"isXml\">\n            <span class=\"slider round\"></span>\n        </label>\n        <h4>Xml</h4>\n    </div>\n    <span href=\"#\" class=\"btn btn-icon\" id=\"btn-import-newspapers\" (click)=\"uploadFile.click()\">\n        <span class=\"icon ic-import\"></span>\n    </span>\n    <input type=\"file\" name=\"upload\" #uploadFile (change)=\"importChange(uploadFile.files)\" id=\"uploadFile\" style=\"display: none\" />\n    <span class=\"btn btn-icon\" href=\"#\">\n        <span class=\"icon ic-accept\" [hidden]=\"!exportMode\" (click)=\"tryExport()\"></span>\n        <span class=\"icon ic-export\" [hidden]=\"exportMode\" (click)=\"switchExportMode()\"></span>\n    </span>\n    <span class=\"btn btn-icon lowered\" [hidden]=\"!exportMode\">\n        <span class=\"icon ic-close\" (click)=\"switchExportMode()\"></span>\n    </span>\n    <a class=\"btn btn-icon\" [routerLink]=\"['/newspapers/put']\">\n        <span class=\"icon ic-add\"></span>\n    </a>\n</div>\n<div class=\"windows-container\">\n    <div class=\"windows-grid\">        \n        <div [ngClass]=\"{'disabled': busyId === newspaper.id}\" class=\"window window-hovered-shadow\" *ngFor=\"let newspaper of newspapers\">\n            <div class=\"window-header\">                    \n                <div class=\"window-header-icon\"><span class=\"icon ic-newspaper\"></span></div>\n                <div class=\"window-header-content\"><h4 class=\"entity\">{{newspaper.date}} - {{newspaper.title}}</h4></div>                    \n                <div class=\"window-header-control\" [hidden]=\"!currentUser.isAdmin\">\n                    <span class=\"btn btn-icon\" (click)=\"editNewspaperForm(newspaper.id)\">\n                        <span class=\"icon ic-edit\"></span>\n                    </span>                        \n                </div>\n                <div class=\"window-header-control\" [hidden]=\"!currentUser.isAdmin\">\n                    <span class=\"btn btn-icon\" (click)=\"tryRemoveNewspaper(newspaper.id)\">\n                        <span class=\"icon ic-remove\"></span>\n                    </span>\n                </div>\n                <div class=\"window-header-control\" [hidden]=\"!exportMode\">\n                    <input type=\"checkbox\" class=\"checkbox-default\" id=\"cb-sellected-{{newspaper.id}}\" [(ngModel)]=\"newspaper.selected\">\n                    <label for=\"cb-sellected-{{newspaper.id}}\" class=\"checkbox-default-label\"></label>\n                </div>\n            </div>\n            <div class=\"window-content entity-content\">                \n                <div class=\"entity-photo\" [ngStyle]=\"{ 'background-image': 'url(' + newspaper.photoPath + ')'}\">                    \n                </div>              \n                <table>  \n                    <tr>\n                        <th><span>Title:</span></th>\n                        <td colspan=\"2\"><span>{{newspaper.title}}</span></td>\n                    </tr>\n                    <tr>\n                        <th><span>Periodicity:</span></th>\n                        <td colspan=\"2\"><span>{{newspaper.periodicity}}</span></td>\n                    </tr>\n                    <tr><td><br/></td></tr>                    \n                    <tr>\n                        <th><span>Date:</span></th>\n                        <td colspan=\"2\"><span>{{newspaper.date}}</span></td>\n                    </tr>\n                    <tr>\n                        <th><span>Available:</span></th>\n                        <td colspan=\"2\"><span>{{newspaper.amount}}</span></td>\n                    </tr>\n                    <tr><td><br /></td></tr>\n                    <tr>\n                        <th><span>Price:</span></th>\n                        <td colspan=\"2\">\n                            <span>{{newspaper.price}}$</span>\n                        </td>\n                        <td>\n                            <a class=\"btn btn-icon btn-buy\" (click)=\"addToBasket(newspaper.id)\">\n                                <span class=\"icon ic-buy\"></span>\n                            </a>\n                        </td>\n                    </tr>\n                </table>                                                                               \n            </div>            \n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.min.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNewspapersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_account_service__ = __webpack_require__("../../../../../src/app/shared/services/account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_export_service__ = __webpack_require__("../../../../../src/app/shared/services/export.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_sell_service__ = __webpack_require__("../../../../../src/app/shared/services/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_import_service__ = __webpack_require__("../../../../../src/app/shared/services/import.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_newspapers_service__ = __webpack_require__("../../../../../src/app/shared/services/newspapers.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppNewspapersComponent = (function () {
    function AppNewspapersComponent(accountService, newspapersService, router, sellService, exportService, importService) {
        this.accountService = accountService;
        this.newspapersService = newspapersService;
        this.router = router;
        this.sellService = sellService;
        this.exportService = exportService;
        this.importService = importService;
        this.newspapers = [];
        this.busyId = -1;
        this.exportMode = false;
        this.isXml = false;
    }
    AppNewspapersComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }
        this.accountService.currentUser$.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.newspapersService.tryGetNewspapers().subscribe(function (newspapers) { return _this.newspapers = newspapers; });
    };
    AppNewspapersComponent.prototype.editNewspaperForm = function (id) {
        this.router.navigate(['/newspapers/put', id]);
    };
    AppNewspapersComponent.prototype.tryRemoveNewspaper = function (id) {
        var _this = this;
        this.busyId = id;
        this.newspapersService.tryRemoveNewspaper(id).subscribe(function (resp) {
            if (resp.ok) {
                _this.newspapers.forEach(function (value, index, array) {
                    if (value.id === id) {
                        _this.newspapers.splice(index, 1);
                    }
                });
            }
        });
    };
    AppNewspapersComponent.prototype.addToBasket = function (id) {
        var _this = this;
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 3).subscribe(function (resp) {
            if (resp.ok) {
                _this.busyId = -1;
            }
        });
    };
    AppNewspapersComponent.prototype.switchExportMode = function () {
        this.exportMode = !this.exportMode;
    };
    AppNewspapersComponent.prototype.tryExport = function () {
        var ids = [];
        this.newspapers.forEach(function (value, index, array) {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    };
    AppNewspapersComponent.prototype.importChange = function (files) {
        var _this = this;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(function (res) {
                _this.newspapersService.tryGetNewspapers().subscribe(function (newspapers) { return _this.newspapers = newspapers; });
                alert("Import " + res.status);
            });
        }
    };
    return AppNewspapersComponent;
}());
AppNewspapersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-newspapers',
        template: __webpack_require__("../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.min.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_account_service__["a" /* AccountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_account_service__["a" /* AccountService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__shared_services_newspapers_service__["a" /* NewspapersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_services_newspapers_service__["a" /* NewspapersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_sell_service__["a" /* SellService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_sell_service__["a" /* SellService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_export_service__["a" /* ExportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_export_service__["a" /* ExportService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_import_service__["a" /* ImportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_import_service__["a" /* ImportService */]) === "function" && _f || Object])
], AppNewspapersComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.newspapers.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"windows-container\">\n    <div class=\"windows-grid\">        \n        <div class=\"window centered window-put\">\n            <div class=\"window-header\">\n                <div class=\"window-header-icon\">\n                    <span class=\"icon ic-addnewspaper\"></span>\n                </div>                \n                <div class=\"window-header-content\">\n                    <h4 [hidden]=\"!isEdit\">Edit newspaper</h4>\n                    <h4 [hidden]=\"isEdit\">Create newspaper</h4>\n                </div>                \n            </div>\n            <div class=\"window-content\">                                                           \n                <form name=\"newspaperForm\">\n                    <table class=\"form-table\">\n                        <tr>\n                            <td>                                    \n                                <div class=\"choose-photo\" (click)=\"uploadFile.click()\" [ngStyle]=\"{ 'background-image': 'url(' + currentPhotoPath + ')'}\" id=\"newspaper-photo\">\n                                    <h5>Click for choose photo</h5>\n                                </div>\n                            </td>\n                            <td>\n                                <label>Title</label>\n                                <input type=\"text\" placeholder=\"Enter title\" name=\"title\" [(ngModel)]=\"currentNewspaper.title\" required/>                                    \n                                <label>Amount</label>\n                                <input type=\"text\" placeholder=\"Enter amount\" name=\"amount\" [(ngModel)]=\"currentNewspaper.amount\" required/>\n                                <label>Price</label>\n                                <input type=\"text\" placeholder=\"Enter price\" name=\"price\" [(ngModel)]=\"currentNewspaper.price\" required/>\n                            </td>\n                        </tr>    \n                        <tr>\n                            <td colspan=\"2\" class=\"td-divider\">\n                                <hr/>\n                                <label>Additional info</label>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td colspan=\"2\">\n                                <table class=\"create-form-table\">\n                                    <tr>\n                                        <th><label>Date</label></th>                                        \n                                    </tr>\n                                    <tr>\n                                        <td><input type=\"text\" placeholder=\"Enter date\" name=\"date\" [(ngModel)]=\"currentNewspaper.date\" required/></td>                                        \n                                    </tr>\n                                    <tr>\n                                        <th><label>Periodicity</label></th>                                        \n                                    </tr>\n                                    <tr>                                            \n                                        <td><input type=\"text\" placeholder=\"Enter periodicity\" name=\"periodicity\" [(ngModel)]=\"currentNewspaper.periodicity\" required /></td>                                        \n                                    </tr>\n                                </table>\n                            </td>\n                        </tr>\n                    </table>\n                                                                                                \n                    <input type=\"file\" name=\"upload\" #uploadFile (change)=\"uploadPhotoChange(uploadFile.files)\" id=\"uploadFile\" style=\"display: none\"/>\n                   \n                    <input type=\"submit\" id=\"addNewspaperBtn\" class=\"btn btn-colored\" value=\"Complete\" (click)=\"tryAddNewspaper()\" [hidden]=\"isEdit\" [disabled]=\"!photoUploaded\">\n                    <input type=\"submit\" id=\"editNewspaperBtn\" class=\"btn btn-colored\" value=\"Complete\" (click)=\"tryEditNewspaper()\" [hidden]=\"!isEdit\" [disabled]=\"!photoUploaded\">\n                </form>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.min.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNewspapersPutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_newspapers_service__ = __webpack_require__("../../../../../src/app/shared/services/newspapers.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppNewspapersPutComponent = (function () {
    function AppNewspapersPutComponent(newspapersService, router, route) {
        this.newspapersService = newspapersService;
        this.router = router;
        this.route = route;
        this.photoUploaded = true;
        this.currentPhotoPath = "/Upload/Images/no-photo-e.png";
        this.currentNewspaper = {
            Id: -1,
            Title: '',
            Date: '',
            Periodicity: '',
            Amount: '',
            Price: '',
            PhotoPath: '',
        };
    }
    AppNewspapersPutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idSubscriber = this.route.params.subscribe(function (params) {
            _this.idForEdit = +params['id'];
            if (_this.idForEdit && _this.idForEdit > -1) {
                _this.isEdit = true;
                _this.newspapersService.tryGetNewspaper(_this.idForEdit).subscribe(function (newspaper) {
                    _this.currentNewspaper = newspaper;
                    _this.currentPhotoPath = newspaper.PhotoPath;
                });
            }
            else {
                _this.isEdit = false;
            }
        });
    };
    AppNewspapersPutComponent.prototype.uploadPhotoChange = function (files) {
        var _this = this;
        this.photoUploaded = false;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("image", files[0]);
            this.newspapersService.uploadPhoto(formData).subscribe(function (res) {
                _this.currentPhotoPath = res.Path;
                _this.currentNewspaper.PhotoPath = res.Path;
                _this.photoUploaded = true;
            });
        }
        else {
            this.photoUploaded = true;
        }
    };
    AppNewspapersPutComponent.prototype.tryAddNewspaper = function () {
        var _this = this;
        this.newspapersService.tryAddNewspaper(this.currentNewspaper).subscribe(function (resp) {
            if (resp.ok) {
                _this.router.navigateByUrl('/newspapers');
            }
        });
    };
    AppNewspapersPutComponent.prototype.tryEditNewspaper = function () {
        var _this = this;
        this.newspapersService.tryEditNewspaper(this.currentNewspaper).subscribe(function (resp) {
            if (resp.ok) {
                _this.router.navigateByUrl('/newspapers');
            }
        });
    };
    return AppNewspapersPutComponent;
}());
AppNewspapersPutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-newspapers-put',
        template: __webpack_require__("../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.min.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_newspapers_service__["a" /* NewspapersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_newspapers_service__["a" /* NewspapersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], AppNewspapersPutComponent);

var _a, _b, _c;
//# sourceMappingURL=app.newspapers.put.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/newspapers/newspapers.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspapersModule", function() { return NewspapersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_newspapers_app_newspapers_component__ = __webpack_require__("../../../../../src/app/modules/newspapers/components/newspapers/app.newspapers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_put_app_newspapers_put_component__ = __webpack_require__("../../../../../src/app/modules/newspapers/components/put/app.newspapers.put.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__components_newspapers_app_newspapers_component__["a" /* AppNewspapersComponent */] },
    { path: 'put', component: __WEBPACK_IMPORTED_MODULE_5__components_put_app_newspapers_put_component__["a" /* AppNewspapersPutComponent */] },
    { path: 'put/:id', component: __WEBPACK_IMPORTED_MODULE_5__components_put_app_newspapers_put_component__["a" /* AppNewspapersPutComponent */] }
];
var NewspapersModule = (function () {
    function NewspapersModule() {
    }
    return NewspapersModule;
}());
NewspapersModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__components_newspapers_app_newspapers_component__["a" /* AppNewspapersComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_put_app_newspapers_put_component__["a" /* AppNewspapersPutComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)
        ],
    })
], NewspapersModule);

//# sourceMappingURL=newspapers.module.js.map

/***/ })

});
//# sourceMappingURL=newspapers.module.chunk.js.map