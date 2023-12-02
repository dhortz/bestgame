import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'bestgame-create-round',
    templateUrl: './create-round.component.html',
    styleUrls: ['./create-round.component.scss']
})
export class CreateRoundPageComponent {

    selectedPokemon: string[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bestGameService: BestGameDataService
    ) {}

    goBackToCurrentGame() {
        this.router.navigate(["games/current"]);
    }

    addNewRound() {
        this.bestGameService.addNewRound(this.selectedPokemon).pipe(first()).subscribe();
        this.goBackToCurrentGame();
    }

    pokemonSelected(selectedPokemon: string[]) {
        this.selectedPokemon = selectedPokemon;
    }


}
