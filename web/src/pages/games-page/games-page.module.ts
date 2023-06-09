import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GamesPageComponent } from './games-page.component';
import { GamesModule } from 'src/components/games/games.module';
import { GamesManagementModule } from './management/games-management.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        GamesModule,
        GamesManagementModule
    ],
    exports: [
        GamesPageComponent
    ],
    declarations: [
        GamesPageComponent
    ],
    providers: [],
})
export class GamesPageModule { }
