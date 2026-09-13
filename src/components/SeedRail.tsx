import { formatSeed } from "@/lib/format";
import { range } from "@/lib/array";

type SeedRailProps = {
    count: number;
};

function getSeedStyle(seedIndex: number) {
    const seed = seedIndex + 1;
    if (seed <= 6) {
        return "text-emerald-600 dark:text-emerald-400 font-semibold";
    }
    if (seed <= 10) {
        return "text-amber-600 dark:text-amber-400 font-semibold";
    }
    return "text-zinc-400 dark:text-zinc-500 font-normal";
}

function getSeedBorder(seedIndex: number) {
    const seed = seedIndex + 1;
    if (seed === 6) {
        return "border-b-2 border-emerald-500/40 h-full";
    }
    if (seed === 10) {
        return "border-b-2 border-amber-500/40 h-full";
    }
    return "border-b border-zinc-100 dark:border-zinc-800/60 h-full";
}

export function SeedRail({ count }: SeedRailProps) {
    return (
        <>
            {range(count).map((seedNum) => (
                <div
                    key={seedNum}
                    className={`col-start-1 flex items-center text-xs ${getSeedStyle(seedNum)} ${getSeedBorder(seedNum)}`}
                    style={{ gridRow: seedNum + 2 }}
                >
                    {formatSeed(seedNum + 1)}
                </div>
            ))}
        </>
    );
}