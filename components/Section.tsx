import type { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  first = false,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-16 sm:py-20 ${first ? "" : "border-t border-line"}`}
    >
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display max-w-[24ch] text-3xl font-medium text-text sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            {intro}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
