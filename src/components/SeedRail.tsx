import { formatSeed } from "@/lib/format"
import { range } from "@/lib/array"

// const SEEDS_PER_CONFERENCE = 15;

type SeedRailProps = {
    count: number;
};

export function SeedRail({ count }: SeedRailProps) {
    return (
        <>
            {range(count).map(seedNum => (
                <div
                    key={seedNum}
                    className="col-start-1">
                    {formatSeed(seedNum + 1)}
                </div>
            ))}
        </>
    )

    return (
        <div className="flex flex-col">
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="flex h-14 items-center text-sm font-semibold text-zinc-400"
                >
                    {formatSeed(i + 1)}
                </div>
            ))}
        </div>
    )
}