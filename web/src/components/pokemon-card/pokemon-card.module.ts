import { NgModule } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { CommonModule } from '@angular/common';
import { LoadingModule } from "../loading/loading.module";

export { PokemonCardComponent } from './pokemon-card.component';

@NgModule({
    imports: [
    CommonModule,
    LoadingModule
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
