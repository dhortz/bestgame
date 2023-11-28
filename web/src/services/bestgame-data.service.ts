import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentGame } from 'src/models/current-game';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Injectable({providedIn: 'root'})
export class BestGameDataService {
    readonly BASE_URL = "http://localhost:3000/api";
    readonly GAMES = "/games";
    readonly PLAYERS = "/players";

    constructor(
        private http: HttpClient
    ) { }

    getGames() {
        const url = this.BASE_URL + this.GAMES;

        return this.http.get<Game[]>(url);
    }

    createNewGame(pokemon: string[]){
        const url = this.BASE_URL + this.GAMES + "/newgame";

        return this.http.post<Game[]>(url, { pokemon });
    }
    
    getPlayers(){
        const url = this.BASE_URL + this.PLAYERS;

        return this.http.get<Player[]>(url);
    }

    getWinners() {
        const url = this.BASE_URL + this.PLAYERS + "/winners";

        return this.http.get<Player[]>(url);
    }

    getCurrentGame(){
        const url = this.BASE_URL + this.GAMES + "/currentgame";

        return this.http.get<CurrentGame>(url);
    }
}