import { Team } from "@/types/team";
import { SeedRail } from "./SeedRail";
import { TeamRow } from "./TeamRow";

type ConferenceTableProps = {
    title: string;
    teams: Team[];
    predictedWins: Record<string, number | "">;
    onWinsChange: (teamId: string, wins: number | "") => void;
};

export function ConferenceTable({
    title,
    teams,
    predictedWins,
    onWinsChange,
}: ConferenceTableProps) {

    const conferenceWins = teams.reduce((total, team) => {
        const wins = predictedWins[team.id];

        return total + (typeof wins === "number" ? wins : 0);
    }, 0);

    const sortedTeams = [...teams].sort((teamA, teamB) => {
        const winsA = predictedWins[teamA.id];
        const winsB = predictedWins[teamB.id];

        const numericWinsA = typeof winsA === "number" ? winsA : -1;
        const numericWinsB = typeof winsB === "number" ? winsB : -1;

        return numericWinsB - numericWinsA;
    });

    return (
        <section>
            <h2 className="mb-2 text-lg font-bold">{title}</h2>

            <div className="grid grid-cols-5 gap-2 border-b border-zinc-300 pb-1 text-xs uppercase tracking-wide text-zinc-500">
                <span>Seed</span>
                <span>Team</span>
                <span>25-26 Record</span>
                <span>26-27 Record</span>
                <span>Delta</span>

                <SeedRail count={sortedTeams.length} />


                {sortedTeams.map((team, index) => (
                    <TeamRow
                        key={team.id}
                        team={team}
                        row={index + 2}
                        teamPredictedWins={predictedWins[team.id]}
                        onWinsChange={onWinsChange} />
                ))}
            </div>
            <p>
                Total {title}: {conferenceWins} victorias
            </p>
        </section>
    );
}