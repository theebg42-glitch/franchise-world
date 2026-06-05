import { cn } from "@/lib/utils";

type ConsultantAvatarProps = {
  src: string;
  name: string;
  imageFile: string;
  className?: string;
};

export function ConsultantAvatar({ src, name, imageFile, className }: ConsultantAvatarProps) {
  return (
    <figure
      className={cn("mx-auto shrink-0 sm:mx-0", className)}
      aria-label={`${name} — ${imageFile}`}
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-premium ring-2 ring-brand-red/10 sm:h-28 sm:w-28">
        <img
          src={src}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </figure>
  );
}
