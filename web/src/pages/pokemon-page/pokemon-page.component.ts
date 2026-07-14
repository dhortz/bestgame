import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoadingStatus } from 'src/components/loading/loading.module';
import { Pokemon } from 'src/models/pokemon';
import { Generations, Regions, Types } from './api/categories';
import { PokemonRandomService } from './common/pokemon-random.service';

@Component({
    selector: 'pokemon-page',
    templateUrl: 'pokemon-page.component.html',
    styleUrls: ['./pokemon-page.component.scss'],
})
export class PokemonPageComponent {
    @HostBinding('class.bg-container') bgContainer = true;

    loadingStatus$ = new BehaviorSubject<LoadingStatus>(LoadingStatus.LOADED);

    readonly numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    gens = Generations;
    regions = Regions;
    types = Types;

    numberSelected = new FormControl<number>(1);
    genSelected = new FormControl<number>(0);
    regionSelected = new FormControl<number>(0);
    typeSelected = new FormControl<number>(0);

    pokemon: Pokemon[] = [];
    hasNoResults = false;
    hideFilters = false;

    constructor(private pokeService: PokemonRandomService) { }

    generatePokemon() {
        this.loadingStatus$.next(LoadingStatus.LOADING);
        this.hasNoResults = false;

        this.pokeService
            .getRandom(
                Number(this.numberSelected.value),
                Number(this.genSelected.value),
                Number(this.regionSelected.value),
                Number(this.typeSelected.value),
            )
            .subscribe((pokemons) => {
                this.pokemon = pokemons;
                this.hasNoResults = Array.isArray(pokemons) && pokemons.length === 0;
                this.loadingStatus$.next(LoadingStatus.LOADED);
            });
    }

    hideFilterButtons(){
        this.hideFilters = !this.hideFilters;
    }
}
