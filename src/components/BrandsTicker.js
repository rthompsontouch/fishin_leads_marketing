"use client";

/**
 * Infinite horizontal marquee of brand names (placeholder list — swap for real logos later).
 */
const BRANDS = [
  "Northwind",
  "Contoso",
  "Fabrikam",
  "Adventure Works",
  "Litware",
  "Wide World Importers",
  "Tailspin Toys",
  "Blue Yonder",
];

export default function BrandsTicker({ variant = "default" }) {
  const isHero = variant === "hero";
  return (
    <section
      className={`brands-ticker ${isHero ? "brands-ticker--hero" : ""}`}
      aria-label="Companies that trust Fishin Leads"
    >
      <p className="brands-ticker-label">Trusted by teams at</p>
      <div className="brands-ticker-viewport">
        <div className="brands-ticker-track">
          <ul className="brands-ticker-set">
            {BRANDS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <ul className="brands-ticker-set" aria-hidden="true">
            {BRANDS.map((name) => (
              <li key={`dup-${name}`}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
