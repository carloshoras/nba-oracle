import { Team } from "@/types/team";
import { SeedRail } from "./SeedRail";
import { TeamRow } from "./TeamRow";

type ConferenceTableProps = {
    title: string;
    teams: Team[];
    predictedWins: Record<string, number | ""> | null;
    onWinsChange: (teamId: string, wins: number | "") => void;
};

export function ConferenceTable({
    title,
    teams,
    predictedWins,
    onWinsChange,
}: ConferenceTableProps) {

    const conferenceWins = teams.reduce((total, team) => {
        const wins = predictedWins?.[team.id];

        return total + (typeof wins === "number" ? wins : 0);
    }, 0);

    const sortedTeams = [...teams].sort((teamA, teamB) => {
        const winsA = predictedWins?.[teamA.id];
        const winsB = predictedWins?.[teamB.id];

        const numericWinsA = typeof winsA === "number" ? winsA : -1;
        const numericWinsB = typeof winsB === "number" ? winsB : -1;

        return numericWinsB - numericWinsA;
    });

    return (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-5 py-3 shadow-sm">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                    {title}
                </h2>
                <span className="text-sm font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
                    {conferenceWins} Conference wins
                </span>
            </div>

            <div className="grid grid-cols-[auto_16rem_auto_6rem_auto] grid-rows-[repeat(16,auto)] gap-x-2 items-center justify-items-center text-[0.75rem] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ">
                <span>Seed</span>
                <span>Team</span>
                <span className="text-right sm:text-left">25–26 szn</span>
                <span className="text-center">26–27 szn</span>
                <span className="text-right">Δ wins</span>

                <SeedRail count={sortedTeams.length} />

                {sortedTeams.map((team, index) => (
                    <TeamRow
                        key={team.id}
                        team={team}
                        row={index + 2}
                        teamPredictedWins={predictedWins?.[team.id] ?? null}
                        onWinsChange={onWinsChange}
                    />
                ))}
            </div>

        </section>
    );
}