import { Game } from "./game";
import { Round } from "./round";

export interface CurrentGame {
    currentGame: Game;
    currentRound: Round;
}