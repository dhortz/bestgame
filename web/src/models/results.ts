import { Round } from "./round";

interface RoundsWithPoints {
    round: Round;
    points: number;
}

export interface Results {
    player: string;
    totalPoints: number;
    round: RoundsWithPoints[];
}