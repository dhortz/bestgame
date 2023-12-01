import { Round } from "./round";

interface PokemonResults {
    pokemon: string;
    points: number;
}

interface RoundsWithPoints {
    round: Round;
    roundPoints: number;
    pokemonResults: PokemonResults[];
}

export interface Results {
    game: number;
    player: string;
    totalPoints: number;
    rounds: RoundsWithPoints[];
}