import { Component } from '@angular/core';

@Component({
    selector: 'bestgame-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    readonly imgSrc = "../assets/images/best_game_logo.png";
    title = 'Best Game!';
}
