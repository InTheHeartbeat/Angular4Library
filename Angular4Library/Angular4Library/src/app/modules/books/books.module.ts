import { NgModule } from '@angular/core';
import { AppBooksComponent } from './components/books/app.books.component';
import { AppBooksPutComponent } from './components/put/app.books.put.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown'


export const routes: Routes = [
    {
        path: '', component: AppBooksComponent
    },
    { path: 'put', component: AppBooksPutComponent },
    { path: 'put/:id', component: AppBooksPutComponent }
];

@NgModule({
    declarations: [
        AppBooksComponent,
        AppBooksPutComponent
    ],
    imports: [                        
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SelectDropDownModule
    ],
})
export class BooksModule {
}
