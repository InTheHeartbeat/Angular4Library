import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {AppComponent} from "./components/app/app.component";
import {AppBooksComponent} from "./modules/books/components/books/app.books.component";
import {AppBooksPutComponent} from "./modules/books/components/put/app.books.put.component";
import {AppJournalsComponent} from "./modules/journals/components/journals/app.journals.component";
import {AppJournalsPutComponent} from "./modules/journals/components/put/app.journals.put.component";
import {AppNewspapersComponent} from "./modules/newspapers/components/newspapers/app.newspapers.component";
import {AppNewspapersPutComponent} from "./modules/newspapers/components/put/app.newspapers.put.component";
import {AppNavComponent} from "./modules/navigation/components/nav/app.nav.component";
import {AppSignInComponent} from "./modules/accounting/components/singin/app.signIn.component";
import {AppSignUpComponent} from "./modules/accounting/components/signup/app.signup.component";
import {AppBasketComponent} from "./modules/basket/components/basket/app.basket.component";
import {AccountService} from "./modules/accounting/account.service";
import {BooksService} from "./modules/books/books.service";
import {JournalsService} from "./modules/journals/journals.service";
import {NewspapersService} from "./modules/newspapers/newspapers.service";
import {SellService} from "./modules/basket/sell.service";
import { ExportService } from "./modules/data-transfer/export.service";
import { ImportService } from "./modules/data-transfer/import.service";

@NgModule({
	declarations: [
        AppComponent,	  
        AppBooksComponent,
        AppBooksPutComponent,
	    AppJournalsComponent,
        AppJournalsPutComponent,
	    AppNewspapersComponent,
	    AppNewspapersPutComponent,
		AppNavComponent,
        AppSignInComponent,
	    AppSignUpComponent,
	    AppBasketComponent
	],
	imports: [		
		CommonModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot([
		    { path: '', redirectTo: 'books', pathMatch: 'full' },
		    { path: 'signin', component: AppSignInComponent },
		    { path: 'signup', component: AppSignUpComponent },
		    { path: 'books', component: AppBooksComponent },
		    { path: 'books/put', component: AppBooksPutComponent },
		    { path: 'books/put/:id', component: AppBooksPutComponent },
		    { path: 'journals', component: AppJournalsComponent },
		    { path: 'journals/put', component: AppJournalsPutComponent },
		    { path: 'journals/put/:id', component: AppJournalsPutComponent },
		    { path: 'newspapers', component: AppNewspapersComponent },
		    { path: 'newspapers/put', component: AppNewspapersPutComponent },
		    { path: 'newspapers/put/:id', component: AppNewspapersPutComponent },
		    { path: 'basket', component: AppBasketComponent }
		])
	],
    providers: [AccountService, BooksService, JournalsService, NewspapersService, SellService, ExportService, ImportService]
})

export class AppModuleShared {
}
