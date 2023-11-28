import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/models/player';

@Pipe({
    name: 'countPlayers'
})

export class CountPlayersPipe implements PipeTransform {
    transform(players: Player[]): number {
        return players.length;        
    }
}