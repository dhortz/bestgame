import { Component, Input } from '@angular/core';
import { map, tap } from 'rxjs';
import { BestGameDataService } from 'src/services/bestgame-data.service';


@Component({
    selector: 'bestgame-winners',
    templateUrl: 'winners.component.html',
    styleUrls: ['./winners.component.scss']
})

export class WinnersComponent {
    
    @Input() title = "Winners!";

    gameWinners$ = this.dataService.getWinners();

    constructor(
        private dataService: BestGameDataService,
    ){}
}
