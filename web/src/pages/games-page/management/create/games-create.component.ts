import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, first, flatMap, forkJoin, map, of, switchMap } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { BestGameDataService } from 'src/services/bestgame-data.service';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'games-create',
    templateUrl: 'games-create.component.html',
    styleUrls: ['./games-create.component.scss']
})

export class GamesCreateComponent {

    @HostBinding('class.bg-container') bgContainer = true;

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

    selectedPokemon: string[] = [];

    selectedPokemon$!: Observable<Pokemon[]>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pokeApiService: PokeApiService,
        private bestGameService: BestGameDataService
    ) {}

    goBackToGamesList() {
        this.router.navigate(["../"], { relativeTo: this.route });
    }

    onOptionSelected(pokemonSelected: MatAutocompleteSelectedEvent){
        if (!this.selectedPokemon.includes(pokemonSelected.option.value)) {
            this.selectedPokemon.push(pokemonSelected.option.value);
        }
    }

    addSelectedPokemon(){
        this.selectedPokemon$ = forkJoin(this.selectedPokemon.map(poke => this.pokeApiService.getPokemon(poke).pipe(map((data: any) => (<Pokemon>{
            name: data.name,
            sprite: data.sprites.front_default
        })))));
    }

    createNewGame(){
        this.bestGameService.createNewGame(this.selectedPokemon).pipe(first()).subscribe();
        this.goBackToGamesList();
    }
    
}