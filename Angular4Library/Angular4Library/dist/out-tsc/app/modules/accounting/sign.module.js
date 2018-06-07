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
var app_signup_component_1 = require("./components/signup/app.signup.component");
var app_signIn_component_1 = require("./components/signin/app.signIn.component");
exports.routes = [
    { path: '', redirectTo: 'signin' },
    { path: 'signup', component: app_signup_component_1.AppSignUpComponent },
    { path: 'signin', component: app_signIn_component_1.AppSignInComponent }
];
var SignModule = /** @class */ (function () {
    function SignModule() {
    }
    SignModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_signup_component_1.AppSignUpComponent,
                app_signIn_component_1.AppSignInComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes)
            ],
        })
    ], SignModule);
    return SignModule;
}());
exports.SignModule = SignModule;
//# sourceMappingURL=sign.module.js.map