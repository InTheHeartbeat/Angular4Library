import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppJournalsComponent } from './components/journals/app.journals.component';
import { AppJournalsPutComponent } from './components/put/app.journals.put.component';

export const routes: Routes = [
    { path: '', component: AppJournalsComponent },
    { path: 'put', component: AppJournalsPutComponent },
    { path: 'put/:id', component: AppJournalsPutComponent }
];

@NgModule({
    declarations: [
        AppJournalsComponent,
        AppJournalsPutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
})
export class JournalsModule {
}
