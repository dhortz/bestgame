import { Component, HostBinding } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { LoadingStatus } from 'src/components/loading/loading.module';
import { Pokemon } from 'src/models/pokemon';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'pokemon-page',
    templateUrl: 'pokemon-page.component.html',
    styleUrls: ['./pokemon-page.component.scss']
})

export class PokemonPageComponent {

    @HostBinding('class.bg-container') bgContainer = true;
    loadingStatus = LoadingStatus.LOADED;
    readonly numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    custom$ = new BehaviorSubject<boolean>(false);
    
    numberSelected = new FormControl<number>(1, Validators.required);
    genSelected = new FormControl<number>(1);
    regionSelected = new FormControl<string>("");
    typeSelected = new FormControl<string>("");
    
    pokemon: Pokemon[] = [];

    constructor(
        private pokeApiService: PokeApiService
    ) { }

    generatePokemon() {
        this.loadingStatus = LoadingStatus.LOADING;
        this.pokemon = [];
        console.log("generatePokemon#numberSelected", this.numberSelected.value);
        console.log("generatePokemon#genSelected", this.genSelected.value);

        this.loadingStatus = LoadingStatus.LOADED;
    }

    generateRandomPokemon() {
        this.loadingStatus = LoadingStatus.LOADING;
        this.pokemon = [];
        const generateNumber = this.numberSelected.value || 1;
        const randomNumbers = [...Array(generateNumber)].map(e => ~~(Math.random() * 1025));

        for (let index = 0; index < generateNumber; index++) {
            this.pokeApiService.getPokemonByNumber(randomNumbers[index]).pipe(
                first(),
                tap(poke => {
                    const name = poke.name.split('-')[0];

                    this.pokemon.push({ name, sprite: poke.sprites.front_default });
                })
            ).subscribe(() => this.loadingStatus = LoadingStatus.LOADED)
        }
    }

    customize(){
        this.custom$.next(!this.custom$.value);
    }
}