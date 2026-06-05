import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function BrandLogo({ variant = "dark", className }: BrandLogoProps) {
  const isLight = variant === "light";
  const textColor = isLight ? "text-white" : "text-brand-black";
  const subColor = isLight ? "text-white/60" : "text-zinc-500";

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark color={isLight ? "#ffffff" : "#0c1220"} accent="#D71920" />
      <div className="leading-tight">
        <p className={cn("text-[15px] font-extrabold tracking-tight", textColor)}>
          FranchiseWorld
        </p>
        <p className={cn("text-[9px] font-semibold uppercase tracking-[0.2em]", subColor)}>
          Consultant
        </p>
      </div>
    </div>
  );
}

function LogoMark({ color, accent }: { color: string; accent: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill={color} />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="16"
        fill={accent}
        letterSpacing="-0.5"
      >
        FW
      </text>
      <polygon points="23,7 27,7 25,11" fill={accent} />
    </svg>
  );
}
