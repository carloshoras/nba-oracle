import { Team } from "@/types/team";
import Image from "next/image";


type TeamRowProps = {
    team: Team;
    row: number;
}

export function TeamRow({ team, row }: TeamRowProps) {
    return (
        <div className="col-start-2 col-span-4 grid grid-cols-subgrid"
            style={{ gridRow: row }}>
            <div className="teamName flex items-center gap-2">
                <Image
                    src={`/logos/${team.id}.svg`}
                    alt={`${team.name} logo`}
                    width={32}
                    height={32}
                />
                <span>{team.name}</span>
            </div>
            <span>
                {team.prevRecord.wins}-{team.prevRecord.losses}
            </span>
            <span>-</span>
            <span>-</span>
        </div>
    )

    //       return (
    //     <div className="flex items-center gap-4 border-b border-zinc-200 py-3">
    //       <span className="w-6 text-center font-semibold text-zinc-500">
    //         {rank}
    //       </span>

    //       <div className="h-8 w-8 rounded-full bg-zinc-300" />

    //       <span className="flex-1 font-medium">{team.name}</span>

    //       <span className="w-16 text-sm text-zinc-500">
    //         {team.previousRecord.wins}-{team.previousRecord.losses}
    //       </span>
    //     </div>
    //   );
}