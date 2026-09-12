import type { Metadata } from "next";
import {
  PROFILE,
  IMPACT,
  EXPERIENCE,
  EDUCATION,
  LANGUAGES_SPOKEN,
  AVAILABILITY,
  SKILL_GROUPS,
} from "@/lib/resume";
import { FLAGSHIPS } from "@/lib/featured";
import { PROCESS } from "@/lib/process";
import ResumeActions from "@/components/ResumeActions";

export const metadata: Metadata = {
  title: "Résumé — Chinmay Tayade",
  description:
    "Founding Mobile Engineer. Android, Kotlin, Jetpack Compose, Kotlin Multiplatform. Offline-first fintech, ledgers, security by design.",
};

const STATES = [
  { key: "pending", label: "pending", means: "Local intent recorded. An opId is assigned before any network attempt.", transition: "Created on submit, once local validation passes." },
  { key: "syncing", label: "syncing", means: "A worker is attempting the request against the server.", transition: "Picked up by WorkManager once network is available." },
  { key: "confirmed", label: "confirmed", means: "Server accepted the operation — 2xx with a server id.", transition: "Terminal success." },
  { key: "conflict", label: "conflict", means: "Server returned 409 — two writers touched the same state.", transition: "User re-applies, returning to pending, or cancels to failed." },
  { key: "failed", label: "failed", means: "Terminal and non-retryable.", transition: "4xx immediately, or 5xx and IO once the backoff ceiling is hit." },
] as const;

const TEACHING_REPOS = [
  { name: "Learn-Kotlin-Coroutines", desc: "Coroutines through real Android examples — network calls, Room, timeouts and error handling." },
  { name: "Learn-Kotlin-Flow", desc: "Flow through real Android examples — operators, network, search, retry and error handling." },
  { name: "MVVM-Architecture-Android", desc: "MVVM the modern way — Kotlin, Dagger, Retrofit, Coroutines, Flow and StateFlow." },
  { name: "android-developer-roadmap", desc: "A stage-by-stage roadmap from Kotlin fundamentals to shipping on the Play Store." },
  { name: "from-java-to-kotlin", desc: "An interactive Java to Kotlin cheat sheet — every concept side by side, with the why." },
];

const REPO_GROUPS: { label: string; repos: { name: string; desc: string }[] }[] = [
  {
    label: "Fintech libraries and modules",
    repos: [
      { name: "ledger-core", desc: "Double-entry accounting ledger for Kotlin Multiplatform — balanced journal entries, idempotent postings, currency-safe money." },
      { name: "pay-sheet", desc: "Drop-in Compose payment sheet: card input with Luhn and network detection, a tokenization flow and a 3-D-Secure-style step-up. PCI-conscious by design." },
      { name: "offline-sync-engine", desc: "A small, tested engine for offline-first mutations: durable operation queue, exponential backoff with jitter, pluggable per-operation conflict resolution." },
    ],
  },
  {
    label: "Security, performance and craft",
    repos: [
      { name: "mobile-security-notes", desc: "Mobile-security building blocks with writeups: Keystore-backed encryption, BiometricPrompt with CryptoObject, log and PII redaction, certificate pinning." },
      { name: "android-perf-lab", desc: "Performance measurement infrastructure: Baseline Profiles and Macrobenchmark, with a methodology that reports device, build type and iteration count." },
      { name: "compose-lab", desc: "Small, honest Compose experiments — a custom layout, a recomposition study with real counts, a gesture component." },
    ],
  },
  {
    label: "Applications",
    repos: [
      { name: "Kaleido", desc: "Offline-first product catalog for Android, iOS and web — one Compose Multiplatform codebase." },
      { name: "Youtube-Video-Downloader", desc: "Android video and audio downloader — Compose UI, foreground download service, yt-dlp engine via Chaquopy." },
      { name: "Expense-Manager", desc: "Personal finance and expense management app built with Kotlin and Jetpack Compose." },
      { name: "Task-App", desc: "Productivity task manager built with Kotlin and Jetpack Compose." },
      { name: "portfolio", desc: "This site — Next.js, Tailwind, GitHub-driven project list." },
    ],
  },
  {
    label: "Machine learning, vision and robotics",
    repos: [
      { name: "Kryptografi", desc: "RSA encryption and decryption library for native application development, in Swift." },
      { name: "Number-Plate-detection", desc: "Automatic licence plate recognition using computer vision and machine learning." },
      { name: "Iris-recognition", desc: "Iris recognition using deep learning methods on JPEG-compressed images." },
      { name: "Hardware-trojan-detection", desc: "Hardware trojan detection in IC designs using ML and deep-learning models, with an IEEE-style report." },
      { name: "Object-Detection-and-Grasping-by-Robots", desc: "CNN-based object detection and grasping by a robot." },
      { name: "Computer-Vision-in-Robotics", desc: "How a robot can visualise and see objects in the real world." },
      { name: "Robotics-Arm-Newton-Raphson", desc: "Three-link planar robot manipulator." },
      { name: "Diabetes-Prediction", desc: "Data mining project on prediction of diabetes." },
      { name: "Data_mining_supply_chain_model", desc: "Supply chain modelling with data mining techniques." },
      { name: "E-TRASH-APP", desc: "An e-sanitization app initiative for clean and ideal cities." },
      { name: "network-security", desc: "Network security projects." },
    ],
  },
];

