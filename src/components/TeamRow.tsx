import { Team } from "@/types/team";
import Image from "next/image";
import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";

type TeamRowProps = {
    team: Team;
    row: number;
    teamPredictedWins: number | "";
    onWinsChange: (teamId: string, wins: number | "") => void;
};

export const TeamRow = memo(function TeamRow({
    team,
    row,
    teamPredictedWins,
    onWinsChange,
}: TeamRowProps) {

    console.log("TeamRow re-render of team", team.id)

    const [draftWins, setDraftWins] = useState<number | "">(teamPredictedWins);

    useEffect(() => {
        console.log("inside TeamRow useEffect")
        setDraftWins(teamPredictedWins);
    }, [teamPredictedWins]);

    function commitWins() {
        console.log(`Committing wins for team ${team.id}: ${draftWins}`);
        onWinsChange(team.id, draftWins);
    }
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
                    value={draftWins}
                    onChange={(event) => {
                        const rawValue = event.target.value;

                        if (rawValue === "") {
                            setDraftWins("");
                            return;
                        }

                        const wins = Number(rawValue);
                        const limitedWins = Math.min(82, Math.max(0, wins));

                        setDraftWins(limitedWins);
                        if (rawValue.length >= 2) onWinsChange(team.id, limitedWins);
                    }}
                    onFocus={(event) => {
                        event.currentTarget.select();
                    }}
                    onBlur={commitWins}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.currentTarget.blur();
                        }
                    }}
                    className="w-14 rounded border border-zinc-300 px-2 py-1 text-center"
                />
                -{draftWins === "" ? "-" : 82 - draftWins}
            </span>
            <span>
                {draftWins === ""
                    ? "-"
                    : draftWins - team.prevRecord.wins}
            </span>
        </motion.div>
    )

})

