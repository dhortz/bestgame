import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GamesSearchComponent } from './games-search.component';
import { CountPlayersPipe } from './count-players.pipe';

export { GamesSearchComponent } from './games-search.component';

@NgModule({
    imports: [
        BrowserModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [GamesSearchComponent],
    declarations: [
        GamesSearchComponent,
        CountPlayersPipe
    ],
    providers: [],
})
export class GamesSearchModule { }
