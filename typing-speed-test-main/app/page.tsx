import data from "@/data.json";
import TypingSpeedTest from "@/components/typing-speed-test";
import type { PassageData } from "@/lib/types";

export default function Home() {
  return <TypingSpeedTest passageData={data as PassageData} />;
}
