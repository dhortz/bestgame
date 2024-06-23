import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

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
            map(response => response.pokemon_entries)
        );
    }

    getPokemonsByType(type: number) {
        const url = `${this.TYPES_URL}${type}`;

        return this.http.get<any>(url).pipe(
            map(response => response.pokemon)
        );
    }
}