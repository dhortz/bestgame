import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PokeApiService {
    readonly BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    
    constructor(
        private http: HttpClient
    ) { }
    
    getPokemon(name: string){
        const url = this.BASE_URL + `/${name}`;

        return this.http.get(url);
    }

    getAllPokemon() {
        const url = this.BASE_URL;

        return this.http.get(url, { params: { limit: 2000 } });
    }
}