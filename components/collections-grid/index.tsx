import { UpperGrid } from "./upper-grid";
import { LowerGrid } from "./lower-grid";

export function CollectionsGrid() {
  return (
    <div className="flex flex-col gap-1 sm:block">
      <section className="w-full sm:h-[150dvh] pb-1">
        <UpperGrid />
      </section>
      <section className="w-full sm:h-[200dvh] pb-1">
        <LowerGrid />
      </section>
    </div>
  );
}
