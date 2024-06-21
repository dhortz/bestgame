import { Component, HostBinding } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Pokemon } from 'src/models/pokemon';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'pokemon-page',
    templateUrl: 'pokemon-page.component.html',
    styleUrls: ['./pokemon-page.component.scss']
})

export class PokemonPageComponent {

    @HostBinding('class.bg-container') bgContainer = true;

    readonly numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    pokemon: Pokemon[] = []

    numberSelected = new FormControl<number>(1, Validators.required);
    genSelected = new FormControl<number>(1);
    regionSelected = new FormControl<string>("");
    typeSelected = new FormControl<string>("");

    constructor(
        private pokeApiService: PokeApiService
    ) { }

    generatePokemon() {
        console.log("generatePokemon#numberSelected", this.numberSelected.value);
    }

    generateRandomPokemon() {
        this.pokemon = [];
        const generateNumber = this.numberSelected.value || 1;
        const randomNumbers = [...Array(generateNumber)].map(e => ~~(Math.random() * 1025));

        for (let index = 0; index < generateNumber; index++) {
            this.pokeApiService.getPokemonByNumber(randomNumbers[index]).pipe(first()).subscribe(poke => {
                const name = poke.name.split('-')[0];

                this.pokemon.push({ name, sprite: poke.sprites.front_default })
            })
        }
    }
}