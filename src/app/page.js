"use client";

import { useEffect, useMemo, useState } from "react";
import OutcomesSection from "../components/OutcomesSection";
import TrustedByGrowthTeamsSection from "../components/TrustedByGrowthTeamsSection";
import { openSignupPanel } from "../lib/signupPanelEvents";

const DISPLAY_MS = 8000;
const EXIT_MS = 700;

const heroSteps = [
  {
    title: "The CRM that works for you",
    subtitle:
      "Stop rebuilding systems for every client. Launch one powerful workflow engine built for agencies, teams, and modern service businesses.",
    cards: [
      { icon: "/globe.svg", title: "Pipeline Control", detail: "Track every lead from click to close." },
      { icon: "/window.svg", title: "Unified Inbox", detail: "Calls, forms, and SMS in one view." },
      { icon: "/file.svg", title: "Client Playbooks", detail: "Reusable automations for each niche." },
    ],
  },
  {
    title: "Affordable and convenient",
    subtitle:
      "Get enterprise-level CRM capabilities without enterprise-level complexity. One platform for your clients and your internal growth engine.",
    cards: [
      { icon: "/file.svg", title: "Simple Pricing", detail: "Scale seats and features as you grow." },
      { icon: "/next.svg", title: "Fast Setup", detail: "Go live quickly with proven templates." },
      { icon: "/window.svg", title: "Zero Chaos", detail: "No more scattered tools or manual busywork." },
    ],
  },
  {
    title: "Security is our top priority",
    subtitle:
      "Protect customer data, lock down access, and keep operations resilient with role-based permissions, audits, and secure architecture.",
    cards: [
      { icon: "/images/icons/access_control.svg", title: "Access Control", detail: "Granular permissions per team and client." },
      { icon: "/images/icons/activity_logs.svg", title: "Activity Logs", detail: "Visibility into critical account actions." },
      { icon: "/images/icons/data_reliability.svg", title: "Data Reliability", detail: "Built to keep your system dependable." },
    ],
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [securityVisibleCount, setSecurityVisibleCount] = useState(0);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, DISPLAY_MS);

    const nextTimer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroSteps.length);
      setIsExiting(false);
    }, DISPLAY_MS + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(nextTimer);
    };
  }, [activeIndex]);

  const activeStep = useMemo(() => heroSteps[activeIndex], [activeIndex]);
  const isSecurityStep = activeStep.title === "Security is our top priority";

  useEffect(() => {
    if (!isSecurityStep) {
      setSecurityVisibleCount(0);
      return;
    }

    setSecurityVisibleCount(1);

    const revealTimer = setInterval(() => {
      setSecurityVisibleCount((current) => {
        const next = current + 1;

        if (next >= activeStep.cards.length) {
          clearInterval(revealTimer);
          return activeStep.cards.length;
        }

        return next;
      });
    }, 650);

    return () => {
      clearInterval(revealTimer);
    };
  }, [isSecurityStep, activeStep]);

  return (
    <>
      <section className="hero-root">
        <div className="hero-overlay" />
        <div className="hero-content mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className={`hero-frame ${isExiting ? "is-exiting" : "is-entering"}`} key={activeStep.title}>
            <div className="hero-copy">
              <h1 className="hero-title">{activeStep.title}</h1>
              <div className="hero-subgroup">
                <p className="hero-subtitle">{activeStep.subtitle}</p>
                <div className="flex flex-wrap items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={openSignupPanel}
                    className="btn btn-primary btn-shimmer px-6 py-3 no-underline text-base"
                  >
                    Try Free
                  </button>
                  <a href="#features" className="btn btn-outline px-6 py-3 no-underline text-base">
                    Explore Features
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              {isSecurityStep ? (
                <div className="hero-security-grid">
                  {activeStep.cards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`hero-security-item hero-security-item-${index + 1} ${index < securityVisibleCount ? "is-visible" : ""}`}
                    >
                      <p className="hero-security-title">{card.title}</p>
                      <img
                        src={card.icon}
                        alt=""
                        aria-hidden="true"
                        className="hero-security-icon"
                      />
                    </article>
                  ))}
                </div>
              ) : (
                activeStep.cards.map((card, index) => (
                  <div
                    key={card.title}
                    className="hero-card"
                    style={{ "--card-delay": `${0.95 + index * 0.2}s` }}
                  >
                    <img src={card.icon} alt="" aria-hidden="true" className="h-5 w-5" />
                    <div>
                      <p className="hero-card-title">{card.title}</p>
                      <p className="hero-card-detail">{card.detail}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hero-dots" aria-label="Hero steps">
            {heroSteps.map((step, index) => (
              <span key={step.title} className={`hero-dot ${index === activeIndex ? "is-active" : ""}`} />
            ))}
          </div>
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
