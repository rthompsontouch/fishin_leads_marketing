"use client";

import { useEffect, useRef, useState } from "react";

export default function OutcomesSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const metrics = [
    { value: "+38%", label: "Lead response speed" },
    { value: "+27%", label: "Close-rate lift" },
    { value: "45%", label: "Less manual ops" },
    { value: "2.1x", label: "Faster onboarding" },
  ];

  const outcomes = [
    {
      eyebrow: "Velocity",
      icon: "/images/icons/velocity.svg",
      title: "Launch client CRM faster",
      copy: "Spin up new client environments without rebuilding your operating model every time.",
      points: ["Reusable automation blocks", "Template-driven onboarding"],
    },
    {
      eyebrow: "Conversion",
      icon: "/images/icons/conversion.svg",
      title: "Turn pipeline into revenue",
      copy: "Keep high-intent opportunities moving with instant routing and automated follow-up.",
      points: ["Unified inbox + timeline", "No-miss handoff automations"],
    },
    {
      eyebrow: "Control",
      icon: "/images/icons/control.svg",
      title: "Run everything from one layer",
      copy: "Pipeline, reporting, communication, and permissions in one growth command center.",
      points: ["Consistent team execution", "Clear owner-level visibility"],
    },
  ];

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`section-padding outcomes-section relative overflow-hidden ${isInView ? "outcomes-in-view" : ""}`}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-[65%] rounded-full opacity-55 blur-3xl" style={{ background: "color-mix(in srgb, var(--color-primary) 24%, transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-35 blur-3xl" style={{ background: "color-mix(in srgb, var(--color-primary-light) 22%, transparent)" }} />

      <div className="mx-auto w-full max-w-7xl">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end outcomes-reveal outcomes-reveal-head">
          <div>
            <p className="mb-2 text-[0.73rem] font-bold uppercase tracking-[0.14em]" style={{ color: "color-mix(in srgb, var(--color-foreground) 74%, var(--color-primary) 26%)" }}>
              Revenue Outcomes
            </p>
            <h2 className="m-0 text-[clamp(2rem,2.8vw+0.8rem,3.65rem)] leading-[1.01] tracking-[-0.035em]">
              Outcomes that actually move revenue
            </h2>
            <p className="mt-3 max-w-3xl text-[1.03rem] leading-7" style={{ color: "color-mix(in srgb, var(--color-foreground) 70%, var(--color-border) 30%)" }}>
              Replace scattered tools and fragile workflows with one execution layer that compounds growth across every client account.
            </p>
          </div>

          <article
            className="group rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 outcomes-reveal outcomes-reveal-highlight"
            style={{
              background: "linear-gradient(155deg, color-mix(in srgb, var(--color-background) 90%, var(--color-surface-1) 10%) 0%, color-mix(in srgb, var(--color-surface-1) 72%, var(--color-background) 28%) 100%)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.11em]" style={{ color: "color-mix(in srgb, var(--color-foreground) 65%, var(--color-border) 35%)" }}>
              Average payback window
            </p>
            <p className="mt-2 mb-0 text-[clamp(2.1rem,2.4vw+1rem,3rem)] font-extrabold leading-none tracking-[-0.035em]" style={{ color: "color-mix(in srgb, var(--color-foreground) 84%, var(--color-primary) 16%)" }}>
              &lt; 90 days
            </p>
            <p className="mt-2 mb-0 text-sm leading-6" style={{ color: "color-mix(in srgb, var(--color-foreground) 69%, var(--color-border) 31%)" }}>
              Teams shift from setup drag to measurable lift fast.
            </p>
          </article>
        </div>

        <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              className={`group rounded-xl px-4 py-3 transition-transform duration-300 hover:-translate-y-1 outcomes-reveal outcomes-reveal-metric outcomes-reveal-metric-${index + 1}`}
              style={{
                background: "color-mix(in srgb, var(--color-background) 92%, var(--color-surface-1) 8%)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <p className="m-0 text-[1.36rem] font-bold leading-none tracking-[-0.02em]" style={{ color: "color-mix(in srgb, var(--color-foreground) 83%, var(--color-primary) 17%)" }}>
                {metric.value}
              </p>
              <p className="mt-1 mb-0 text-[0.84rem] leading-5" style={{ color: "color-mix(in srgb, var(--color-foreground) 70%, var(--color-border) 30%)" }}>
                {metric.label}
              </p>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-4 grid gap-4 lg:grid-cols-3">
          {outcomes.map((item, index) => (
            <article
              key={item.title}
              className={`group rounded-3xl p-[1px] transition-transform duration-300 hover:-translate-y-1 outcomes-reveal outcomes-reveal-card outcomes-reveal-card-${index + 1} outcome-modern-card outcome-modern-card-${index + 1}`}
            >
              <div
                className={`h-full rounded-[calc(1.5rem-1px)] p-5 outcome-modern-panel outcome-modern-panel-${index + 1}`}
              >
                <img src={item.icon} alt="" aria-hidden="true" className="outcome-card-icon" />
                <p className="m-0 text-[0.71rem] font-bold uppercase tracking-[0.12em]" style={{ color: "color-mix(in srgb, var(--color-foreground) 66%, var(--color-primary) 34%)" }}>
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 mb-0 text-[1.1rem] leading-6">{item.title}</h3>
                <p className="mt-2 mb-0 text-[0.95rem] leading-6" style={{ color: "color-mix(in srgb, var(--color-foreground) 71%, var(--color-border) 29%)" }}>
                  {item.copy}
                </p>

                <ul className="mt-3 grid gap-1.5 p-0" style={{ listStyle: "none" }}>
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[0.84rem] leading-5" style={{ color: "color-mix(in srgb, var(--color-foreground) 74%, var(--color-border) 26%)" }}>
                      <span aria-hidden="true" style={{ color: "color-mix(in srgb, var(--color-primary) 72%, var(--color-foreground) 28%)" }}>✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center outcomes-reveal outcomes-reveal-footer">
          <p className="m-0 text-[0.95rem] leading-6" style={{ color: "color-mix(in srgb, var(--color-foreground) 71%, var(--color-border) 29%)" }}>
            Built for teams that want measurable growth, not another dashboard.
          </p>
          <a href="#demo" className="btn btn-primary btn-shimmer px-5 py-2.5 no-underline text-sm font-semibold">
            See it in action
          </a>
        </div>
      </div>
    </section>
  );
}
