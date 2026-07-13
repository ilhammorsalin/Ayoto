import { UpperGrid } from "./upper-grid";
import { LowerGrid } from "./lower-grid";

export function CollectionsGrid() {
  return (
    <div className="flex flex-col gap-1 sm:block">
      <section className="w-full sm:h-[100dvh]">
        <UpperGrid />
      </section>
      <section className="w-full sm:h-[100dvh]">
        <LowerGrid />
      </section>
    </div>
  );
}
