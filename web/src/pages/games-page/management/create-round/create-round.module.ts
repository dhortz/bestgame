import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoundPageComponent } from './create-round.component';
import { PokemonSelectionModule } from 'src/components/pokemon-selection/pokemon-selection.module';

export { CreateRoundPageComponent } from './create-round.component';

@NgModule({
    imports: [
        CommonModule,
        PokemonSelectionModule
    ],
    declarations: [
        CreateRoundPageComponent
    ]
})
export class CreateRoundPageModule { }
