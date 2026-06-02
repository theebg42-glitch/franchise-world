import Image from "next/image";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Asset_4_2x-8b2af1b3-1f26-4899-b43c-a1a2050d00b6.png";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-brand-black">
        <Image src={logoMark} alt="Franchise World logo mark" fill className="object-cover object-center" />
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold text-brand-black">FranchiseWorld</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">Consultant</p>
      </div>
    </div>
  );
}
