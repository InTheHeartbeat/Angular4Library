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
var journals_service_1 = require("../../../../shared/services/journals.service");
var AppJournalsPutComponent = /** @class */ (function () {
    function AppJournalsPutComponent(journalsService, router, route) {
        this.journalsService = journalsService;
        this.router = router;
        this.route = route;
        this.photoUploaded = true;
        this.currentPhotoPath = "/Upload/Images/no-photo-e.png";
        this.currentJournal = {
            Id: -1,
            Title: '',
            Date: '',
            Theme: '',
            Periodicity: '',
            Amount: '',
            Price: '',
            PhotoPath: ''
        };
    }
    AppJournalsPutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idSubscriber = this.route.params.subscribe(function (params) {
            _this.idForEdit = +params['id'];
            if (_this.idForEdit && _this.idForEdit > -1) {
                _this.isEdit = true;
                _this.journalsService.tryGetJournal(_this.idForEdit).subscribe(function (journal) {
                    _this.currentJournal = journal;
                    _this.currentPhotoPath = journal.PhotoPath;
                });
            }
            else {
                _this.isEdit = false;
            }
        });
    };
    AppJournalsPutComponent.prototype.uploadPhotoChange = function (files) {
        var _this = this;
        this.photoUploaded = false;
        if (files && files[0]) {
            var formData = new FormData();
            formData.append("image", files[0]);
            this.journalsService.uploadPhoto(formData).subscribe(function (res) {
                _this.currentPhotoPath = res.Path;
                _this.currentJournal.PhotoPath = res.Path;
                _this.photoUploaded = true;
            });
        }
        else {
            this.photoUploaded = true;
        }
    };
    AppJournalsPutComponent.prototype.tryAddJournal = function () {
        var _this = this;
        this.journalsService.tryAddJournal(this.currentJournal).subscribe(function (resp) {
            if (resp.ok) {
                _this.router.navigateByUrl('/journals');
            }
        });
    };
    AppJournalsPutComponent.prototype.tryEditJournal = function () {
        var _this = this;
        this.journalsService.tryEditJournal(this.currentJournal).subscribe(function (resp) {
            if (resp.ok) {
                _this.router.navigateByUrl('/journals');
            }
        });
    };
    AppJournalsPutComponent = __decorate([
        core_1.Component({
            selector: 'app-journals-put',
            templateUrl: './app.journals.put.component.html',
            styleUrls: ['./app.journals.put.component.min.css']
        }),
        __metadata("design:paramtypes", [journals_service_1.JournalsService, router_1.Router, router_1.ActivatedRoute])
    ], AppJournalsPutComponent);
    return AppJournalsPutComponent;
}());
exports.AppJournalsPutComponent = AppJournalsPutComponent;
//# sourceMappingURL=app.journals.put.component.js.map