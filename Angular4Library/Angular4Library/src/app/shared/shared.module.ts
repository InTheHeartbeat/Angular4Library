import { NgModule } from '@angular/core';

import { AccountService } from './services/account.service';
import { JournalsService } from './services/journals.service';
import { SellService } from './services/sell.service';
import { BooksService } from './services/books.service';
import { ImportService } from './services/import.service';
import { NewspapersService } from './services/newspapers.service';
import { ExportService } from './services/export.service';

@NgModule({
    providers: [AccountService, BooksService, JournalsService, NewspapersService, SellService, ExportService, ImportService],
})
export class SharedModule { }
