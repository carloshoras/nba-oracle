"use client";

import { Team } from "@/types/team";
import { ConferenceTable } from "@/components/ConferenceTable";
import { useCallback, useEffect, useState } from "react";

type PredictedWins = Record<string, number | "">;

const STORAGE_KEY = "nba-oracle-predicted-wins";

const eastTeams: Team[] = [
  { id: "det", name: "Detroit Pistons", conference: "east", prevRecord: { wins: 60, losses: 22 } },
  { id: "bos", name: "Boston Celtics", conference: "east", prevRecord: { wins: 56, losses: 26 } },
  { id: "nyk", name: "New York Knicks", conference: "east", prevRecord: { wins: 53, losses: 29 } },
  { id: "cle", name: "Cleveland Cavaliers", conference: "east", prevRecord: { wins: 52, losses: 30 } },
  { id: "tor", name: "Toronto Raptors", conference: "east", prevRecord: { wins: 46, losses: 36 } },
  { id: "atl", name: "Atlanta Hawks", conference: "east", prevRecord: { wins: 46, losses: 36 } },
  { id: "phi", name: "Philadelphia 76ers", conference: "east", prevRecord: { wins: 45, losses: 37 } },
  { id: "orl", name: "Orlando Magic", conference: "east", prevRecord: { wins: 45, losses: 37 } },
  { id: "cha", name: "Charlotte Hornets", conference: "east", prevRecord: { wins: 44, losses: 38 } },
  { id: "mia", name: "Miami Heat", conference: "east", prevRecord: { wins: 43, losses: 39 } },
  { id: "mil", name: "Milwaukee Bucks", conference: "east", prevRecord: { wins: 32, losses: 50 } },
  { id: "chi", name: "Chicago Bulls", conference: "east", prevRecord: { wins: 31, losses: 51 } },
  { id: "bkn", name: "Brooklyn Nets", conference: "east", prevRecord: { wins: 20, losses: 62 } },
  { id: "ind", name: "Indiana Pacers", conference: "east", prevRecord: { wins: 19, losses: 63 } },
  { id: "wsh", name: "Washington Wizards", conference: "east", prevRecord: { wins: 17, losses: 65 } },
];

const westTeams: Team[] = [
  { id: "okc", name: "Oklahoma City Thunder", conference: "west", prevRecord: { wins: 64, losses: 18 } },
  { id: "sas", name: "San Antonio Spurs", conference: "west", prevRecord: { wins: 62, losses: 20 } },
  { id: "den", name: "Denver Nuggets", conference: "west", prevRecord: { wins: 54, losses: 28 } },
  { id: "lal", name: "Los Angeles Lakers", conference: "west", prevRecord: { wins: 53, losses: 29 } },
  { id: "hou", name: "Houston Rockets", conference: "west", prevRecord: { wins: 52, losses: 30 } },
  { id: "min", name: "Minnesota Timberwolves", conference: "west", prevRecord: { wins: 49, losses: 33 } },
  { id: "phx", name: "Phoenix Suns", conference: "west", prevRecord: { wins: 45, losses: 37 } },
  { id: "por", name: "Portland Trail Blazers", conference: "west", prevRecord: { wins: 42, losses: 40 } },
  { id: "lac", name: "Los Angeles Clippers", conference: "west", prevRecord: { wins: 42, losses: 40 } },
  { id: "gsw", name: "Golden State Warriors", conference: "west", prevRecord: { wins: 37, losses: 45 } },
  { id: "nop", name: "New Orleans Pelicans", conference: "west", prevRecord: { wins: 26, losses: 56 } },
  { id: "dal", name: "Dallas Mavericks", conference: "west", prevRecord: { wins: 26, losses: 56 } },
  { id: "mem", name: "Memphis Grizzlies", conference: "west", prevRecord: { wins: 25, losses: 57 } },
  { id: "sac", name: "Sacramento Kings", conference: "west", prevRecord: { wins: 22, losses: 60 } },
  { id: "uta", name: "Utah Jazz", conference: "west", prevRecord: { wins: 22, losses: 60 } },
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <header className="mb-4 flex flex-row gap-4 text-center items-center sm:justify-between sm:text-left">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            NBA Oracle
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Predict the 2026-27 NBA standings and wins.
          </p>
        </div>

        <div className="flex flex-row items-center gap-[110px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm">
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
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Reset predictions
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
