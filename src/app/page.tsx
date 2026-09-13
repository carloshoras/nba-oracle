"use client";

import { Team } from "@/types/team";
import { ConferenceTable } from "@/components/ConferenceTable";
import { useCallback, useEffect, useState } from "react";

type PredictedWins = Record<string, number | "">;

const STORAGE_KEY = "nba-oracle-predicted-wins";

const eastTeams: Team[] = [
  { id: "det", name: "Detroit Pistons", shortName: "Pistons", conference: "east", prevRecord: { wins: 60, losses: 22 } },
  { id: "bos", name: "Boston Celtics", shortName: "Celtics", conference: "east", prevRecord: { wins: 56, losses: 26 } },
  { id: "nyk", name: "New York Knicks", shortName: "Knicks", conference: "east", prevRecord: { wins: 53, losses: 29 } },
  { id: "cle", name: "Cleveland Cavaliers", shortName: "Cavaliers", conference: "east", prevRecord: { wins: 52, losses: 30 } },
  { id: "tor", name: "Toronto Raptors", shortName: "Raptors", conference: "east", prevRecord: { wins: 46, losses: 36 } },
  { id: "atl", name: "Atlanta Hawks", shortName: "Hawks", conference: "east", prevRecord: { wins: 46, losses: 36 } },
  { id: "phi", name: "Philadelphia 76ers", shortName: "76ers", conference: "east", prevRecord: { wins: 45, losses: 37 } },
  { id: "orl", name: "Orlando Magic", shortName: "Magic", conference: "east", prevRecord: { wins: 45, losses: 37 } },
  { id: "cha", name: "Charlotte Hornets", shortName: "Hornets", conference: "east", prevRecord: { wins: 44, losses: 38 } },
  { id: "mia", name: "Miami Heat", shortName: "Heat", conference: "east", prevRecord: { wins: 43, losses: 39 } },
  { id: "mil", name: "Milwaukee Bucks", shortName: "Bucks", conference: "east", prevRecord: { wins: 32, losses: 50 } },
  { id: "chi", name: "Chicago Bulls", shortName: "Bulls", conference: "east", prevRecord: { wins: 31, losses: 51 } },
  { id: "bkn", name: "Brooklyn Nets", shortName: "Nets", conference: "east", prevRecord: { wins: 20, losses: 62 } },
  { id: "ind", name: "Indiana Pacers", shortName: "Pacers", conference: "east", prevRecord: { wins: 19, losses: 63 } },
  { id: "wsh", name: "Washington Wizards", shortName: "Wizards", conference: "east", prevRecord: { wins: 17, losses: 65 } },
];

const westTeams: Team[] = [
  { id: "okc", name: "Oklahoma City Thunder", shortName: "Thunder", conference: "west", prevRecord: { wins: 64, losses: 18 } },
  { id: "sas", name: "San Antonio Spurs", shortName: "Spurs", conference: "west", prevRecord: { wins: 62, losses: 20 } },
  { id: "den", name: "Denver Nuggets", shortName: "Nuggets", conference: "west", prevRecord: { wins: 54, losses: 28 } },
  { id: "lal", name: "Los Angeles Lakers", shortName: "Lakers", conference: "west", prevRecord: { wins: 53, losses: 29 } },
  { id: "hou", name: "Houston Rockets", shortName: "Rockets", conference: "west", prevRecord: { wins: 52, losses: 30 } },
  { id: "min", name: "Minnesota Timberwolves", shortName: "Timberwolves", conference: "west", prevRecord: { wins: 49, losses: 33 } },
  { id: "phx", name: "Phoenix Suns", shortName: "Suns", conference: "west", prevRecord: { wins: 45, losses: 37 } },
  { id: "por", name: "Portland Trail Blazers", shortName: "Trail Blazers", conference: "west", prevRecord: { wins: 42, losses: 40 } },
  { id: "lac", name: "Los Angeles Clippers", shortName: "Clippers", conference: "west", prevRecord: { wins: 42, losses: 40 } },
  { id: "gsw", name: "Golden State Warriors", shortName: "Warriors", conference: "west", prevRecord: { wins: 37, losses: 45 } },
  { id: "nop", name: "New Orleans Pelicans", shortName: "Pelicans", conference: "west", prevRecord: { wins: 26, losses: 56 } },
  { id: "dal", name: "Dallas Mavericks", shortName: "Mavericks", conference: "west", prevRecord: { wins: 26, losses: 56 } },
  { id: "mem", name: "Memphis Grizzlies", shortName: "Grizzlies", conference: "west", prevRecord: { wins: 25, losses: 57 } },
  { id: "sac", name: "Sacramento Kings", shortName: "Kings", conference: "west", prevRecord: { wins: 22, losses: 60 } },
  { id: "uta", name: "Utah Jazz", shortName: "Jazz", conference: "west", prevRecord: { wins: 22, losses: 60 } },
];

