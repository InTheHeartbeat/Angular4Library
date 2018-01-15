import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { AppBooksComponent } from './components/app-books/app.books.component';
import { AppBooksPutComponent } from './components/app-books-put/app.books.put.component';
import { AppSignInComponent } from './components/app-signin/app.signin.component';
import { AppSignUpComponent } from './components/app-signup/app.signup.component';
import {AppNavComponent} from './components/app-nav/app.nav.component';
import { AccountService } from './account.service';
import { BooksService } from './books.service';

@NgModule({
	declarations: [
        AppComponent,	  
        AppBooksComponent,
	    AppBooksPutComponent,
		AppNavComponent,
        AppSignInComponent,
	    AppSignUpComponent
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
			{ path: '**', redirectTo: 'books' }
		])
	],
providers:[AccountService, BooksService]
})

export class AppModuleShared {
}
