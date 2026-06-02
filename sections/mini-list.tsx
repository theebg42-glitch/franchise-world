import { Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-3 space-y-2 text-sm text-zinc-700">
          {items.map((item) => (
            <p key={item} className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-brand-red" /> {item}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
