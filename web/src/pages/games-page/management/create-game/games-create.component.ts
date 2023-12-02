import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'games-create',
    templateUrl: 'games-create.component.html',
    styleUrls: ['./games-create.component.scss']
})

export class GamesCreatePageComponent {

    @HostBinding('class.bg-container') bgContainer = true;

    selectedPokemon: string[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bestGameService: BestGameDataService
    ) {}

    goBackToGamesList() {
        this.router.navigate(["games"]);
    }

    createNewGame(){
        this.bestGameService.createNewGame(this.selectedPokemon).pipe(first()).subscribe();
        this.goBackToGamesList();
    }

    pokemonSelected(selectedPokemon: string[]){
        this.selectedPokemon = selectedPokemon;
    }
}