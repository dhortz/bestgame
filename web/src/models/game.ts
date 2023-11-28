import { Player } from "./player";

export interface Game {
    gameNumber: number;
    winner: any;
    players: Player[];
    beginDate: Date;
}