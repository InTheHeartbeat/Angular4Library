import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppNewspapersComponent } from './components/newspapers/app.newspapers.component';
import { AppNewspapersPutComponent } from './components/put/app.newspapers.put.component';

export const routes: Routes = [
    { path: '', component: AppNewspapersComponent },
    { path: 'put', component: AppNewspapersPutComponent },
    { path: 'put/:id', component: AppNewspapersPutComponent }
];

@NgModule({
    declarations: [
        AppNewspapersComponent,
        AppNewspapersPutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
})
export class NewspapersModule {
}
