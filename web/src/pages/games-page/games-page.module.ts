import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrentGameModule } from 'src/components/current-game/current-game.module';
import { GamesPageComponent } from './games-page.component';
import { GamesManagementModule } from './management/games-management.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CurrentGameModule,
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
