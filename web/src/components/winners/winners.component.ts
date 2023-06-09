import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface GameWinners {
    gameNumber: number;
    endDate: Date;
    winner: string;
}

@Component({
    selector: 'bestgame-winners',
    templateUrl: 'winners.component.html',
    styleUrls: ['./winners.component.scss']
})

export class WinnersComponent {
    
    @Input() title = "Winners!";

    winners$: Observable<GameWinners[]> = of([
        {
            gameNumber: 1,
            endDate: new Date(),
            winner: "Lilandaime"
        },
        {
            gameNumber: 2,
            endDate: new Date(),
            winner: "⚡mdlsoares⚡"
        },
        {
            gameNumber: 3,
            endDate: new Date(),
            winner: "Lilandaime"
        },
        {
            gameNumber: 4,
            endDate: new Date(),
            winner: "⚡mdlsoares⚡"
        },
        {
            gameNumber: 5,
            endDate: new Date(),
            winner: "⚡mdlsoares⚡"
        },
    ])
}
