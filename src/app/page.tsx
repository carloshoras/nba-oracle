import Image from "next/image";
import { TeamRow } from "@/components/TeamRow";
import { Team } from "@/types/team";
import { ConferenceTable } from "@/components/ConferenceTable";

const eastTeams: Team[] = [
  { id: "det", name: "Detroit Pistons", conference: "east", prevRecord: { wins: 60, losses: 22 } },
  { id: "bos", name: "Boston Celtics", conference: "east", prevRecord: { wins: 56, losses: 26 } },
  { id: "ny", name: "New York Knicks", conference: "east", prevRecord: { wins: 53, losses: 29 } },
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

export default function Home() {
  return (
    <main>
      <h1>NBA Oracle</h1>
      <div className="east-west-container grid grid-cols-2 gap-8">
        <ConferenceTable title="Eastern Conference" teams={eastTeams} />
        <ConferenceTable title="Western Conference" teams={westTeams} />

      </div>
    </main>
  );

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-4 text-xl font-semibold">NBA Oracle</h1>
      <TeamRow rank={4} team={sampleTeam} />
    </main>
  );
}
