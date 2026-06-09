import { cn } from "@/lib/utils";
import { darkCardLogoIds, opportunityLogos } from "@/data/brand-logos";
import type { Opportunity } from "@/data/opportunities";

type OpportunityBrandLogoProps = {
  brandId: Opportunity["id"];
  brandName: string;
  variant?: "card" | "modal";
  className?: string;
};

export function OpportunityBrandLogo({ brandId, brandName, variant = "card", className }: OpportunityBrandLogoProps) {
  const logo = opportunityLogos[brandId];
  const isCard = variant === "card";
  const isDarkCard = darkCardLogoIds.has(brandId);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border transition duration-300",
        isDarkCard
          ? "border-zinc-700 bg-[#0c1220] group-hover:border-zinc-600"
          : "border-zinc-200/80 bg-white shadow-sm group-hover:border-brand-red/25 group-hover:shadow-md",
        isCard ? "h-32 px-5 py-4 sm:h-36" : "min-h-[160px] px-6 py-6 sm:min-h-[180px]",
        className
      )}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${brandName} logo`}
          className={cn(
            "w-full object-contain object-center",
            isCard ? "max-h-20 sm:max-h-24" : "max-h-24 sm:max-h-28"
          )}
        />
      ) : (
        <span className={cn("text-center text-sm font-semibold", isDarkCard ? "text-zinc-300" : "text-zinc-600")}>
          {brandName}
        </span>
      )}
    </div>
  );
}
