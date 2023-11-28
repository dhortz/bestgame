import { Component, Input } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { BestGameDataService } from 'src/services/bestgame-data.service';


@Component({
    selector: 'bestgame-winners',
    templateUrl: 'winners.component.html',
    styleUrls: ['./winners.component.scss']
})

export class WinnersComponent {
    
    @Input() title = "Winners!";

    winners$ = this.dataService.getGames().pipe(
        map(games => games.filter(game => game.winner))
    );

    constructor(
        private dataService: BestGameDataService,
    ){}
}
