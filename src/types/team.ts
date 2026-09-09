export type Team = {
    id: string,
    name: string,
    conference: "east" | "west",
    prevRecord: {
        wins: number,
        losses: number,
    }
}