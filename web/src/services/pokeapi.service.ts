import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PokeApiService {

    private readonly BASE_URL = "https://pokeapi.co/api/v2/";
    private readonly POKEMON_URL = `${this.BASE_URL}pokemon/`;
    private readonly GENERATION_URL = `${this.BASE_URL}generation/`;
    private readonly REGION_URL = `${this.BASE_URL}pokedex/`;
    private readonly TYPES_URL = `${this.BASE_URL}type/`;
    
    constructor(
        private http: HttpClient
    ) { }

    getAllPokemon() {
        const url = this.POKEMON_URL;

        return this.http.get(url, { params: { limit: 2000 } });
    }
    
    getPokemonByName(name: string){
        const url = `${this.POKEMON_URL}${name}`;

        return this.http.get<any>(url);
    }

    getPokemonByNumber(dexNumber: number) {
        const url = `${this.POKEMON_URL}${dexNumber}`;

        return this.http.get<any>(url);
    }

    getGenerationRegionAndTypeData(generationId: number, regionId: number, typeId: number) {
        const requests = [
            generationId > 0 ? this.http.get<any>(`${this.GENERATION_URL}${generationId}`) : of(null),
            regionId > 0 ? this.http.get<any>(`${this.REGION_URL}${regionId}`) : of(null),
            typeId > 0 ? this.http.get<any>(`${this.TYPES_URL}${typeId}`) : of(null)
        ];

        return forkJoin(requests).pipe(
            map(([generation, region, type]) => ({
                generation: generation ? {
                    name: generation.name,
                    pokemonSpecies: generation.pokemon_species || []
                } : null,
                region: region ? {
                    name: region.name,
                    pokemonSpecies: (region.pokemon_entries || []).map((entry: any) => entry.pokemon_species)
                } : null,
                type: type ? {
                    name: type.name,
                    pokemonSpecies: (type.pokemon || []).map((entry: any) => entry.pokemon)
                } : null
            })),
            catchError(() => of({ generation: null, region: null, type: null }))
        );
    }
}