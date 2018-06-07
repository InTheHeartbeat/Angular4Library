"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("./services/account.service");
var journals_service_1 = require("./services/journals.service");
var sell_service_1 = require("./services/sell.service");
var books_service_1 = require("./services/books.service");
var import_service_1 = require("./services/import.service");
var newspapers_service_1 = require("./services/newspapers.service");
var export_service_1 = require("./services/export.service");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            providers: [account_service_1.AccountService, books_service_1.BooksService, journals_service_1.JournalsService, newspapers_service_1.NewspapersService, sell_service_1.SellService, export_service_1.ExportService, import_service_1.ImportService],
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map