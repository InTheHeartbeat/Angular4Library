import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { AppSignInComponent } from './components/app-signin/app.signin.component';
import { AppSignUpComponent } from './components/app-signup/app.signup.component';
import {AppNavComponent} from './components/app-nav/app.nav.component';
import { AccountService } from './account.service';

@NgModule({
	declarations: [
		AppComponent,	    
		AppNavComponent,
        AppSignInComponent,
	    AppSignUpComponent
	],
	imports: [		
		CommonModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'signin', component: AppSignInComponent },            
		    { path: 'signup', component: AppSignUpComponent },            
			{ path: '**', redirectTo: 'home' }
		])
	],
providers:[AccountService]
})

export class AppModuleShared {
}
