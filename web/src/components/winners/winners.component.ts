import { Component, Input } from '@angular/core';
import { BestGameDataService } from 'src/services/bestgame-data.service';


@Component({
    selector: 'bestgame-winners',
    templateUrl: 'winners.component.html',
    styleUrls: ['./winners.component.scss']
})

export class WinnersComponent {
    
    @Input() title = "Hall of Fame";

    gameWinners$ = this.dataService.getWinners();

    constructor(
        private dataService: BestGameDataService,
    ){}
}
