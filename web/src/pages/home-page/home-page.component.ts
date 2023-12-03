import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'bestgame-homepage',
    templateUrl: 'home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
    @HostBinding('class.bg-container') bgContainer = true;
}