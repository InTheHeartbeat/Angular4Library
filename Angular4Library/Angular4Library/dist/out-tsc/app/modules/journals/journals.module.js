"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_journals_component_1 = require("./components/journals/app.journals.component");
var app_journals_put_component_1 = require("./components/put/app.journals.put.component");
exports.routes = [
    { path: '', component: app_journals_component_1.AppJournalsComponent },
    { path: 'put', component: app_journals_put_component_1.AppJournalsPutComponent },
    { path: 'put/:id', component: app_journals_put_component_1.AppJournalsPutComponent }
];
var JournalsModule = /** @class */ (function () {
    function JournalsModule() {
    }
    JournalsModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_journals_component_1.AppJournalsComponent,
                app_journals_put_component_1.AppJournalsPutComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes)
            ],
        })
    ], JournalsModule);
    return JournalsModule;
}());
exports.JournalsModule = JournalsModule;
//# sourceMappingURL=journals.module.js.map