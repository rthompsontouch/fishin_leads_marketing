"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BrandsTicker from "../components/BrandsTicker";
import OutcomesSection from "../components/OutcomesSection";
import TrustedByGrowthTeamsSection from "../components/TrustedByGrowthTeamsSection";
import { openSignupPanel } from "../lib/signupPanelEvents";

const FIRST_VISUAL_INTRO_MS = 1000;
const FIRST_VISUAL_STEP_MS = 5000;

const HERO_CONTENT = {
  title: "The CRM that works for you",
  subtitle:
    "Stop rebuilding systems for every client. Launch one powerful workflow engine built for agencies, teams, and modern service businesses.",
  visuals: [
    { title: "1. Integrate Your Websites Forms", image: "/images/hero/first_slide/integrations.png" },
    { title: "2. Capture The Leads", image: "/images/hero/first_slide/lead_capture.png" },
    { title: "3. Convert Leads To Customers", image: "/images/hero/first_slide/convert.png" },
  ],
};

export default function Home() {
  const [firstVisualIndex, setFirstVisualIndex] = useState(0);
  const [showFirstVisual, setShowFirstVisual] = useState(false);

  const getVisualPosition = (index, active, total) => {
    const leftIndex = (active - 1 + total) % total;
    const rightIndex = (active + 1) % total;

    if (index === active) return "is-front";
    if (index === leftIndex) return "is-back-left";
    if (index === rightIndex) return "is-back-right";
    return "is-hidden";
  };

  useEffect(() => {
    setShowFirstVisual(false);
    setFirstVisualIndex(0);

    let rotate = null;

    const showCarousel = setTimeout(() => {
      setShowFirstVisual(true);
    }, FIRST_VISUAL_INTRO_MS);

    const startRotate = setTimeout(() => {
      rotate = setInterval(() => {
        setFirstVisualIndex((prev) => (prev + 1) % HERO_CONTENT.visuals.length);
      }, FIRST_VISUAL_STEP_MS);
    }, FIRST_VISUAL_INTRO_MS);

    return () => {
      clearTimeout(showCarousel);
      clearTimeout(startRotate);
      if (rotate) clearInterval(rotate);
    };
  }, []);

  return (
    <>
      <section className="hero-root">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="/Images/hero/hero.png?v=20260322"
            alt=""
            fill
            priority
            className="hero-bg-image"
            sizes="100vw"
          />
        </div>
        <div className="hero-shell">
          <div className="hero-content mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="hero-frame is-entering">
            <div className="hero-copy">
              <h1 className="hero-title">{HERO_CONTENT.title}.</h1>
              <div className="hero-subgroup">
                <p className="hero-subtitle">{HERO_CONTENT.subtitle}</p>
                <div className="flex flex-wrap items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={openSignupPanel}
                    className="btn btn-primary btn-shimmer px-6 py-3 no-underline text-base"
                  >
                    Try Free
                  </button>
                  <a href="#features" className="btn btn-outline hero-outline-btn px-6 py-3 no-underline text-base">
                    Explore Features
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-visual hero-visual--cards">
              <div className={`hero-product-sequence ${showFirstVisual ? "is-visible" : ""}`} key={HERO_CONTENT.title}>
                <p className="hero-product-caption">{HERO_CONTENT.visuals[firstVisualIndex]?.title}</p>
                <div className="hero-carousel-stack">
                  {HERO_CONTENT.visuals.map((visual, index) => {
                    const position = getVisualPosition(index, firstVisualIndex, HERO_CONTENT.visuals.length);

                    return (
                      <article key={visual.title} className={`hero-carousel-card ${position}`}>
                        <div className="hero-product-shot-wrap">
                          <Image
                            src={visual.image}
                            alt={`${visual.title} product view`}
                            width={1200}
                            height={700}
                            className="hero-product-shot"
                            sizes="(max-width: 1024px) 100vw, 42rem"
                            priority={index === 0}
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          </div>

          <BrandsTicker variant="hero" />
        </div>
      </section>

      <OutcomesSection />

      <TrustedByGrowthTeamsSection />

      <section className="section-padding">
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-head">
            <h2>Product snapshot</h2>
            <p>Screenshot/content placeholders for pipeline, automation, reporting, and permissions.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="card p-6"><h3>Pipeline + inbox</h3><p>Track, assign, and act on every lead in one timeline.</p></article>
            <article className="card p-6"><h3>Workflow automation</h3><p>Trigger sequences and reminders based on lead behavior.</p></article>
            <article className="card p-6"><h3>Analytics + reporting</h3><p>Surface campaign and sales performance by channel and owner.</p></article>
            <article className="card p-6"><h3>Access + security</h3><p>Role-based controls for teams, clients, and sensitive data.</p></article>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[color:var(--color-surface-1)]">
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-head">
            <h2>Built for real use cases</h2>
            <p>Audience fit block placeholder to segment key buyers quickly.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card p-6"><h3>Agencies</h3><p>Spin up branded client workspaces without retooling every project.</p></article>
            <article className="card p-6"><h3>Consultants</h3><p>Standardize outreach and pipeline workflows across multiple accounts.</p></article>
            <article className="card p-6"><h3>In-house teams</h3><p>Unify sales and marketing execution in a single growth operating system.</p></article>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-padding">
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-head">
            <h2>Simple, scalable pricing</h2>
            <p>Pricing table scaffold — we can plug in real plan pricing/caps next.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <article className="card p-6"><h3>Freemium</h3><p>Best for trial and solo testing.</p></article>
            <article className="card p-6"><h3>Basic</h3><p>Great for growing teams.</p></article>
            <article className="card p-6"><h3>Advanced</h3><p>Built for automation-heavy operators.</p></article>
            <article className="card p-6"><h3>Enterprise</h3><p>For scale, controls, and support.</p></article>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[color:var(--color-surface-1)]">
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-head">
            <h2>Security and trust</h2>
            <p>Trust block scaffold for posture, controls, and resilience messaging.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card p-6"><h3>Role-based access</h3><p>Control who can view, edit, and export sensitive data.</p></article>
            <article className="card p-6"><h3>Audit visibility</h3><p>Track meaningful account activity across teams and workspaces.</p></article>
            <article className="card p-6"><h3>Reliable infrastructure</h3><p>Built for uptime, continuity, and day-to-day confidence.</p></article>
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding">
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-head">
            <h2>Frequently asked questions</h2>
            <p>FAQ scaffold to handle common objections and reduce friction.</p>
          </div>
          <div className="grid gap-3">
            <article className="card p-5"><h3>How long does setup take?</h3><p>Most teams can configure their first workspace in a day.</p></article>
            <article className="card p-5"><h3>Can I migrate existing data?</h3><p>Yes, migration paths can be handled during onboarding.</p></article>
            <article className="card p-5"><h3>Do you support multi-client workflows?</h3><p>Yes, this is a core use case for agencies and consultants.</p></article>
          </div>
        </div>
      </section>

      <section id="demo" className="section-padding bg-[color:var(--color-foreground)] text-[color:var(--color-background)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4">
          <h2>Ready to centralize your growth engine?</h2>
          <p className="max-w-2xl text-[color:color-mix(in_srgb,var(--color-background)_84%,transparent)]">
            Final CTA scaffold. We can tune this copy by audience and campaign source next.
          </p>
          <button type="button" onClick={openSignupPanel} className="btn btn-primary btn-shimmer px-5 py-2.5 no-underline text-sm">
            Try Free
          </button>
        </div>
      </section>

      <footer className="section-padding">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Fishin Leads. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
