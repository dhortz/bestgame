import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonSelectionComponent } from './pokemon-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export { PokemonSelectionComponent } from './pokemon-selection.component';


@NgModule({
  declarations: [
    PokemonSelectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    PokemonSelectionComponent
  ]
})
export class PokemonSelectionModule { }
