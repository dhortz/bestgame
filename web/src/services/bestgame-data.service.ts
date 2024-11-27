import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentGame } from 'src/models/current-game';
import { Game } from 'src/models/game';
import { GameWinners } from 'src/models/game-winners';
import { Player } from 'src/models/player';
import { Results } from 'src/models/results';
import { Round } from 'src/models/round';

@Injectable({ providedIn: 'root' })
export class BestGameDataService {
    readonly BASE_URL = "http://localhost:3000/api";
    readonly GAMES = "/games";
    readonly ROUNDS = "/rounds";
    readonly PLAYERS = "/players";

    constructor(
        private http: HttpClient
    ) { }

    getGames() {
        const url = this.BASE_URL + this.GAMES;

        return this.http.get<Game[]>(url);
    }

    createNewGame(pokemon: string[]) {
        const url = this.BASE_URL + this.GAMES + "/newgame";

        return this.http.post<Game>(url, { pokemon });
    }

    getPlayers() {
        const url = this.BASE_URL + this.PLAYERS;

        return this.http.get<Player[]>(url);
    }

    getWinners() {
        const url = this.BASE_URL + this.PLAYERS + "/winners";

        return this.http.get<GameWinners[]>(url);
    }

    getCurrentGame() {
        const url = this.BASE_URL + this.GAMES + "/currentgame";

        return this.http.get<CurrentGame>(url);
    }

    getCurrentGameDetails(gameNumber: number) {
        const url = this.BASE_URL + this.GAMES + `/${gameNumber}/details`;

        return of(null);
        // return this.http.get<Results[]>(url).pipe(
        //     map(results => {
        //         const adaptResults = results.map(result => {
        //             let adaptRounds: any = {};
        //             const roundKeys: string[] = [];
        //             result.rounds.forEach(round => {
        //                 round.pokemonNames.forEach(pokemonName => {
        //                     const roundKey = `${round.roundId}_${pokemonName}`;
        //                     roundKeys.push(roundKey);
        //                 });
        //             });

        //             return { ...result, ...adaptRounds, roundKeys };
        //         });

        //         return adaptResults;
        //     })
        // );
    }

    addNewRound(gameNumber: number, pokemonNames: string[]){
        const url = this.BASE_URL + this.ROUNDS;

        return this.http.post<Round>(url, { gameNumber, pokemonNames });
    }
}