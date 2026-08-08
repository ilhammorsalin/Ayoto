import { HomeWrapper } from "@/components/home-wrapper";
import { Hero } from "@/components/hero";
import { CollectionsGrid } from "@/components/collections-grid";

export default function Home() {
  return (
    <HomeWrapper>
      <div className="w-full flex flex-col">
        <Hero />
        <CollectionsGrid />
      </div>
    </HomeWrapper>
  );
}
