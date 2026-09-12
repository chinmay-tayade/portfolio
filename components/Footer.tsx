export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 font-mono text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          chinmay<span className="text-accent">@</span>tayade ~ %{" "}
          <span className="animate-pulse">_</span>
        </p>
        <p>Built with Next.js, deployed on Vercel.</p>
      </div>
    </footer>
  );
}
