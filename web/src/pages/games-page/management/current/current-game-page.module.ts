import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentGameModule } from 'src/components/current-game/current-game.module';
import { CurrentGamePageComponent } from './current-game-page.component';
import { ParseRoundKeysPipe } from './parse-round-keys';
import { PipesModule } from 'src/components/pipes/pipes.module';

export { CurrentGamePageComponent } from './current-game-page.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CurrentGameModule,
        PipesModule
    ],
    exports: [
        CurrentGamePageComponent
    ],
    declarations: [
        CurrentGamePageComponent,
        ParseRoundKeysPipe,
    ],
    providers: [],
})
export class CurrentGamePageModule { }
