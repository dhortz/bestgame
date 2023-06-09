import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'bestgame-current-game',
    templateUrl: 'current-game.component.html',
    styleUrls: ['./current-game.component.scss']
})

export class CurrentGameComponent {

    currentPokemon$ = combineLatest(["Sunflora", "Zacian"].map(poke => this.pokeApiService.getPokemon(poke.toLowerCase()).pipe(map((data: any) => ({
        name: data.name,
        sprite: data.sprites.front_default
    })))));

    currentPlayers = ["JoaoRibeiro","Horta", "Lilandaime"].join(", ");

    roundNumber = 5;

    constructor(
        private pokeApiService: PokeApiService
    ) {
    }

}