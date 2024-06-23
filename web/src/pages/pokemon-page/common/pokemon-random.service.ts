import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { PokeApiService } from 'src/services/pokeapi.service';

@Injectable()
export class PokemonRandomService {

    private readonly POKEDEX_TOTAL = 1025;

    constructor(
        private pokeApi: PokeApiService
    ) { }

    getTrueRandom(numberOfPoke: number) {
        const randomNumbers = this.getRandomNumbers(numberOfPoke, this.POKEDEX_TOTAL);

        let pokemon = [];

        for (let index = 0; index < numberOfPoke; index++) {
            pokemon.push(this.pokeApi.getPokemonByNumber(randomNumbers[index]).pipe(
                map(poke => {
                    const name = poke.name.split('-')[0];
                    return {
                        name,
                        sprite: poke.sprites.front_default
                    };
                })
            ))
        }

        return combineLatest(pokemon);
    }

    getPokemonByGeneration() {
        this.pokeApi.getPokemonsByGeneration(9).pipe(first()).subscribe();
    }

    private getRandomNumbers(numberOfPoke: number, total: number) {
        return [...Array(numberOfPoke)].map(e => ~~(Math.random() * total))
    }
}