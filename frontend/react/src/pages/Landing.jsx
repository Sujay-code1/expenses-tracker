import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0A0F", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-blur {
          backdrop-filter: blur(20px);
          background: rgba(10, 10, 15, 0.8);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .btn-primary {
          background: #7C6FFF;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          background: #9B91FF;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124, 111, 255, 0.35);
        }

        .btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.6);
          border: none;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: #fff; }

        .btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.06);
        }

        .glow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,111,255,0.12);
          border: 1px solid rgba(124,111,255,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 13px;
          color: #A99EFF;
          letter-spacing: 0.02em;
          margin-bottom: 28px;
        }
        .glow-pill-dot {
          width: 6px; height: 6px;
          background: #7C6FFF;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .hero-title .accent { color: #7C6FFF; }

        .hero-sub {
          font-size: 18px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 480px;
          font-weight: 300;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%);
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px 28px;
          flex: 1;
          min-width: 0;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: rgba(124,111,255,0.3); }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 4px; }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          background: rgba(124,111,255,0.06);
          border-color: rgba(124,111,255,0.2);
          transform: translateY(-2px);
        }
        .feature-icon {
          width: 44px; height: 44px;
          background: rgba(124,111,255,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          font-size: 20px;
        }
        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .feature-desc { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.65; }

        .dashboard-preview {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
        }
        .preview-bar {
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .preview-dot { width: 10px; height: 10px; border-radius: 50%; }

        .avatar-stack { display: flex; }
        .avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 2px solid #0A0A0F;
          margin-left: -8px;
          background: rgba(124,111,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          color: #A99EFF;
          font-weight: 500;
        }
        .avatar:first-child { margin-left: 0; }

        .bar-anim {
          animation: grow-bar 1.5s ease forwards;
          transform-origin: bottom;
        }
        @keyframes grow-bar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        .cta-section {
          background: rgba(124,111,255,0.08);
          border: 1px solid rgba(124,111,255,0.2);
          border-radius: 28px;
          padding: 64px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 40px; }
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; }
          .cta-section { padding: 40px 24px; }
          .hero-buttons { flex-direction: column; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 40px", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
        className={scrolled ? "nav-blur" : ""}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg, #7C6FFF, #A99EFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>₹</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>
            ExpenseTracker
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="btn-ghost" onClick={() => navigate("/login")}>Log in</button>
          <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => navigate("/signup")}>
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", paddingTop: "160px", paddingBottom: "100px", paddingLeft: "40px", paddingRight: "40px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-bg" />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(124,111,255,0.18)", top: -100, left: "30%", transform: "translateX(-50%)" }} />

        <div style={{ position: "relative", textAlign: "center" }}>
          <div className="glow-pill">
            <span className="glow-pill-dot" />
            Track every rupee, effortlessly
          </div>

          <h1 className="hero-title">
            Your money,<br />
            <span className="accent">finally organized.</span>
          </h1>

          <p className="hero-sub" style={{ margin: "24px auto 40px" }}>
            One dashboard for all your income, expenses, and budgets.
            Know exactly where your money goes — every single day.
          </p>

          <div className="hero-buttons" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Start for free →
            </button>
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "40px" }}>
            <div className="avatar-stack">
              {["A", "R", "S", "K"].map((l, i) => (
                <div className="avatar" key={i} style={{ background: ["rgba(124,111,255,0.3)", "rgba(76,195,144,0.3)", "rgba(255,183,94,0.3)", "rgba(255,107,107,0.3)"][i] }}>{l}</div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Trusted by <strong style={{ color: "rgba(255,255,255,0.7)" }}>10,000+</strong> users</p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div style={{ marginTop: "72px", maxWidth: 840, margin: "72px auto 0", position: "relative" }}>
          <div className="glow-orb" style={{ width: 400, height: 300, background: "rgba(124,111,255,0.12)", bottom: -60, left: "50%", transform: "translateX(-50%)" }} />
          <div className="dashboard-preview" style={{ position: "relative" }}>
            <div className="preview-bar">
              <div className="preview-dot" style={{ background: "#FF6B6B" }} />
              <div className="preview-dot" style={{ background: "#FFBA5A" }} />
              <div className="preview-dot" style={{ background: "#4CC390" }} />
              <span style={{ marginLeft: 10, fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>dashboard.expensetracker.app</span>
            </div>
            <div style={{ padding: "24px 28px" }}>
              {/* Mini dashboard */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Total Income", val: "₹84,500", color: "#4CC390", delta: "+12%" },
                  { label: "Total Expenses", val: "₹52,300", color: "#FF6B6B", delta: "+4%" },
                  { label: "Net Savings", val: "₹32,200", color: "#7C6FFF", delta: "+28%" },
                ].map((c, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{c.label}</p>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: c.color, letterSpacing: "-0.02em" }}>{c.val}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{c.delta} this month</p>
                  </div>
                ))}
              </div>
              {/* Mini bar chart */}
              <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Monthly Overview</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 70 }}>
                  {[
                    { inc: 65, exp: 55 }, { inc: 75, exp: 60 }, { inc: 55, exp: 70 },
                    { inc: 85, exp: 50 }, { inc: 90, exp: 65 }, { inc: 70, exp: 45 },
                  ].map((b, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
                      <div style={{ flex: 1, height: b.inc * 0.7 + "%", background: "rgba(76,195,144,0.6)", borderRadius: "3px 3px 0 0", minHeight: 8, maxHeight: "100%" }} />
                      <div style={{ flex: 1, height: b.exp * 0.7 + "%", background: "rgba(255,107,107,0.5)", borderRadius: "3px 3px 0 0", minHeight: 6, maxHeight: "100%" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10 }}>
                  {[["#4CC390", "Income"], ["#FF6B6B", "Expenses"]].map(([c, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="stats-row" style={{ display: "flex", gap: 16 }}>
          {[
            { num: "₹2.4Cr+", label: "Tracked every month" },
            { num: "10,000+", label: "Active users" },
            { num: "99.9%", label: "Uptime reliability" },
            { num: "4.9 ★", label: "User satisfaction" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "60px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, color: "#7C6FFF", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: 14 }}>Features</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Everything you need<br />to manage money
          </h2>
        </div>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "📊", title: "Smart Dashboard", desc: "Get a bird's eye view of your finances with charts and summaries that update in real time." },
            { icon: "💸", title: "Expense Tracking", desc: "Log expenses by category. Filter by month, search by keyword, and spot patterns instantly." },
            { icon: "📈", title: "Income Management", desc: "Track all income sources in one place. Understand what you earn vs what you spend." },
            { icon: "🎯", title: "Budget Goals", desc: "Set monthly budgets per category and get warned before you overspend." },
            { icon: "📅", title: "Transaction History", desc: "Full searchable history with month filters. Find any transaction in seconds." },
            { icon: "🔒", title: "Secure & Private", desc: "Your data stays yours. End-to-end security with auth-protected routes on every page." },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="cta-section">
          <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(124,111,255,0.2)", top: -80, left: "50%", transform: "translateX(-50%)" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
              Take control of your<br />finances today.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, marginBottom: 36, maxWidth: 420, margin: "0 auto 36px" }}>
              Join thousands who track smarter. Free to start, no card needed.
            </p>
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => navigate("/signup")}>
              Create free account →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(124,111,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>₹</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, opacity: 0.5 }}>ExpenseTracker</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2025 ExpenseTracker Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;