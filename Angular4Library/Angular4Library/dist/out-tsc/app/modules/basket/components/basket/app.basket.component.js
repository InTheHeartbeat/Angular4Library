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
var sell_service_1 = require("../../../../shared/services/sell.service");
var AppBasketComponent = /** @class */ (function () {
    function AppBasketComponent(sellService, router) {
        this.sellService = sellService;
        this.router = router;
        this.basket = {};
        this.recordBusyId = -1;
    }
    AppBasketComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sellService.tryGetBasket().subscribe(function (basket) { _this.basket = basket; console.log(basket); });
    };
    AppBasketComponent.prototype.tryRemoveFromOrder = function (id) {
        var _this = this;
        this.recordBusyId = id;
        this.sellService.tryRemoveFromBasket(id).subscribe(function (resp) {
            if (resp.ok) {
                _this.recordBusyId = -1;
                _this.sellService.tryGetBasket().subscribe(function (basket) { return _this.basket = basket; });
            }
        });
    };
    AppBasketComponent.prototype.tryAcceptOrder = function () {
        var _this = this;
        this.sellService.tryAcceptOrder(this.basket.orderId).subscribe(function (resp) {
            if (resp.ok) {
                _this.router.navigateByUrl("/");
            }
        });
    };
    AppBasketComponent.prototype.joinAuthors = function (authors) {
        return authors.map(function (author) { return author.fullName; }).join(", ");
    };
    AppBasketComponent = __decorate([
        core_1.Component({
            selector: 'app-basket',
            templateUrl: './app.basket.component.html',
            styleUrls: ['./app.basket.component.min.css']
        }),
        __metadata("design:paramtypes", [sell_service_1.SellService, router_1.Router])
    ], AppBasketComponent);
    return AppBasketComponent;
}());
exports.AppBasketComponent = AppBasketComponent;
//# sourceMappingURL=app.basket.component.js.map