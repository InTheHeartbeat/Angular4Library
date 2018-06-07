import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppSignUpComponent } from './components/signup/app.signup.component';
import { AppSignInComponent } from './components/signin/app.signIn.component';

export const routes: Routes = [

    { path: '', redirectTo: 'signin' },
    { path: 'signup', component: AppSignUpComponent },
    { path: 'signin', component: AppSignInComponent }
    
];

@NgModule({
    declarations: [
        AppSignUpComponent,
        AppSignInComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
})
export class SignModule {
}
