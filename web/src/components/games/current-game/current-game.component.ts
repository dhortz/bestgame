import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { BestGameDataService } from 'src/services/bestgame-data.service';
import { PokeApiService } from 'src/services/pokeapi.service';

@Component({
    selector: 'bestgame-current-game',
    templateUrl: 'current-game.component.html',
    styleUrls: ['./current-game.component.scss']
})

export class CurrentGameComponent {

    @Input() showActivePlayers = false;
    @Input() showButton = false;

    currentGame$ = this.dataService.getCurrentGame().pipe(
        shareReplay(1)
    );

    currentPokemon$ = this.currentGame$.pipe(
        switchMap((currentGame) => {
            const pokemonNames = currentGame.currentRound.pokemonNames;

            if (!pokemonNames || pokemonNames.length === 0) {
                return [];
            }

            const pokemonObservables = pokemonNames.map((poke) =>
                this.pokeApiService.getPokemon(poke.toLowerCase()).pipe(
                    map((data: any) => ({
                        name: data.name,
                        sprite: data.sprites.front_default
                    }))
                )
            );

            return forkJoin(pokemonObservables);
        })
    );
    
    constructor(
        private pokeApiService: PokeApiService,
        private dataService: BestGameDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    goToCurrentGame(){
        this.router.navigate(["games/current"]);
    }
}