import { NgModule } from '@angular/core';
import { CurrentGameModule } from './current-game/current-game.module';
import { MenuModule } from './menu/menu.module';
import { PokemonSelectionModule } from './pokemon-selection/pokemon-selection.module';
import { WinnersModule } from './winners/winners.module';
import { PokemonCardModule } from './pokemon-card/pokemon-card.module';

@NgModule({
    imports: [
        WinnersModule,
        MenuModule,
        CurrentGameModule,
        PokemonSelectionModule,
        PokemonCardModule
    ],
    exports: [
        WinnersModule,
        MenuModule,
        CurrentGameModule,
        PokemonSelectionModule,
        PokemonCardModule
    ]
})
export class ComponentsModule { }
