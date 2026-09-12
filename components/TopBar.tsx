const LINKS = [
  { label: "github", href: "https://github.com/chinmay-tayade" },
  { label: "linkedin", href: "https://www.linkedin.com/in/chinmaytayade" },
  { label: "email", href: "mailto:chinmaytayade@outlook.com" },
];

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 font-mono text-sm">
        <span className="text-text">Chinmay Tayade</span>
        <nav className="flex gap-5">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-text-dim transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
