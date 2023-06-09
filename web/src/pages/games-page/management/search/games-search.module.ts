import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GamesSearchComponent } from './games-search.component';

export { GamesSearchComponent } from './games-search.component';

@NgModule({
    imports: [
        BrowserModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [GamesSearchComponent],
    declarations: [GamesSearchComponent],
    providers: [],
})
export class GamesSearchModule { }
