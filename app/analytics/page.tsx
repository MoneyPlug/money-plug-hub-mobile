export default function Analytics() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <a href="/" style={{ color: "#fff", marginBottom: "10px", display: "block" }}>
            ← Back to Home
          </a>
          <h1>📊 Analytics Dashboard</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "40px" }}>
        <div className="stats">
          <div className="stat-box">
            <div className="stat-number">$2,450</div>
            <div className="stat-label">This Month</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">142</div>
            <div className="stat-label">Referrals</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">18.5%</div>
            <div className="stat-label">Conversion Rate</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">1,245</div>
            <div className="stat-label">Link Clicks</div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: "40px" }}>
          <div className="card">
            <h3>Top Performing Deal</h3>
            <p style={{ color: "#aaa", marginBottom: "8px" }}>Premium Account</p>
            <div style={{ color: "#667eea", fontSize: "24px", fontWeight: "bold" }}>45 referrals</div>
          </div>
          <div className="card">
            <h3>Best Source</h3>
            <p style={{ color: "#aaa", marginBottom: "8px" }}>Twitter/X</p>
            <div style={{ color: "#667eea", fontSize: "24px", fontWeight: "bold" }}>62% traffic</div>
          </div>
          <div className="card">
            <h3>Pending Payouts</h3>
            <p style={{ color: "#aaa", marginBottom: "8px" }}>Available Next Week</p>
            <div style={{ color: "#667eea", fontSize: "24px", fontWeight: "bold" }}>$1,890</div>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2026 Money Plug Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
