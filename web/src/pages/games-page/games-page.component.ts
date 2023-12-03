import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'bestgame-games-page',
    templateUrl: 'games-page.component.html'
})

export class GamesPageComponent {
    @HostBinding('class.bg-container') bgContainer = true;
}