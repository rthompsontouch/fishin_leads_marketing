export default function TrustedByGrowthTeamsSection() {
  const testimonialRows = [
    {
      company: "JunkCaptainLLC",
      subtitle:
        "Fishin Leads is used to manage website lead flow end-to-end, including form submission visibility, fast outreach, contact-status tracking, interest-level tracking, job conversion workflows, unified notes and conversation logs across channels, promotional email campaigns, and employee assignment by client group.",
      testimonial:
        "Before Fishin Leads, we were juggling lead notes across different tools and losing momentum between first contact and close. Now every inquiry from our website lands in one place, my team knows exactly who owns each lead, and we can track progress from first message to booked job without chaos.",
      role: "Owner, JunkCaptainLLC",
    },
  ];

  return (
    <section className="section-padding trusted-section">
      <div className="mx-auto w-full max-w-7xl">
        <div className="trusted-shell">
          <div className="trusted-illustration" aria-hidden="true">
            <span className="trusted-orb trusted-orb-primary" />
            <span className="trusted-orb trusted-orb-accent" />
            <span className="trusted-ring" />
            <span className="trusted-line trusted-line-one" />
            <span className="trusted-line trusted-line-two" />
          </div>

          <div className="trusted-head">
            <p className="trusted-kicker">Trusted by growth teams</p>
            <h2>Proof that compounds across every client engagement</h2>
            <p>
              Fast-moving teams use Fishin Leads to standardize execution, increase conversion velocity, and operate from
              one measurable growth system.
            </p>
          </div>

          <div className="trusted-testimonials-list">
            {testimonialRows.map((item) => (
              <article key={item.company} className="trusted-testimonial-row">
                <div className="trusted-testimonial-left">
                  <h3>{item.company}</h3>
                  <p className="trusted-testimonial-subtitle">{item.subtitle}</p>

                  <article className="trusted-review-card" aria-label="Client review">
                    <p className="trusted-review-stars" aria-hidden="true">★★★★★</p>

                    <blockquote>
                      <p>“{item.testimonial}”</p>
                    </blockquote>

                    <p className="trusted-testimonial-role">{item.role}</p>
                  </article>
                </div>

                <div className="trusted-testimonial-right" aria-label="CRM implementation visuals">
                  <div className="trusted-product-shot trusted-product-shot-primary">
                    <span className="trusted-shot-tag">Lead Intake View</span>
                    <p>Website forms, contact timeline, and ownership handoff in one pipeline.</p>
                  </div>
                  <div className="trusted-product-shot trusted-product-shot-secondary">
                    <span className="trusted-shot-tag">Follow-up + Notes</span>
                    <p>Conversation logs, status progression, and employee assignment by client group.</p>
                  </div>
                  <div className="trusted-product-shot trusted-product-shot-tertiary">
                    <span className="trusted-shot-tag">Conversion + Campaigns</span>
                    <p>Job conversion tracking, customer records, and promotional email execution.</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
