import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BestGameDataService } from 'src/services/bestgame-data.service';

@Component({
    selector: 'bestgame-current-game-page',
    templateUrl: './current-game-page.component.html',
    styleUrls: ['./current-game-page.component.scss']
})
export class CurrentGamePageComponent {

    @HostBinding('class.bg-container') bgContainer = true;

    displayedColumns$ = new BehaviorSubject<string[]>([]);
    roundKeys$ = new BehaviorSubject<string[]>([]);

    currentGame$ = this.bestGameService.getCurrentGame().pipe(
        map(current => current.currentGame.gameNumber)
    );

    currentGameDetails$ = this.currentGame$.pipe(
        switchMap(currentGame => this.bestGameService.getCurrentGameDetails(currentGame)),
        tap((details) => {
            this.roundKeys$.next(details[0].roundKeys);
            this.displayedColumns$.next(["player", ...details[0].roundKeys, "totalPoints"])
        })
    );

    constructor(
        private bestGameService: BestGameDataService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    navigateToNewRound() {
        this.router.navigate(["games/new/round"]);
    }
}
