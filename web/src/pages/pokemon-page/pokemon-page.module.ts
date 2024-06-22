import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PokemonCardModule } from 'src/components/pokemon-card/pokemon-card.module';
import { PokemonPageComponent } from './pokemon-page.component';
import { LoadingModule } from 'src/components/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        PokemonCardModule,
        MatFormFieldModule, 
        MatSelectModule, 
        MatInputModule, 
        FormsModule,
        ReactiveFormsModule,
        LoadingModule
    ],
    declarations: [
        PokemonPageComponent
    ],
})
export class PokemonPageModule { }
