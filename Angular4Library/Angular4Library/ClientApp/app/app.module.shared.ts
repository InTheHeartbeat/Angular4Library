import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { AppBooksComponent } from './components/app-books/app.books.component';
import { AppJournalsComponent } from './components/app-journals/app.journals.component';
import { AppNewspapersComponent } from './components/app-newspapers/app.newspapers.component';
import { AppBooksPutComponent } from './components/app-books-put/app.books.put.component';
import { AppNewspapersPutComponent } from './components/app-newspapers-put/app.newspapers.put.component';
import { AppJournalsPutComponent } from './components/app-journals-put/app.journals.put.component';
import { AppSignInComponent } from './components/app-signin/app.signin.component';
import { AppSignUpComponent } from './components/app-signup/app.signup.component';
import { AppNavComponent } from './components/app-nav/app.nav.component';
import { AppBasketComponent } from './components/app-basket/app.basket.component';
import { AccountService } from './account.service';
import { SellService } from './sell.service';
import { BooksService } from './books.service';
import { JournalsService } from './journals.service';
import { NewspapersService } from './newspapers.service';
import { ExportService } from './export.service';
import { ImportService } from './import.service';

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
