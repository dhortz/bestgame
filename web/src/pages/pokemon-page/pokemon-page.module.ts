import { NgModule } from '@angular/core';

import { PokemonPageComponent } from './pokemon-page.component';
import { PokemonCardModule } from 'src/components/pokemon-card/pokemon-card.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        PokemonCardModule,
        MatFormFieldModule, 
        MatSelectModule, 
        MatInputModule, 
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PokemonPageComponent
    ],
})
export class PokemonPageModule { }
