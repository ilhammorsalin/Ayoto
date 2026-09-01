import { HomeWrapper } from "@/components/home-wrapper";
import { Hero } from "@/components/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { NewItemsSection } from "@/components/home/new-items-section";
import { ShopTheLookSection } from "@/components/home/shop-the-look-section";
import { TrendingSection } from "@/components/home/trending-section";
import { OnSaleSection } from "@/components/home/on-sale-section";

export default function Home() {
  return (
    <HomeWrapper>
      <div className="w-full flex flex-col">
        <Hero />
        <CategoriesSection />
        <NewItemsSection />
        <ShopTheLookSection />
        <TrendingSection />
        <OnSaleSection />
      </div>
    </HomeWrapper>
  );
}
