export default function Sync() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <a href="/" style={{ color: "#fff", marginBottom: "10px", display: "block" }}>
            ← Back to Home
          </a>
          <h1>📱 Multi-Platform Sync</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "40px" }}>
        <div className="hero">
          <h2>Manage All Channels at Once</h2>
          <p>
            Schedule and sync content across Twitter, LinkedIn, TikTok, Instagram, YouTube, and more.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Connected Platforms</h3>
            <ul style={{ listStyle: "none", color: "#aaa" }}>
              <li>✓ Twitter/X</li>
              <li>✓ LinkedIn</li>
              <li>✓ Instagram</li>
              <li>✓ TikTok</li>
              <li>✓ YouTube</li>
              <li>✓ Email</li>
            </ul>
          </div>
          <div className="card">
            <h3>🔄 Auto-Sync Settings</h3>
            <ul style={{ listStyle: "none", color: "#aaa" }}>
              <li>✓ Schedule posts daily</li>
              <li>✓ Optimize for each platform</li>
              <li>✓ Track cross-platform metrics</li>
              <li>✓ A/B test messaging</li>
            </ul>
          </div>
          <div className="card">
            <h3>📊 Sync Analytics</h3>
            <div style={{ color: "#667eea", fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
              1.2M
            </div>
            <p style={{ color: "#aaa" }}>Total Impressions This Month</p>
          </div>
        </div>

        <section style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "24px" }}>Create New Campaign</h2>
          <div className="card">
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                type="text"
                placeholder="Campaign Name"
                style={{
                  padding: "12px",
                  background: "#0f0f0f",
                  border: "1px solid #333",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
              <textarea
                placeholder="Content"
                rows={4}
                style={{
                  padding: "12px",
                  background: "#0f0f0f",
                  border: "1px solid #333",
                  color: "white",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                }}
              />
              <label style={{ display: "flex", gap: "8px", color: "#aaa" }}>
                <input type="checkbox" />
                Sync to all platforms
              </label>
              <button className="cta-button" style={{ width: "100%" }}>
                Schedule Campaign
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Money Plug Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
