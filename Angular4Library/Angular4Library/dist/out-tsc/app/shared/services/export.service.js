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
var FileSaver = require("file-saver");
var ExportService = /** @class */ (function () {
    function ExportService(http, location) {
        this.http = http;
        this.location = location;
    }
    ExportService.prototype.tryExportItems = function (type, ids, isXml) {
        return this.http.post(this.location.prepareExternalUrl("api/Export/TryExport"), { type: type, idsArray: ids, isXml: isXml }, { responseType: http_1.ResponseContentType.Blob }).subscribe(function (data) {
            var blob = new Blob([data._body], { type: data.headers.get('Content-Type') });
            var contentDispositionHeader = data.headers.get('Content-Disposition');
            if (contentDispositionHeader !== null) {
                var contentDispositionHeaderResult = contentDispositionHeader.split(';')[1].trim().split('=')[1];
                var contentDispositionFileName = contentDispositionHeaderResult.replace(/"/g, '');
                FileSaver.saveAs(blob, contentDispositionFileName);
            }
        });
    };
    ExportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, common_1.Location])
    ], ExportService);
    return ExportService;
}());
exports.ExportService = ExportService;
//# sourceMappingURL=export.service.js.map