import { cn } from "@/lib/utils";
import wordmark from "@/assets/brand-logo-wordmark.png";

type BrandLogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function BrandLogo({ variant = "dark", className }: BrandLogoProps) {
  return (
    <img
      src={wordmark}
      alt="FranchiseWorld Consultant"
      className={cn(
        "h-8 w-auto object-contain object-left",
        variant === "light" && "brightness-0 invert",
        className
      )}
    />
  );
}
