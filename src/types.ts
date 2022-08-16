export enum Moves {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
    Spock = 4,
    Lizard = 5
}

export type Game = {
    id: string,
    youStarted: boolean,
    opponent: string,
    stake: string,
    status: number,
    timeRemaining: number,
}
