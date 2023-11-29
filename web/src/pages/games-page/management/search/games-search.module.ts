import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GamesSearchPageComponent } from './games-search.component';
import { CountPlayersPipe } from './count-players.pipe';

export { GamesSearchPageComponent } from './games-search.component';

@NgModule({
    imports: [
        BrowserModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [GamesSearchPageComponent],
    declarations: [
        GamesSearchPageComponent,
        CountPlayersPipe
    ],
    providers: [],
})
export class GamesSearchPageModule { }
