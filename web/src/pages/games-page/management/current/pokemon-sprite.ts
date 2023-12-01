import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokeApiService } from 'src/services/pokeapi.service';

@Pipe({
    name: 'pokemonSprite'
})

export class PokemonSpritePipe implements PipeTransform {
    transform(pokemonName: string): Observable<string> {
        return this.pokeApiService.getPokemon(pokemonName.toLowerCase()).pipe(
            map((pokemon: any) => pokemon.sprites.front_default)
        );
    }

    constructor(
        private pokeApiService: PokeApiService,
    ) {
    }
}