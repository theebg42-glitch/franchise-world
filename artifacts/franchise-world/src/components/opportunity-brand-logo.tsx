import { cn } from "@/lib/utils";
import { darkBackgroundLogoIds, lightPlateLogoIds, opportunityLogos } from "@/data/brand-logos";
import type { Opportunity } from "@/data/opportunities";

type OpportunityBrandLogoProps = {
  brandId: Opportunity["id"];
  brandName: string;
  variant?: "card" | "modal";
  className?: string;
};

function logoBlendClass(brandId: Opportunity["id"]) {
  if (darkBackgroundLogoIds.has(brandId)) {
    return brandId === "tarzan" ? "mix-blend-lighten" : "mix-blend-screen";
  }
  if (lightPlateLogoIds.has(brandId)) {
    return "mix-blend-multiply";
  }
  return "";
}

export function OpportunityBrandLogo({ brandId, brandName, variant = "card", className }: OpportunityBrandLogoProps) {
  const logo = opportunityLogos[brandId];
  const isCard = variant === "card";
  const blendClass = logoBlendClass(brandId);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 group-hover:border-brand-red/25 group-hover:shadow-md",
        isCard ? "h-32 px-4 py-5 sm:h-36" : "min-h-[160px] px-5 py-6 sm:min-h-[180px]",
        className
      )}
    >
      {logo ? (
        <div
          className={cn(
            "relative isolate w-full max-w-[260px] bg-white",
            isCard ? "h-20 sm:h-24" : "h-24 sm:h-28"
          )}
        >
          <img
            src={logo}
            alt={`${brandName} logo`}
            className={cn("absolute inset-0 h-full w-full object-contain object-center", blendClass)}
          />
        </div>
      ) : (
        <span className="text-center text-sm font-semibold text-zinc-600">{brandName}</span>
      )}
    </div>
  );
}
