import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoadingModule } from 'src/components/loading/loading.module';
import { PokemonCardModule } from 'src/components/pokemon-card/pokemon-card.module';
import { PokemonRandomService } from './common/pokemon-random.service';
import { PokemonPageComponent } from './pokemon-page.component';

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
    providers: [
        PokemonRandomService
    ]
})
export class PokemonPageModule { }
