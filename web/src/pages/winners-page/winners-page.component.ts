import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'bestgame-winners-page',
    templateUrl: './winners-page.component.html',
    styleUrls: ['./winners-page.component.scss']
})
export class WinnersPageComponent {
    @HostBinding('class.bg-container') bgContainer = true;
}
