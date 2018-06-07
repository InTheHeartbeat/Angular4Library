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
var newspapers_service_1 = require("../../../../shared/services/newspapers.service");
var AppNewspapersPutComponent = /** @class */ (function () {
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
    AppNewspapersPutComponent = __decorate([
        core_1.Component({
            selector: 'app-newspapers-put',
            templateUrl: './app.newspapers.put.component.html',
            styleUrls: ['./app.newspapers.put.component.min.css']
        }),
        __metadata("design:paramtypes", [newspapers_service_1.NewspapersService, router_1.Router, router_1.ActivatedRoute])
    ], AppNewspapersPutComponent);
    return AppNewspapersPutComponent;
}());
exports.AppNewspapersPutComponent = AppNewspapersPutComponent;
//# sourceMappingURL=app.newspapers.put.component.js.map