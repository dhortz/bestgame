import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { WinnersModule } from './winners/winners.module';
import { GamesModule } from './games/games.module';

@NgModule({
    imports: [
        WinnersModule,
        MenuModule,
        GamesModule
    ],
    exports: [
        WinnersModule,
        MenuModule,
        GamesModule
    ],
    declarations: [],
    providers: [],
})
export class ComponentsModule { }
