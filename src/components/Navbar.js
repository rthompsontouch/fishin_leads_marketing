"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { openSignupPanel } from "../lib/signupPanelEvents";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMobileOpen]);

  const closeMobileNav = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="no-underline"
            aria-label="Fishin Leads home"
            onClick={closeMobileNav}
          >
            <Image
              src="/images/brand/fishinleads_logo.png"
              alt="Fishin Leads"
              width={360}
              height={86}
              priority
              className="h-14 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-base font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-slot-link no-underline"
                aria-label={item.label}
              >
                <span className="nav-slot-viewport" aria-hidden="true">
                  <span className="nav-slot-track">
                    <span className="nav-slot-text">{item.label}</span>
                    <span className="nav-slot-text">{item.label}</span>
                  </span>
                </span>
              </Link>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-shimmer px-4 py-2 no-underline text-sm font-bold"
              onClick={openSignupPanel}
            >
              Try Free
            </button>
          </nav>

          <button
            type="button"
            className="mobile-nav-toggle md:hidden"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </div>
      </header>

      <div className={`mobile-nav-shell ${isMobileOpen ? "is-open" : ""}`} aria-hidden={!isMobileOpen}>
        <button type="button" className="mobile-nav-backdrop" onClick={closeMobileNav} aria-label="Close navigation menu" />

        <section className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-nav-header">
            <Image
              src="/images/brand/fishinleads_logo.png"
              alt="Fishin Leads"
              width={360}
              height={86}
              className="h-14 w-auto"
            />
            <button type="button" className="mobile-nav-close" onClick={closeMobileNav} aria-label="Close navigation menu">
              ✕
            </button>
          </div>

          <nav className="mobile-nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMobileNav}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="btn btn-primary btn-shimmer w-full px-5 py-3 text-base"
            onClick={() => {
              closeMobileNav();
              openSignupPanel();
            }}
          >
            Try Free
          </button>
        </section>
      </div>
    </>
  );
}
