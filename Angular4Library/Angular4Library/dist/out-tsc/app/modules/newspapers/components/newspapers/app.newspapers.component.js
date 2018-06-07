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
var export_service_1 = require("../../../../shared/services/export.service");
var sell_service_1 = require("../../../../shared/services/sell.service");
var import_service_1 = require("../../../../shared/services/import.service");
var newspapers_service_1 = require("../../../../shared/services/newspapers.service");
var AppNewspapersComponent = /** @class */ (function () {
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
    AppNewspapersComponent = __decorate([
        core_1.Component({
            selector: 'app-newspapers',
            templateUrl: './app.newspapers.component.html',
            styleUrls: ['./app.newspapers.component.min.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, newspapers_service_1.NewspapersService,
            router_1.Router, sell_service_1.SellService,
            export_service_1.ExportService, import_service_1.ImportService])
    ], AppNewspapersComponent);
    return AppNewspapersComponent;
}());
exports.AppNewspapersComponent = AppNewspapersComponent;
//# sourceMappingURL=app.newspapers.component.js.map