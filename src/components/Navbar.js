"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { openSignupPanel } from "../lib/signupPanelEvents";

const SCROLL_TRIGGER_PX = 24;

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_TRIGGER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar-scrolled" : "navbar-top"}`}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="no-underline"
          aria-label="Fishin Leads home"
        >
          <Image
            src="/images/brand/fishinleads_logo.png"
            alt="Fishin Leads"
            width={260}
            height={62}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
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
            className="btn btn-primary btn-shimmer px-4 py-2 no-underline text-sm"
            onClick={openSignupPanel}
          >
            Try Free
          </button>
        </nav>
      </div>
    </header>
  );
}
