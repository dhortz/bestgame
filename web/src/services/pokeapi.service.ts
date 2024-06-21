import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';

@Injectable({providedIn: 'root'})
export class PokeApiService {
    readonly BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    
    constructor(
        private http: HttpClient
    ) { }
    
    getPokemonByName(name: string){
        const url = this.BASE_URL + `/${name}`;

        return this.http.get<any>(url);
    }

    getPokemonSpeciesByName(name: string) {
        const url = this.BASE_URL + `-species/${name}`;

        return this.http.get<any>(url);
    }

    getPokemonByNumber(number: number) {
        const url = this.BASE_URL + `/${number}`;

        return this.http.get<any>(url);
    }

    getPokemonSpeciesByNumber(number: number) {
        const url = this.BASE_URL + `-species/${number}`;

        return this.http.get<any>(url);
    }

    getAllPokemon() {
        const url = this.BASE_URL;

        return this.http.get(url, { params: { limit: 2000 } });
    }
}