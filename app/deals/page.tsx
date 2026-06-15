export default function Deals() {
  const deals = [
    { id: 1, title: "Premium Account", commission: "15%", value: "Valued at $199", tags: ["Hot", "Limited"] },
    { id: 2, title: "VIP Membership", commission: "20%", value: "Valued at $499", tags: ["Premium"] },
    { id: 3, title: "Course Bundle", commission: "25%", value: "Valued at $799", tags: ["New"] },
    { id: 4, title: "Lifetime License", commission: "30%", value: "Valued at $1,999", tags: ["Elite"] },
    { id: 5, title: "Consulting Package", commission: "12%", value: "Valued at $3,000", tags: ["Professional"] },
    { id: 6, title: "Team Plan", commission: "18%", value: "Valued at $599", tags: ["Popular"] },
  ];

  return (
    <div>
      <header className="header">
        <div className="container">
          <a href="/" style={{ color: "#fff", marginBottom: "10px", display: "block" }}>
            ← Back to Home
          </a>
          <h1>🎁 Exclusive Deals</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "40px" }}>
        <div className="hero">
          <h2>Limited Time Offers</h2>
          <p>
            Promote rotating deals and earn top commissions. These offers are optimized and updated daily.
          </p>
        </div>

        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <button style={{ padding: "8px 16px", background: "#667eea", color: "white", borderRadius: "6px" }}>
            All Deals
          </button>
          <button style={{ padding: "8px 16px", background: "#1a1a1a", color: "#aaa", borderRadius: "6px" }}>
            Highest Commission
          </button>
          <button style={{ padding: "8px 16px", background: "#1a1a1a", color: "#aaa", borderRadius: "6px" }}>
            Trending
          </button>
        </div>

        <div className="grid">
          {deals.map((deal) => (
            <div key={deal.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                <h3>{deal.title}</h3>
                <span style={{ background: "#667eea", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                  {deal.commission}
                </span>
              </div>
              <p style={{ color: "#aaa", marginBottom: "12px" }}>{deal.value}</p>
              <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
                {deal.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="cta-button" style={{ width: "100%" }}>
                Promote This Deal
              </button>
            </div>
          ))}
        </div>

        <section style={{ marginTop: "60px", textAlign: "center" }}>
          <h2 style={{ marginBottom: "24px" }}>Deals Updated Daily</h2>
          <p style={{ color: "#aaa", marginBottom: "24px" }}>
            Check back regularly for fresh opportunities. Subscribe to never miss a high-commission offer.
          </p>
          <button className="cta-button">Subscribe to Notifications</button>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Money Plug Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
