import { Component } from '@angular/core';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'bestgame-current-game-page',
    templateUrl: './current-game-page.component.html',
    styleUrls: ['./current-game-page.component.scss']
})
export class CurrentGamePageComponent {

    

    constructor(
        private bestGameService: BestGameDataService) 
    { }
}
