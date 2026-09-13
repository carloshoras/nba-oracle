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

function getDeltaDisplay(delta: number) {
    if (delta > 0) {
        return {
            text: `+${delta}`,
            icon: "▲",
            iconClassName: "text-emerald-600 dark:text-emerald-400",
        };
    }

    if (delta < 0) {
        return {
            text: `${delta}`,
            icon: "▼",
            iconClassName: "text-rose-600 dark:text-rose-400",
        };
    }

    return {
        text: "",
        icon: "=",
        iconClassName: "text-zinc-400 dark:text-zinc-500",
    };
}

function getRowStyle(row: number) {
    const seed = row - 1;
    let borderStyle = "border-b border-zinc-100 dark:border-zinc-800/60 py-[12px]";

    if (seed === 6) {
        borderStyle = "border-b-2 border-emerald-500/40 py-[12px]";
    } else if (seed === 10) {
        borderStyle = "border-b-2 border-amber-500/40 py-[12px]";
    }

    return `${borderStyle} hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors px-1`;
}

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
            className={`col-start-2 col-span-4 grid grid-cols-subgrid items-center ${getRowStyle(row)}`}
            style={{ gridRow: row }}
        >
            <div className="teamName flex items-center gap-2.5 font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                <Image
                    src={`/logos/${team.id}.svg`}
                    alt={`${team.name} logo`}
                    width={28}
                    height={28}
                    className="object-contain"
                />
                <span className="truncate">{team.name}</span>
            </div>

            <span className="text-xs flex justify-center font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
                {team.prevRecord.wins}-{team.prevRecord.losses}
            </span>

            <span className="text-sm font-semibold flex justify-center text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
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
                            className="w-12 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-1 py-0.5 text-center text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                        />
                        <span className="text-xs font-normal tabular-nums text-zinc-500 dark:text-zinc-400">
                            -{draftWins === null || draftWins === "" ? "-" : 82 - draftWins}
                        </span>
                    </>
                )}
            </span>

            <span className="text-right flex justify-center">
                {teamPredictedWins === null || draftWins === null || draftWins === "" ? (
                    <span className="text-xs text-zinc-400">-</span>
                ) : (
                    (() => {
                        const delta = draftWins - team.prevRecord.wins;
                        const { text, icon, iconClassName } = getDeltaDisplay(delta);

                        return (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
                                {icon && <span className={`text-[10px] ${iconClassName}`}>{icon}</span>}
                                <span>{text}</span>
                            </span>
                        );
                    })()
                )}
            </span>
        </motion.div>
    );
});

