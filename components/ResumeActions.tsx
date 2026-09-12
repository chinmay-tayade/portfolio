"use client";

import Link from "next/link";

export default function ResumeActions() {
  return (
    <div className="resume-bar">
      <Link href="/" className="resume-back">
        ← back to site
      </Link>
      <div className="resume-bar-right">
        <span className="resume-hint">
          saves via your browser&apos;s “Save as PDF”
        </span>
        <button
          type="button"
          onClick={() => window.print()}
          className="resume-print"
        >
          Download PDF ↓
        </button>
      </div>
    </div>
  );
}
