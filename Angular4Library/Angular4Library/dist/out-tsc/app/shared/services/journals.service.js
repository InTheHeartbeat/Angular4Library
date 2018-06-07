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
var JournalsService = /** @class */ (function () {
    function JournalsService(http, location) {
        this.http = http;
        this.location = location;
    }
    JournalsService.prototype.tryGetJournal = function (id) {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournal/' + id)).map(function (journal) { return journal.json(); });
    };
    JournalsService.prototype.tryGetJournals = function () {
        return this.http.get(this.location.prepareExternalUrl('api/Journals/GetJournals')).map(function (journals) { return journals.json(); });
    };
    JournalsService.prototype.tryAddJournal = function (journal) {
        return this.http.post(this.location.prepareExternalUrl('api/Journals/AddJournal'), journal);
    };
    JournalsService.prototype.tryRemoveJournal = function (id) {
        return this.http.delete(this.location.prepareExternalUrl('api/Journals/DeleteJournal/' + id));
    };
    JournalsService.prototype.tryEditJournal = function (journal) {
        return this.http.put(this.location.prepareExternalUrl('api/Journals/EditJournal'), journal);
    };
    JournalsService.prototype.uploadPhoto = function (formData) {
        return this.http.post(this.location.prepareExternalUrl("api/Journals/UploadPhoto"), formData).map(function (resp) { return resp.json(); });
    };
    JournalsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, common_1.Location])
    ], JournalsService);
    return JournalsService;
}());
exports.JournalsService = JournalsService;
//# sourceMappingURL=journals.service.js.map