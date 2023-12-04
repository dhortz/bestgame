import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'bestgame-create-round',
    templateUrl: './create-round.component.html',
    styleUrls: ['./create-round.component.scss']
})
export class CreateRoundPageComponent {

    selectedPokemon: string[] = [];

    currentGame$ = this.bestGameService.getCurrentGame().pipe(
        map(current => current.currentGame.gameNumber)
    );

    constructor(
        private router: Router,
        private bestGameService: BestGameDataService
    ) {}

    goBackToCurrentGame() {
        this.router.navigate(["games/current"]);
    }

    addNewRound() {
        this.currentGame$.pipe(
            switchMap(currentGame => this.bestGameService.addNewRound(currentGame, this.selectedPokemon)),
            first()
        ).subscribe();
        this.goBackToCurrentGame();
    }

    pokemonSelected(selectedPokemon: string[]) {
        this.selectedPokemon = selectedPokemon;
    }


}
