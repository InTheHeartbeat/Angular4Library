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
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var SellService = /** @class */ (function () {
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
    SellService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, common_1.Location])
    ], SellService);
    return SellService;
}());
exports.SellService = SellService;
//# sourceMappingURL=sell.service.js.map