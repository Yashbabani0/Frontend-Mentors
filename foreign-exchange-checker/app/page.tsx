import CheckRateCard from "@/components/CheckRateCard";
import LiveMarketBar from "@/components/LiveMarketbar";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <LiveMarketBar />
      <CheckRateCard />
    </div>
  );
}
