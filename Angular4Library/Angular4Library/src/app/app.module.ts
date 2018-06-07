import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { AppNavComponent } from "./modules/navigation/components/nav/app.nav.component";

import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        AppNavComponent,                                
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        SharedModule,
        RouterModule.forRoot([            
            { path: '', redirectTo: 'books', pathMatch: 'full' },

            { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },
            { path: 'sign', loadChildren: 'app/modules/accounting/sign.module#SignModule' },

            { path: 'books', loadChildren: 'app/modules/books/books.module#BooksModule' },            
            { path: 'journals', loadChildren: 'app/modules/journals/journals.module#JournalsModule' },            
            { path: 'newspapers', loadChildren: 'app/modules/newspapers/newspapers.module#NewspapersModule' },            
            { path: 'basket', loadChildren: 'app/modules/basket/basket.module#BasketModule' }
        ])
    ],    
    bootstrap: [AppComponent]
})
export class AppModule { }
