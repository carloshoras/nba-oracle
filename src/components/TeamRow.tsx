import { Team } from "@/types/team";
import Image from "next/image";
import { motion } from "motion/react";

type TeamRowProps = {
    team: Team;
    row: number;
    teamPredictedWins: number | "";
    onWinsChange: (teamId: string, wins: number | "") => void;
};

export function TeamRow({
    team,
    row,
    teamPredictedWins,
    onWinsChange,
}: TeamRowProps) {
    return (
        <motion.div
            layout
            transition={{
                duration: 0.4,
                ease: "easeInOut",
            }}
            className="col-start-2 col-span-4 grid grid-cols-subgrid"
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
            <span>
                <input
                    type="number"
                    min="0"
                    max="82"
                    step="1"
                    value={teamPredictedWins}
                    onChange={(event) => {
                        const rawValue = event.target.value;

                        if (rawValue === "") {
                            onWinsChange(team.id, "");
                            return;
                        }

                        const wins = Number(rawValue);
                        const limitedWins = Math.min(82, Math.max(0, wins));

                        onWinsChange(team.id, limitedWins);
                    }}
                    onFocus={(event) => {
                        event.currentTarget.select();
                    }}
                    className="w-14 rounded border border-zinc-300 px-2 py-1 text-center"
                />
                -{teamPredictedWins === "" ? "-" : 82 - teamPredictedWins}
            </span>
            <span>
                {teamPredictedWins === ""
                    ? "-"
                    : teamPredictedWins - team.prevRecord.wins}
            </span>
        </motion.div>
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