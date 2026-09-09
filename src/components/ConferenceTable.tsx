import { Team } from "@/types/team";
import { SeedRail } from "./SeedRail";
import { TeamRow } from "./TeamRow";

type ConferenceTableProps = {
    title: string;
    teams: Team[];
};

export function ConferenceTable({ title, teams }: ConferenceTableProps) {
    return (
        <section>
            <h2 className="mb-2 text-lg font-bold">{title}</h2>

            <div className="grid grid-cols-5 gap-2 border-b border-zinc-300 pb-1 text-xs uppercase tracking-wide text-zinc-500">
                <span>Seed</span>
                <span>Team</span>
                <span>25-26 Record</span>
                <span>26-27 Record</span>
                <span>Delta</span>

                <SeedRail count={teams.length} />


                {teams.map((team, index) => (
                    <TeamRow key={team.id} team={team} row={index + 2} />
                ))}
            </div>
        </section>
    );
}