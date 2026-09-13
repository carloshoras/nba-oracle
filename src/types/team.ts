export type Team = {
    id: string,
    name: string,
    shortName: string,
    conference: "east" | "west",
    prevRecord: {
        wins: number,
        losses: number,
    }
}