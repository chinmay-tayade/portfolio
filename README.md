# chinmay-tayade.dev

Personal portfolio. Built with Next.js (App Router) + Tailwind CSS v4. Project
list is fetched from the GitHub API at build time (`lib/github.ts`), revalidated
hourly; flagship projects are curated by hand in `lib/featured.ts`.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — importing this repo on [Vercel](https://vercel.com/new) needs
no configuration, it's a stock Next.js app.
