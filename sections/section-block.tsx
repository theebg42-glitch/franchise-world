export function SectionBlock({
  id,
  title,
  subtitle,
  children
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10">
      <h2 className="text-center text-3xl font-bold">{title}</h2>
      {subtitle ? <p className="mx-auto mt-2 max-w-2xl text-center text-zinc-600">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
