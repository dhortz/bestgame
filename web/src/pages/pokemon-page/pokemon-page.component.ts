import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoadingStatus } from 'src/components/loading/loading.module';
import { Pokemon } from 'src/models/pokemon';
import { Generations, Regions, Types } from './api/categories';
import { Category } from './api/category';
import { PokemonRandomService } from './common/pokemon-random.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector: 'pokemon-page',
    templateUrl: 'pokemon-page.component.html',
    styleUrls: ['./pokemon-page.component.scss']
})

export class PokemonPageComponent {

    @HostBinding('class.bg-container') bgContainer = true;
    loadingStatus = LoadingStatus.LOADED;
    
    readonly numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    gens = Generations;
    regions = Regions;
    types = Types;

    custom$ = new BehaviorSubject<boolean>(false);

    category$ = new BehaviorSubject<Category | null>(null);

    numberSelected = new FormControl<number>(1);
    genSelected = new FormControl<number>(1);
    regionSelected = new FormControl<number>(2);
    typeSelected = new FormControl<number>(1);

    pokemon: Pokemon[] = [];

    constructor(
        private pokeService: PokemonRandomService
    ) {}

    generatePokemon() {
        this.loadingStatus = LoadingStatus.LOADING;
        
        if (this.category$.value === Category.GENERATION){
            this.pokeService.getPokemonByGeneration(Number(this.numberSelected.value), Number(this.genSelected.value)).subscribe(pokemons => {
                this.pokemon = pokemons;
                this.loadingStatus = LoadingStatus.LOADED;
            })
        }

        if (this.category$.value === Category.REGION) {
            this.pokeService.getPokemonByRegion(Number(this.numberSelected.value), Number(this.regionSelected.value)).subscribe(pokemons => {
                this.pokemon = pokemons;
                this.loadingStatus = LoadingStatus.LOADED;
            })
        }

        if (this.category$.value === Category.TYPE) {
            this.pokeService.getPokemonByType(Number(this.numberSelected.value), Number(this.typeSelected.value)).subscribe(pokemons => {
                this.pokemon = pokemons;
                this.loadingStatus = LoadingStatus.LOADED;
            })
        }
    }

    generateRandomPokemon() {
        this.loadingStatus = LoadingStatus.LOADING;
        this.pokeService.getTrueRandom(Number(this.numberSelected.value)).subscribe(pokemons => {
            this.pokemon = pokemons;
            this.loadingStatus = LoadingStatus.LOADED;
        });
    }

    customize() {
        this.custom$.next(!this.custom$.value);
    }

    chooseCategory() {
        const index = Math.floor(Math.random() * Object.keys(Category).length);
        const value = Object.values(Category)[index];
        this.category$.next(value);
    }
}