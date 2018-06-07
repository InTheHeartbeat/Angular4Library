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
var NewspapersService = /** @class */ (function () {
    function NewspapersService(http, location) {
        this.http = http;
        this.location = location;
    }
    NewspapersService.prototype.tryGetNewspaper = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspaper/' + id)).map(function (newspaper) { return newspaper.json(); });
    };
    NewspapersService.prototype.tryGetNewspapers = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Newspapers/GetNewspapers')).map(function (newspapers) { return newspapers.json(); });
    };
    NewspapersService.prototype.tryAddNewspaper = function (newspaper) {
        return this.http.post(this.location.prepareExternalUrl('api/Newspapers/AddNewspaper'), newspaper);
    };
    NewspapersService.prototype.tryRemoveNewspaper = function (id) {
        return this.http.delete(this.location.prepareExternalUrl('api/Newspapers/DeleteNewspaper/' + id));
    };
    NewspapersService.prototype.tryEditNewspaper = function (newspaper) {
        return this.http.put(this.location.prepareExternalUrl('api/Newspapers/EditNewspaper'), newspaper);
    };
    NewspapersService.prototype.uploadPhoto = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Newspapers/UploadPhoto"), formData).map(function (resp) { return resp.json(); });
    };
    NewspapersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, common_1.Location])
    ], NewspapersService);
    return NewspapersService;
}());
exports.NewspapersService = NewspapersService;
//# sourceMappingURL=newspapers.service.js.map