import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppBasketComponent } from './components/basket/app.basket.component';

export const routes: Routes = [
    { path: '', component: AppBasketComponent }
];

@NgModule({
    declarations: [
        AppBasketComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
})
export class BasketModule {
}
