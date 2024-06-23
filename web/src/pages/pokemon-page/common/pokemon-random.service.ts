import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PokeApiService } from 'src/services/pokeapi.service';

@Injectable()
export class PokemonRandomService {

    private readonly POKEDEX_TOTAL = 1025;

    constructor(
        private pokeApi: PokeApiService
    ) { }

    getTrueRandom(numberOfPoke: number) {
        const randomNumbers = this.getRandomNumbers(numberOfPoke, this.POKEDEX_TOTAL);

        return combineLatest(randomNumbers.map(number =>
            this.pokeApi.getPokemonByNumber(number).pipe(
                map((poke) => this.transformPokemon(poke))
            )
        ));
    }

    getPokemonByGeneration(numberOfPoke: number, gen: number) {
        return this.pokeApi.getPokemonsByGeneration(gen).pipe(
            switchMap(pokemons => {
                const pokemonToPresent = this.pokemonsToPresent(numberOfPoke, pokemons);
                return combineLatest(pokemonToPresent.map(pokeToPresent =>
                    this.pokeApi.getPokemonByNumber(pokeToPresent).pipe(
                        map((poke) => this.transformPokemon(poke))
                    )
                ));
            })
        );
    }

    getPokemonByRegion(numberOfPoke: number, region: number) {
        return this.pokeApi.getPokemonsByRegion(region).pipe(
            switchMap(pokemons => {
                const pokemonToPresent = this.pokemonsToPresent(numberOfPoke, pokemons);
                return combineLatest(pokemonToPresent.map(pokeToPresent =>
                    this.pokeApi.getPokemonByNumber(pokeToPresent).pipe(
                        map((poke) => this.transformPokemon(poke))
                    )
                ));
            })
        );
    }

    // FIXME: get pokemon number from url in species like the others
    getPokemonByType(numberOfPoke: number, type: number) {
        return this.pokeApi.getPokemonsByType(type).pipe(
            switchMap(pokemons => {
                const pokemonToPresent = this.pokemonsToPresent(numberOfPoke, pokemons);
                return combineLatest(pokemonToPresent.map(pokeToPresent =>
                    this.pokeApi.getPokemonByNumber(pokeToPresent).pipe(
                        map((poke) => this.transformPokemon(poke))
                    )
                ));
            })
        );
    }

    private pokemonsToPresent(numberOfPoke: number, pokemons: any): number[] {
        const randomNumbers = this.getRandomNumbers(numberOfPoke, pokemons.length - 1);
        pokemons = pokemons.map((pokemon: any) => {
            const url = pokemon.url.split("/");
            return url[url.length - 2];
        });
        return randomNumbers.map(number => pokemons[number]);
    }

    private transformPokemon(pokemon: any) {
        return {
            name: pokemon.species.name,
            sprite: pokemon.sprites.front_default
        };
    }

    private getRandomNumbers(numberOfPoke: number, total: number) {
        const numbers = Array.from({ length: total }, (_, i) => i + 1);

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers.slice(0, numberOfPoke);
    }
}