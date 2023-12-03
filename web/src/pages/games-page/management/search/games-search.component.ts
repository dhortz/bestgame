import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'bestgame-games-search',
    templateUrl: 'games-search.component.html',
    styleUrls: ['./games-search.component.scss']
})

export class GamesSearchPageComponent {

    readonly dateFormat = "dd/MM/YYYY";

    readonly displayedColumns = ["gameNumber", "winner", "totalPlayers", "beginDate"]

    gamesDataSource$ = this.dataService.getGames();

    constructor(
        private dataService: BestGameDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    navigateToNewGame() {
        this.router.navigate(["../new/game"], { relativeTo: this.route });
    }
}