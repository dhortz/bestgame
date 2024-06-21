import { NgModule } from '@angular/core';
import { PokemonSpritePipe } from './pokemon-sprite';

@NgModule({
    exports: [
        PokemonSpritePipe
    ],
    declarations: [
        PokemonSpritePipe
    ]
})
export class PipesModule { }