const allTeams = [...eastTeams, ...westTeams];


const initialPredictedWins: PredictedWins = Object.fromEntries(
  allTeams.map((team) => [team.id, 0])
);



export default function Home() {

  const [predictedWins, setPredictedWins] = useState<PredictedWins | null>(null);

  useEffect(() => {
    const storedWins = localStorage.getItem(STORAGE_KEY);
    if (storedWins) {
      try {
        const parsedWins = JSON.parse(storedWins) as PredictedWins;
        setPredictedWins({
          ...parsedWins,
        });
        return;
      } catch {
        console.warn("Could not load saved predictions");
      }
    }
    setPredictedWins(initialPredictedWins);
  }, []);

  useEffect(() => {
    if (predictedWins === null) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(predictedWins));
  }, [predictedWins]);

  const totalPredictedWins = Object.values(predictedWins ?? {}).reduce<number>(
    (total, wins) => total + (typeof wins === "number" ? wins : 0),
    0
  );

  const isValidTotal = predictedWins !== null && totalPredictedWins === 1230;

  const handleWinsChange = useCallback(
    (teamId: string, wins: number | "") => {
      setPredictedWins((currentWins) => {
        if (currentWins === null) {
          return currentWins;
        }

        return {
          ...currentWins,
          [teamId]: wins,
        };
      });
    },
    []
  );

  const handleReset = useCallback(() => {
    setPredictedWins(initialPredictedWins);
  }, []);

  const [activeConference, setActiveConference] = useState<"east" | "west">("east");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <header className="mb-4 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            NBA Oracle
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Predict the 2026-27 NBA standings and wins.
          </p>
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm sm:w-auto sm:gap-[110px]">
          <div
            className="flex cursor-help items-center gap-2"
            title={"An NBA regular season has 1,230 games. One game is one win, so all wins must add up to exactly 1,230."}
          >
            <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Total wins:</span>{" "}
              <span className={`font-bold tabular-nums ${isValidTotal ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}`}>
                {totalPredictedWins.toLocaleString()}
              </span>{" "}
              / 1,230
            </p>

            <span
              aria-hidden="true"
              className={`font-bold ${isValidTotal ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}`}
            >
              {isValidTotal ? "✓" : "!"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-min rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-[6px] text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer lg:w-auto lg:px-3.5 lg:py-1.5"
          >
            Reset predictions
          </button>
        </div>
      </header>

      <div
        className="mb-4 grid grid-cols-2 gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden"
        role="tablist"
        aria-label="Conference standings"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeConference === "east"}
          onClick={() => setActiveConference("east")}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${activeConference === "east"
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
        >
          East
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeConference === "west"}
          onClick={() => setActiveConference("west")}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${activeConference === "west"
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
        >
          West
        </button>
      </div>

      <div className="lg:hidden">
        {activeConference === "east" ? (
          <ConferenceTable
            title="Eastern Conference"
            teams={eastTeams}
            predictedWins={predictedWins}
            onWinsChange={handleWinsChange}
          />
        ) : (
          <ConferenceTable
            title="Western Conference"
            teams={westTeams}
            predictedWins={predictedWins}
            onWinsChange={handleWinsChange}
          />
        )}
      </div>

      <div className="hidden gap-8 lg:grid lg:grid-cols-2">
        <ConferenceTable
          title="Eastern Conference"
          teams={eastTeams}
          predictedWins={predictedWins}
          onWinsChange={handleWinsChange}
        />

        <ConferenceTable
          title="Western Conference"
          teams={westTeams}
          predictedWins={predictedWins}
          onWinsChange={handleWinsChange}
        />
      </div>

      <footer className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Created by{" "}
        <a
          href="https://x.com/carlettodisetto"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-700 dark:text-zinc-300 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white"
        >
          @carlettodisetto
        </a>
      </footer>
    </main>
  );

}
