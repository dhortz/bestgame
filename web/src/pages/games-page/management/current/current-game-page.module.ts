import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CurrentGamePageComponent } from './current-game-page.component';
import { CurrentGameModule } from 'src/components/games/current-game/current-game.module';
import { CommonModule } from '@angular/common';

export { CurrentGamePageComponent } from './current-game-page.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MatTableModule,
        MatPaginatorModule,
        CurrentGameModule
    ],
    exports: [
        CurrentGamePageComponent
    ],
    declarations: [
        CurrentGamePageComponent
    ],
    providers: [],
})
export class CurrentGamePageModule { }