const git = (name: string) => `https://github.com/chinmay-tayade/${name}`;

export default function ResumePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .resume-page{
          --ink:#1B1E23;
          --ink-soft:#525A64;
          --ink-faint:#8C949C;
          --paper:#F6F3EC;
          --surface:#FFFFFF;
          --line:#E2DBCC;
          --line-soft:#ECE6D8;
          --accent:#B5481F;
          --accent-soft:#F1DFD4;

          --pending:#9A6B14;   --pending-bg:#F7EFDA;
          --syncing:#23639C;   --syncing-bg:#E2EEF6;
          --confirmed:#1E7A4F; --confirmed-bg:#E0EFE6;
          --conflict:#B5481F;  --conflict-bg:#F7E6DE;
          --failed:#9C2B3E;    --failed-bg:#F6E2E5;

          --serif:'Source Serif 4', Georgia, serif;
          --sans:'Archivo', system-ui, sans-serif;
          --mono:'JetBrains Mono', ui-monospace, monospace;

          background: var(--ink);
          color: var(--ink);
          min-height: 100vh;
          font-family: var(--serif);
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .resume-page *{ box-sizing:border-box; }

        /* top bar (hidden in print) */
        .resume-bar{
          position:sticky; top:0; z-index:20;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding:14px 24px; background:rgba(27,30,35,.82); backdrop-filter:blur(8px);
          border-bottom:1px solid rgba(255,255,255,.08);
          font-family:var(--mono); font-size:13px; color:#E8E4DC;
        }
        .resume-back{ color:#C9C2B6; text-decoration:none; }
        .resume-back:hover{ color:#fff; }
        .resume-bar-right{ display:flex; align-items:center; gap:16px; }
        .resume-hint{ font-size:11.5px; color:#8C949C; }
        .resume-print{
          font-family:var(--sans); font-weight:600; font-size:13.5px;
          background:var(--accent); color:#fff; border:none; border-radius:4px;
          padding:9px 16px; cursor:pointer; letter-spacing:.01em;
        }
        .resume-print:hover{ filter:brightness(1.08); }

        /* paper sheet */
        .sheet{
          max-width:860px; margin:40px auto 80px; padding:52px 60px;
          background:var(--surface); border:1px solid var(--line);
          border-radius:6px; box-shadow:0 30px 80px -40px rgba(0,0,0,.6);
          font-size:17px; line-height:1.62; font-variant-numeric:tabular-nums;
        }
        .sheet h1,.sheet h2,.sheet h3,.sheet h4{
          font-family:var(--sans); line-height:1.14; margin:0; letter-spacing:-0.015em;
        }
        .sheet p{ margin:0 0 .85em; max-width:62ch; }
        .sheet a{ color:inherit; text-decoration:underline; text-decoration-color:var(--line);
                  text-underline-offset:3px; text-decoration-thickness:1px; }
        .sheet a:hover{ text-decoration-color:var(--accent); color:var(--accent); }

        section.rv{ padding:34px 0; border-top:1px solid var(--line); }
        section.rv:first-of-type{ border-top:none; padding-top:0; }
        .rv-head{ display:flex; align-items:baseline; gap:12px; margin-bottom:20px; flex-wrap:wrap; }
        .rv-head h2{ font-size:22px; font-weight:700; }
        .rv-note{ font-family:var(--mono); font-size:11px; color:var(--ink-faint); }

        /* hero */
        .rv-hero h1{ font-size:clamp(40px,7vw,64px); font-weight:700; letter-spacing:-0.04em; }
        .rv-creed{ font-size:clamp(20px,2.5vw,25px); font-style:italic; color:var(--ink-soft);
                   margin:14px 0 6px; line-height:1.32; }
        .rv-role{ font-family:var(--sans); font-weight:500; font-size:14.5px; color:var(--ink-soft);
                  margin:12px 0 0; }
        .rv-lede{ font-size:18px; color:var(--ink); margin-top:22px; }

        /* state strip */
        .rv-strip{ margin:26px 0 4px; padding:15px 18px; background:var(--paper);
                   border:1px solid var(--line); border-radius:4px;
                   display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .rv-strip-label{ font-family:var(--mono); font-size:10.5px; color:var(--ink-faint);
                         text-transform:uppercase; letter-spacing:.08em; margin-right:4px; }
        .chip{ font-family:var(--mono); font-size:11px; font-weight:600; padding:4px 10px;
               border-radius:3px; border:1px solid currentColor; }
        .c-pending{ color:var(--pending); background:var(--pending-bg); }
        .c-syncing{ color:var(--syncing); background:var(--syncing-bg); }
        .c-confirmed{ color:var(--confirmed); background:var(--confirmed-bg); }
        .c-conflict{ color:var(--conflict); background:var(--conflict-bg); }
        .c-failed{ color:var(--failed); background:var(--failed-bg); }
        .rv-arrow{ color:var(--line); font-family:var(--mono); font-size:12px; }

        /* facts */
        .rv-facts{ display:flex; flex-wrap:wrap; margin-top:24px; border:1px solid var(--line);
                   border-radius:4px; overflow:hidden; background:var(--surface); }
        .rv-fact{ flex:1 1 150px; padding:15px 20px; border-right:1px solid var(--line-soft); }
        .rv-fact:last-child{ border-right:none; }
        .rv-fact b{ display:block; font-family:var(--sans); font-weight:700; font-size:22px;
                    letter-spacing:-0.02em; color:var(--ink); }
        .rv-fact span{ font-family:var(--mono); font-size:10px; color:var(--ink-faint);
                       text-transform:uppercase; letter-spacing:.06em; }

        /* experience */
        .job{ margin-bottom:34px; }
        .job:last-child{ margin-bottom:0; }
        .job-top{ display:flex; justify-content:space-between; align-items:baseline; gap:18px; flex-wrap:wrap; }
        .job h3{ font-size:20px; font-weight:600; }
        .job-when{ font-family:var(--mono); font-size:11px; color:var(--ink-faint); white-space:nowrap; }
        .job-org{ font-family:var(--sans); font-weight:500; font-size:14px; color:var(--syncing); margin:4px 0 2px; }
        .job-ctx{ font-size:14.5px; color:var(--ink-soft); margin-bottom:12px; }
        .job ul{ margin:0; padding:0; list-style:none; }
        .job li{ position:relative; padding-left:19px; margin-bottom:8px; max-width:62ch; }
        .job li::before{ content:""; position:absolute; left:0; top:.64em; width:7px; height:1.5px;
                         background:var(--accent); }
        .job li b{ font-family:var(--sans); font-weight:600; font-size:15px; color:var(--ink); }
        .tags{ margin-top:12px; display:flex; flex-wrap:wrap; gap:6px; }
        .tag{ font-family:var(--mono); font-size:10px; color:var(--ink-soft);
              border:1px solid var(--line); border-radius:3px; padding:2.5px 7px; background:var(--surface); }

        /* flagship work */
        .works{ display:grid; gap:14px; }
        .work{ background:var(--surface); border:1px solid var(--line); border-left:3px solid var(--line);
               border-radius:4px; padding:20px 22px; transition:border-color .15s ease, border-left-color .15s ease; }
        .work:hover{ border-left-color:var(--accent); }
        .work-top{ display:flex; align-items:center; gap:11px; flex-wrap:wrap; margin-bottom:8px; }
        .work h3{ font-size:17px; font-weight:600; font-family:var(--mono); letter-spacing:-0.01em; }
        .work h3 a{ text-decoration:none; color:var(--ink); }
        .work h3 a:hover{ color:var(--accent); }
        .status{ font-family:var(--mono); font-size:9.5px; font-weight:600; padding:3px 8px;
                 border-radius:3px; border:1px solid currentColor; text-transform:uppercase; letter-spacing:.05em; }
        .work-kind{ font-family:var(--mono); font-size:11px; color:var(--ink-faint); }
        .work p{ font-size:15.5px; margin-bottom:10px; color:var(--ink-soft); }

        /* failure case table */
        .tablewrap{ overflow-x:auto; border:1px solid var(--line); border-radius:4px; background:var(--surface); }
        table{ border-collapse:collapse; width:100%; min-width:560px; font-size:14.5px; }
        th,td{ text-align:left; padding:11px 16px; border-bottom:1px solid var(--line-soft); vertical-align:top; }
        thead th{ font-family:var(--sans); font-weight:600; font-size:11px; color:var(--ink-faint);
                  background:var(--paper); border-bottom:1px solid var(--line);
                  text-transform:uppercase; letter-spacing:.04em; }
        tbody tr:last-child td{ border-bottom:none; }
        td:first-child{ white-space:nowrap; }
        .note{ font-family:var(--mono); font-size:12px; color:var(--ink-soft);
               border-left:3px solid var(--accent); padding:4px 0 4px 16px; margin-top:16px; max-width:62ch; }

        /* process */
        .steps{ display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:1px;
                background:var(--line-soft); border:1px solid var(--line); border-radius:4px; overflow:hidden; }
        .step{ background:var(--surface); padding:16px 18px; }
        .step-n{ font-family:var(--mono); font-size:11px; color:var(--accent); font-weight:600; }
        .step h4{ font-size:15px; font-weight:600; margin:5px 0 5px; }
        .step p{ font-size:13.5px; margin:0; color:var(--ink-soft); }

        /* teaching repos */
        .repo{ display:grid; grid-template-columns:210px 1fr; gap:16px; padding:8px 0;
               border-bottom:1px solid var(--line-soft); align-items:baseline; }
        .repo:last-child{ border-bottom:none; }
        .repo-name{ font-family:var(--mono); font-size:13px; font-weight:600; }
        .repo-name a{ text-decoration:none; color:var(--ink); }
        .repo-name a:hover{ color:var(--accent); }
        .repo p{ margin:0; font-size:14.5px; color:var(--ink-soft); }

        /* repo index groups */
        .rgroup{ margin-bottom:24px; }
        .rgroup h4{ font-family:var(--sans); font-size:12px; font-weight:600; color:var(--ink-faint);
                    margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid var(--line-soft);
                    text-transform:uppercase; letter-spacing:.04em; }
        .rgrid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:10px; }
        .rcard{ background:var(--paper); border:1px solid var(--line); border-radius:4px; padding:12px 14px; }
        .rcard .rn{ font-family:var(--mono); font-size:12.5px; font-weight:600; }
        .rcard .rn a{ text-decoration:none; color:var(--ink); }
        .rcard .rn a:hover{ color:var(--accent); }
        .rcard p{ margin:4px 0 0; font-size:13px; color:var(--ink-soft); line-height:1.5; }

        /* stack */
        .stack-row{ display:grid; grid-template-columns:150px 1fr; gap:18px; padding:11px 0;
                    border-bottom:1px solid var(--line-soft); align-items:baseline; }
        .stack-row:last-child{ border-bottom:none; }
        .stack-row h4{ font-family:var(--sans); font-size:12px; font-weight:600; color:var(--ink-faint);
                       text-transform:uppercase; letter-spacing:.04em; }
        .stack-row div{ display:flex; flex-wrap:wrap; gap:6px; }

        /* contact */
        .contact-links{ display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
        .btn{ font-family:var(--sans); font-weight:600; font-size:14px; text-decoration:none;
              padding:10px 17px; border-radius:4px; border:1.5px solid var(--ink); }
        .btn-solid{ background:var(--ink); color:var(--paper); }
        .btn-ghost{ background:transparent; color:var(--ink); }
        .btn:hover{ opacity:.82; }

        @media (max-width:760px){
          .sheet{ padding:36px 26px; margin:20px auto 60px; }
          .repo{ grid-template-columns:1fr; gap:2px; }
          .stack-row{ grid-template-columns:1fr; gap:6px; }
          .resume-hint{ display:none; }
        }

        @media print{
          html, body{ background:#fff !important; color-scheme:light; }
          body::before{ display:none !important; }
          #page-root{ min-height:0; }
          .resume-page{ background:#fff; min-height:0; color:#000; }
          .resume-bar{ display:none !important; }
          .sheet{ max-width:none; margin:0; padding:0; border:none; border-radius:0;
                  box-shadow:none; font-size:12pt; line-height:1.5; }
          section.rv{ padding:16px 0; page-break-inside:avoid; }
          .job,.work,.rgroup,.tablewrap{ page-break-inside:avoid; }
          .sheet a{ text-decoration:none; color:inherit; }

          /* larger type across every section of the PDF */
          .rv-hero h1{ font-size:30pt; }
          .rv-creed{ font-size:15pt; }
          .rv-lede{ font-size:12.5pt; }
          .rv-head h2{ font-size:16pt; }
          .job h3{ font-size:15pt; }
          .work h3{ font-size:12.5pt; }
          .rv-fact b{ font-size:16pt; }
          .rv-role,.job-org,.job-ctx,.work p,table,.repo p,.rcard p,.step p,.btn{ font-size:11pt; }
          .job li b{ font-size:11.5pt; }
          .rv-note,.job-when,.work-kind,.rv-strip-label,.step-n{ font-size:9pt; }
          .rv-fact span,.status,.tag,thead th{ font-size:8.5pt; }
          .chip{ font-size:9.5pt; }
          .rv-arrow,.note,.rgroup h4,.stack-row h4{ font-size:9.5pt; }
          .repo-name,.rcard .rn{ font-size:10.5pt; }
        }
        @page{ margin:14mm; }
      `}</style>

      <div className="resume-page">
        <ResumeActions />

        <div className="sheet">
          {/* hero */}
          <section className="rv rv-hero">
            <h1>{PROFILE.name}</h1>
            <p className="rv-creed">“I design for the failure case first.”</p>
            <p className="rv-role">Founding Mobile Engineer — Android, Kotlin, Jetpack Compose, Kotlin Multiplatform</p>

            <div className="rv-strip" aria-label="Offline transfer states">
              <span className="rv-strip-label">transfer</span>
              <span className="chip c-pending">pending</span>
              <span className="rv-arrow">→</span>
              <span className="chip c-syncing">syncing</span>
              <span className="rv-arrow">→</span>
              <span className="chip c-confirmed">confirmed</span>
              <span className="rv-strip-label" style={{ marginLeft: 8 }}>no signal — queued, retrying with backoff + jitter</span>
            </div>

            <p className="rv-lede">
              Founding mobile engineer with four years taking consumer fintech from an empty repository
              to millions of users. Sole Android engineer at Bachatt, where I architected and shipped the
              app end to end through public launch and a $12M Series A. Deep Android, Kotlin and Compose
              expertise with production Kotlin Multiplatform, offline-first architecture and mobile security.
            </p>

            <div className="rv-facts">
              {IMPACT.map((f) => (
                <div className="rv-fact" key={f.label}>
                  <b>{f.value}</b>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* summary */}
          <section className="rv" id="summary">
            <div className="rv-head"><h2>Summary</h2></div>
            <p>
              I build mobile products that behave correctly when things go wrong — when the network drops
              mid-transfer, when two writers touch the same balance, when a retry storm would make a bad
              day worse. Four years of that has been in fintech, where the failure case is the product.
            </p>
            <p>{PROFILE.summary}</p>
          </section>

          {/* experience */}
          <section className="rv" id="experience">
            <div className="rv-head"><h2>Experience</h2><span className="rv-note">2022 — present</span></div>
            {EXPERIENCE.map((role) => (
              <article className="job" key={role.title}>
                <div className="job-top">
                  <h3>{role.title}</h3>
                  <span className="job-when">{role.start} — {role.end}</span>
                </div>
                <div className="job-org">{role.org} · {role.orgContext}</div>
                <ul>
                  {role.bullets.map((b, i) => {
                    const firstSpace = b.indexOf(".");
                    const lead = firstSpace > -1 ? b.slice(0, firstSpace + 1) : b;
                    const rest = firstSpace > -1 ? b.slice(firstSpace + 1) : "";
                    return (
                      <li key={i}>
                        {lead && <b>{lead} </b>}
                        {rest}
                      </li>
                    );
                  })}
                </ul>
                <div className="tags">
                  {role.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </section>

          {/* flagship work */}
          <section className="rv" id="flagship">
            <div className="rv-head"><h2>Flagship work</h2><span className="rv-note">all original, all with tests and CI</span></div>
            <div className="works">
              {FLAGSHIPS.map((f) => (
                <article className="work" key={f.slug}>
                  <div className="work-top">
                    <h3><a href={git(f.slug)}>{f.slug}</a></h3>
                    <span className={`status ${f.status === "shipped" ? "c-confirmed" : "c-pending"}`}>
                      {f.status === "shipped" ? "shipped" : "in progress"}
                    </span>
                    <span className="work-kind">{f.tagline}</span>
                  </div>
                  <p>{f.summary}</p>
                  <div className="tags">
                    {f.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* failure case */}
          <section className="rv" id="failure">
            <div className="rv-head"><h2>The failure case</h2><span className="rv-note">offline transfer state machine</span></div>
            <p>
              The user taps Send with no signal. A serious banking client does not spin, and does not lie —
              it persists the intent, shows the truth, and reconciles later. This is the state machine that
              sits behind that, extracted as a standalone library and wired into the banking app.
            </p>
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>State</th><th>Means</th><th>Transition</th></tr>
                </thead>
                <tbody>
                  {STATES.map((s) => (
                    <tr key={s.key}>
                      <td><span className={`chip c-${s.key}`}>{s.label}</span></td>
                      <td>{s.means}</td>
                      <td>{s.transition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">
              Idempotency key generated <em>before</em> any network attempt. Backoff with full jitter on
              retry. Conflict resolution decided per operation type — not one global rule. offline-sync-engine
              (9 tests, standalone) → wired into argent-android behind WorkManager.
            </p>
          </section>

          {/* process */}
          <section className="rv" id="process">
            <div className="rv-head"><h2>How I build</h2><span className="rv-note">every repo, same six steps</span></div>
            <p>No exceptions — including the ones nobody is grading.</p>
            <div className="steps">
              {PROCESS.map((p) => (
                <div className="step" key={p.n}>
                  <div className="step-n">{p.n}</div>
                  <h4>{p.title}</h4>
                  <p>{p.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* teaching repos */}
          <section className="rv" id="teaching">
            <div className="rv-head"><h2>Teaching repositories</h2><span className="rv-note">a wiki and a runnable example per stage</span></div>
            <p>Five repositories that teach Android in order, each pairing written explanation with code that runs.</p>
            {TEACHING_REPOS.map((r) => (
              <div className="repo" key={r.name}>
                <div className="repo-name"><a href={git(r.name)}>{r.name}</a></div>
                <p>{r.desc}</p>
              </div>
            ))}
          </section>

          {/* repo index */}
          <section className="rv" id="repos">
            <div className="rv-head"><h2>Repository index</h2><span className="rv-note">public repositories</span></div>
            {REPO_GROUPS.map((g) => (
              <div className="rgroup" key={g.label}>
                <h4>{g.label}</h4>
                <div className="rgrid">
                  {g.repos.map((r) => (
                    <div className="rcard" key={r.name}>
                      <div className="rn"><a href={git(r.name)}>{r.name}</a></div>
                      <p>{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* stack */}
          <section className="rv" id="stack">
            <div className="rv-head"><h2>Stack</h2></div>
            {SKILL_GROUPS.map((g) => (
              <div className="stack-row" key={g.label}>
                <h4>{g.label}</h4>
                <div>
                  {g.items.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </section>

          {/* education */}
          <section className="rv" id="education">
            <div className="rv-head"><h2>Education</h2></div>
            <article className="job">
              <div className="job-top">
                <h3>{EDUCATION.degree}</h3>
                <span className="job-when">{EDUCATION.start} — {EDUCATION.end}</span>
              </div>
              <div className="job-org">{EDUCATION.school}</div>
              <p className="job-ctx">{EDUCATION.note}</p>
            </article>
            <p className="note">
              {LANGUAGES_SPOKEN}. {AVAILABILITY}.
            </p>
          </section>

          {/* contact */}
          <section className="rv" id="contact">
            <div className="rv-head"><h2>Get in touch</h2></div>
            <p>Open to founding and senior mobile roles — Android, Kotlin Multiplatform, or anything offline-first and fintech-shaped.</p>
            <div className="contact-links">
              <a className="btn btn-solid" href={`mailto:${PROFILE.email}`}>Email me</a>
              <a className="btn btn-ghost" href={PROFILE.linkedin}>LinkedIn</a>
              <a className="btn btn-ghost" href={PROFILE.github}>GitHub</a>
              <a className="btn btn-ghost" href="/">Portfolio</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
