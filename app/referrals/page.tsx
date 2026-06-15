export default function Referrals() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <a href="/" style={{ color: "#fff", marginBottom: "10px", display: "block" }}>
            ← Back to Home
          </a>
          <h1>🔗 Referral Network</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "40px" }}>
        <div className="hero">
          <h2>Start Earning Today</h2>
          <p>
            Share your unique referral link and earn recurring commissions from every successful referral.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Your Referral Link</h3>
            <div style={{ background: "#0f0f0f", padding: "16px", borderRadius: "8px", marginBottom: "16px", wordBreak: "break-all" }}>
              <code>https://moneyplughub.com/ref/YOUR_CODE_HERE</code>
            </div>
            <button className="cta-button" style={{ width: "100%" }}>
              Copy Link
            </button>
          </div>

          <div className="card">
            <h3>Commission Structure</h3>
            <ul style={{ listStyle: "none", color: "#aaa" }}>
              <li style={{ marginBottom: "12px" }}>✓ 10% of first purchase</li>
              <li style={{ marginBottom: "12px" }}>✓ 5% lifetime commission</li>
              <li style={{ marginBottom: "12px" }}>✓ Bonus: 25% for 10+ referrals</li>
              <li>✓ Instant payout options</li>
            </ul>
          </div>

          <div className="card">
            <h3>Top Performers This Month</h3>
            <div style={{ color: "#aaa" }}>
              <p>🥇 You: $3,250</p>
              <p>🥈 Sarah M: $2,890</p>
              <p>🥉 John P: $2,150</p>
            </div>
          </div>
        </div>

        <section style={{ marginTop: "60px" }}>
          <h2 style={{ marginBottom: "24px" }}>Tips for Success</h2>
          <div className="grid">
            <div className="card">
              <h3>📢 Share Strategically</h3>
              <p>Post on social media, email, and messaging apps where your audience is most active.</p>
            </div>
            <div className="card">
              <h3>🎨 Use Assets</h3>
              <p>Download banners, graphics, and video templates to make sharing easier.</p>
            </div>
            <div className="card">
              <h3>💬 Tell Your Story</h3>
              <p>Share your genuine experience and how the platform has helped you.</p>
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
