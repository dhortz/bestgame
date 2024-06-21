import { NgModule } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { CommonModule } from '@angular/common';

export { PokemonCardComponent } from './pokemon-card.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        PokemonCardComponent
    ],
    declarations: [
        PokemonCardComponent
    ],
    providers: [],
})
export class PokemonCardModule { }
