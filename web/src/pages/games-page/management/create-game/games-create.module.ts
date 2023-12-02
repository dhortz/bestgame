import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokemonSelectionModule } from 'src/components/pokemon-selection/pokemon-selection.module';
import { GamesCreatePageComponent } from './games-create.component';

export { GamesCreatePageComponent } from './games-create.component';

@NgModule({
    imports: [
        CommonModule,
        PokemonSelectionModule
    ],
    exports: [GamesCreatePageComponent],
    declarations: [GamesCreatePageComponent],
    providers: [],
})
export class GamesCreatePageModule { }
