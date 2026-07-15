import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
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
            this.pokeApi.getPokemonByNumber(number + 1).pipe(
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
                const categoryCollections = [
                    generation?.pokemonSpecies || [],
                    region?.pokemonSpecies || [],
                    type?.pokemonSpecies || []
                ].filter(collection => collection.length > 0);

                if (categoryCollections.length === 0) {
                    return this.getTrueRandom(numberOfPoke);
                }

                const combined = this.getCommonPokemon(categoryCollections);
                
                if(combined.length === 0) {
                    return of([]);
                }

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

    private getCommonPokemon(collections: any[][]): any[] {
        if (!collections.length) {
            return [];
        }

        if (collections.length === 1) {
            return collections[0];
        }

        const firstCollection = collections[0];
        const commonKeys = new Set<string>(firstCollection.map((pokemon: any) => this.getPokemonKey(pokemon)));

        collections.slice(1).forEach(collection => {
            const nextKeys = new Set<string>(collection.map((pokemon: any) => this.getPokemonKey(pokemon)));

            for (const key of Array.from(commonKeys)) {
                if (!nextKeys.has(key)) {
                    commonKeys.delete(key);
                }
            }
        });

        return firstCollection.filter((pokemon: any) => commonKeys.has(this.getPokemonKey(pokemon)));
    }

    private getPokemonKey(pokemon: any): string {
        const id = this.getPokemonId(pokemon);

        if (id != null) {
            return `id:${id}`;
        }

        if (pokemon?.url) {
            return pokemon.url;
        }

        if (pokemon?.name) {
            return pokemon.name;
        }

        return JSON.stringify(pokemon);
    }

    private getPokemonId(pokemon: any): number | null {
        if (pokemon?.id != null) {
            return Number(pokemon.id);
        }

        const url = pokemon?.url;
        if (!url) {
            return null;
        }

        const match = url.match(/\/(\d+)\/?$/);
        return match ? Number(match[1]) : null;
    }

    private pokemonsToPresent(numberOfPoke: number, pokemons: any): number[] {
        if (!pokemons?.length) {
            return [];
        }

        const randomNumbers = this.getRandomNumbers(numberOfPoke, pokemons.length);
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
        const numbers = Array.from({ length: total }, (_, i) => i);

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers.slice(0, numberOfPoke);
    }
}