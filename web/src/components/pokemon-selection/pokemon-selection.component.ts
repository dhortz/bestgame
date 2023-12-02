import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, Observable, combineLatest, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'
import { Pokemon } from 'src/models/pokemon';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'bestgame-pokemon-selection',
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.scss']
})
export class PokemonSelectionComponent {

    options$: Observable<string[]> = this.pokeApiService.getAllPokemon().pipe(
        map((data: any) => data.results.map((poke: any) => poke.name))
    );

    searchControl = new FormControl();
    filteredOptions$ = combineLatest([
        this.searchControl.valueChanges,
        this.options$
    ]).pipe(
        map(([search, options]) => options.filter(option => option.includes(search)))
    );

    selectedPokemonNames: string[] = [];

    selectedPokemon$ = new BehaviorSubject<Pokemon[]>([]);

    @Output() selectedPokemon = new EventEmitter<string[]>;

    constructor(
        private pokeApiService: PokeApiService,
    ) { }

    onOptionSelected(pokemonSelected: MatAutocompleteSelectedEvent) {
        if (!this.selectedPokemonNames.includes(pokemonSelected.option.value)) {
            this.selectedPokemonNames.push(pokemonSelected.option.value);
        }
    }

    addSelectedPokemon() {
        forkJoin(this.selectedPokemonNames.map(poke => this.pokeApiService.getPokemon(poke).pipe(map((data: any) => (<Pokemon>{
            name: data.name,
            sprite: data.sprites.front_default
        }))))).subscribe(pokemon => {
            this.selectedPokemon$.next(pokemon);
            this.selectedPokemon.emit(pokemon.map(poke => poke.name));
        });
    }
}
