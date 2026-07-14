import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PokeApiService {

    private readonly BASE_URL = "https://pokeapi.co/api/v2/";
    private readonly POKEMON_URL = `${this.BASE_URL}pokemon/`;
    private readonly POKEMON_SPECIES_URL = `${this.BASE_URL}pokemon-species/`;
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

    getPokemonSpeciesByName(name: string) {
        const url = `${this.POKEMON_SPECIES_URL}${name}`;

        return this.http.get<any>(url);
    }

    getPokemonSpeciesByNumber(dexNumber: number) {
        const url = `${this.POKEMON_SPECIES_URL}${dexNumber}`;

        return this.http.get<any>(url);
    }

    getPokemonsByGeneration(gen: number){
        const url = `${this.GENERATION_URL}${gen}`;

        return this.http.get<any>(url).pipe(
            map(response => response.pokemon_species)
        );
    }

    getPokemonsByRegion(region: number) {
        const url = `${this.REGION_URL}${region}`;

        return this.http.get<any>(url).pipe(
            map(response => response.pokemon_entries.map((pokeEntries: any) => pokeEntries.pokemon_species))
        );
    }

    getPokemonsByType(type: number) {
        const url = `${this.TYPES_URL}${type}`;

        return this.http.get<any>(url).pipe(
            map(response => response.pokemon.map((pokeEntries: any) => pokeEntries.pokemon))
        );
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