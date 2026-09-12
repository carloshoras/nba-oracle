import { Team } from "@/types/team";
import Image from "next/image";
import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";

type TeamRowProps = {
    team: Team;
    row: number;
    teamPredictedWins: number | "" | null;
    onWinsChange: (teamId: string, wins: number | "") => void;
};

export const TeamRow = memo(function TeamRow({
    team,
    row,
    teamPredictedWins,
    onWinsChange,
}: TeamRowProps) {
    const [draftWins, setDraftWins] = useState<number | "" | null>(teamPredictedWins);

    useEffect(() => {
        setDraftWins(teamPredictedWins);
    }, [teamPredictedWins]);

    function commitWins() {
        if (draftWins !== null) {
            onWinsChange(team.id, draftWins);
        }
    }

    return (
        <motion.div
            layout
            transition={{
                duration: 0.4,
                ease: "easeInOut",
            }}
            className="col-start-2 col-span-4 grid grid-cols-subgrid"
            style={{ gridRow: row }}
        >
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
                {teamPredictedWins === null ? (
                    <div
                        aria-label="Loading prediction"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800"
                    />
                ) : (
                    <>
                        <input
                            type="number"
                            min="0"
                            max="82"
                            step="1"
                            value={draftWins ?? ""}
                            onChange={(event) => {
                                const rawValue = event.target.value;

                                if (rawValue === "") {
                                    setDraftWins("");
                                    return;
                                }

                                const wins = Number(rawValue);
                                const limitedWins = Math.min(82, Math.max(0, wins));

                                setDraftWins(limitedWins);
                                if (rawValue.length >= 2) {
                                    onWinsChange(team.id, limitedWins);
                                }
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
                        -{draftWins === null || draftWins === "" ? "-" : 82 - draftWins}
                    </>
                )}
            </span>

            <span>
                {teamPredictedWins === null || draftWins === null || draftWins === ""
                    ? "-"
                    : draftWins - team.prevRecord.wins}
            </span>
        </motion.div>
    );
});

