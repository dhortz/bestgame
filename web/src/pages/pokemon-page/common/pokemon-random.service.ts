import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PokeApiService } from 'src/services/pokeapi.service';
import { pkmnAlias } from '../api/pkmn-alias';

@Injectable()
export class PokemonRandomService {

    private readonly POKEDEX_TOTAL = 1025;

    readonly pkmnAlias = pkmnAlias;

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

    getRandom(numberOfPoke: number, generationId: number, regionId: number, typeId: number) {
        const hasCategorySelection = [generationId, regionId, typeId].some(id => Number(id) > 0);

        if (!hasCategorySelection) {
            return this.getTrueRandom(numberOfPoke);
        }

        return this.pokeApi.getGenerationRegionAndTypeData(generationId, regionId, typeId).pipe(
            switchMap(({ generation, region, type }) => {
                const combined = [
                    ...(generation?.pokemonSpecies || []),
                    ...(region?.pokemonSpecies || []),
                    ...(type?.pokemonSpecies || [])
                ];

                if (!combined.length) {
                    return this.getTrueRandom(numberOfPoke);
                }

                const pokemonToPresent = this.pokemonsToPresent(numberOfPoke, combined);

                return combineLatest(pokemonToPresent.map(pokeToPresent =>
                    this.pokeApi.getPokemonByNumber(pokeToPresent).pipe(
                        map((poke) => this.transformPokemon(poke))
                    )
                ));
            })
        );
    }

    private pokemonsToPresent(numberOfPoke: number, pokemons: any): number[] {
        if (!pokemons?.length) {
            return [];
        }

        const randomNumbers = this.getRandomNumbers(numberOfPoke, pokemons.length - 1);
        pokemons = pokemons.map((pokemon: any) => {
            const url = pokemon.url.split("/");
            return url[url.length - 2];
        });
        return randomNumbers.map(number => pokemons[number]);
    }

    private transformPokemon(pokemon: any) {
        return {
            name: this.pkmnAlias[pokemon.species.name] || pokemon.species.name,
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