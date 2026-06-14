export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1>💰 Money Plug Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <h2>Maximize Your Earnings</h2>
          <p>
            Unlock personalized referral opportunities, exclusive deals, and viral growth strategies tailored just for you.
          </p>
          <a href="/referrals" className="cta-button">
            Get Started →
          </a>
        </section>

        {/* Features */}
        <section>
          <h2 style={{ marginBottom: "24px" }}>Featured Services</h2>
          <div className="grid">
            <div className="card">
              <h3>🔗 Referral Network</h3>
              <p>Earn commissions by referring friends and generating high-quality leads.</p>
              <a href="/referrals" className="badge">
                Explore
              </a>
            </div>
            <div className="card">
              <h3>🎁 Exclusive Deals</h3>
              <p>Access rotating offers and promotions optimized for maximum value.</p>
              <a href="/deals" className="badge">
                Browse
              </a>
            </div>
            <div className="card">
              <h3>📊 Analytics Dashboard</h3>
              <p>Track your engagement, earnings, and performance metrics in real-time.</p>
              <a href="/analytics" className="badge">
                View Dashboard
              </a>
            </div>
            <div className="card">
              <h3>🚀 Growth Tools</h3>
              <p>Leverage AI-powered forecasting and content optimization for viral success.</p>
              <a href="/growth" className="badge">
                Learn More
              </a>
            </div>
            <div className="card">
              <h3>🎯 Lead Magnets</h3>
              <p>Capture high-quality leads with smart audience targeting.</p>
              <a href="/lead-magnets" className="badge">
                Get Started
              </a>
            </div>
            <div className="card">
              <h3>📱 Multi-Platform Sync</h3>
              <p>Seamlessly manage content and campaigns across all your channels.</p>
              <a href="/sync" className="badge">
                Configure
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 style={{ marginBottom: "24px", textAlign: "center" }}>Platform Stats</h2>
          <div className="stats">
            <div className="stat-box">
              <div className="stat-number">$2.5M+</div>
              <div className="stat-label">Total Earnings Paid Out</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">150K+</div>
              <div className="stat-label">Active Creators</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Programs</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Platform Uptime</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Money Plug Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
