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
var journals_service_1 = require("../../../../shared/services/journals.service");
var import_service_1 = require("../../../../shared/services/import.service");
var sell_service_1 = require("../../../../shared/services/sell.service");
var export_service_1 = require("../../../../shared/services/export.service");
var AppJournalsComponent = /** @class */ (function () {
    function AppJournalsComponent(accountService, journalsService, router, sellService, exportService, importService) {
        this.accountService = accountService;
        this.journalsService = journalsService;
        this.router = router;
        this.sellService = sellService;
        this.exportService = exportService;
        this.importService = importService;
        this.journals = [];
        this.busyId = -1;
        this.exportMode = false;
        this.isXml = false;
    }
    AppJournalsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.accountService.currentUser) {
            this.currentUser = this.accountService.currentUser;
        }
        this.accountService.currentUser$.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.journalsService.tryGetJournals().subscribe(function (journals) { _this.journals = journals; });
    };
    AppJournalsComponent.prototype.editJournalForm = function (id) {
        this.router.navigate(['/journals/put', id]);
    };
    AppJournalsComponent.prototype.tryRemoveJournal = function (id) {
        var _this = this;
        this.busyId = id;
        this.journalsService.tryRemoveJournal(id).subscribe(function (resp) {
            if (resp.ok) {
                _this.journals.forEach(function (value, index, array) {
                    if (value.id === id) {
                        _this.journals.splice(index, 1);
                    }
                });
            }
        });
    };
    AppJournalsComponent.prototype.addToBasket = function (id) {
        var _this = this;
        this.busyId = id;
        this.sellService.tryAddToBasket(id, 2).subscribe(function (resp) {
            if (resp.ok) {
                _this.busyId = -1;
            }
        });
    };
    AppJournalsComponent.prototype.switchExportMode = function () {
        this.exportMode = !this.exportMode;
    };
    AppJournalsComponent.prototype.tryExport = function () {
        var ids = [];
        this.journals.forEach(function (value, index, array) {
            if (value.selected) {
                ids.push(value.id);
            }
        });
        this.exportService.tryExportItems(2, ids, this.isXml);
    };
    AppJournalsComponent.prototype.importChange = function (files) {
        var _this = this;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("import", files[0]);
            this.importService.tryImport(formData).subscribe(function (res) {
                _this.journalsService.tryGetJournals().subscribe(function (journals) { return _this.journals = journals; });
                alert("Import " + res.status);
            });
        }
    };
    AppJournalsComponent = __decorate([
        core_1.Component({
            selector: 'app-journals',
            templateUrl: './app.journals.component.html',
            styleUrls: ['./app.journals.component.min.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, journals_service_1.JournalsService,
            router_1.Router, sell_service_1.SellService,
            export_service_1.ExportService, import_service_1.ImportService])
    ], AppJournalsComponent);
    return AppJournalsComponent;
}());
exports.AppJournalsComponent = AppJournalsComponent;
//# sourceMappingURL=app.journals.component.js.map