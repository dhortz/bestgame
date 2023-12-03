import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { WinnersModule } from './winners/winners.module';
import { PokemonSelectionModule } from './pokemon-selection/pokemon-selection.module';
import { CurrentGameModule } from './current-game/current-game.module';

@NgModule({
    imports: [
        WinnersModule,
        MenuModule,
        CurrentGameModule,
        PokemonSelectionModule
    ],
    exports: [
        WinnersModule,
        MenuModule,
        CurrentGameModule,
        PokemonSelectionModule
    ],
    providers: [],
})
export class ComponentsModule { }
