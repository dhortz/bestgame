interface RoundsWithPoints {
    round: number;
    points: number;
}

export interface Results {
    player: string;
    totalPoints: number;
    round: RoundsWithPoints[];
}