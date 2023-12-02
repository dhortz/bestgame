import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { WinnersModule } from './winners/winners.module';
import { GamesModule } from './games/games.module';
import { PokemonSelectionModule } from './pokemon-selection/pokemon-selection.module';

@NgModule({
    imports: [
        WinnersModule,
        MenuModule,
        GamesModule,
        PokemonSelectionModule
    ],
    exports: [
        WinnersModule,
        MenuModule,
        GamesModule,
        PokemonSelectionModule
    ],
    providers: [],
})
export class ComponentsModule { }
