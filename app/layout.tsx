import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Chinmay Tayade — Mobile Engineer",
  description:
    "Android · Kotlin · Jetpack Compose · Kotlin Multiplatform. Building B2C fintech-grade mobile apps — offline-first sync, ledgers, security by design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plexSans.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <div id="page-root" className="flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
