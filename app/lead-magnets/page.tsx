export default function LeadMagnets() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <a href="/" style={{ color: "#fff", marginBottom: "10px", display: "block" }}>
            ← Back to Home
          </a>
          <h1>🎯 Lead Magnets</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "40px" }}>
        <div className="hero">
          <h2>Capture High-Quality Leads</h2>
          <p>
            Deploy smart lead magnets with AI-powered targeting to maximize conversions and commissions.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>📧 Email Signup Forms</h3>
            <p>Deploy beautiful email capture forms with smart CTAs and personalization.</p>
          </div>
          <div className="card">
            <h3>📱 SMS Campaigns</h3>
            <p>Reach users instantly with targeted SMS offers and updates.</p>
          </div>
          <div className="card">
            <h3>🎁 Contest & Giveaways</h3>
            <p>Run viral contests to capture leads and drive referrals.</p>
          </div>
        </div>

        <section style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "24px" }}>Active Lead Magnets</h2>
          <div className="stats">
            <div className="stat-box">
              <div className="stat-number">2.5K</div>
              <div className="stat-label">Signups This Month</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">$8,450</div>
              <div className="stat-label">Revenue Generated</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">34%</div>
              <div className="stat-label">Conversion Rate</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">9.2K</div>
              <div className="stat-label">Impressions</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Money Plug Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
