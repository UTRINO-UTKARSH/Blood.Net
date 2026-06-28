import { useState, useEffect, useRef, useCallback } from "react";

// ── Colour & Design Tokens ─────────────────────────────────────────────────
const C = {
  red: "#C0392B",
  redBright: "#E74C3C",
  navy: "#0D1B2A",
  navyLight: "#1A2C3D",
  bg: "#080C10",
  surface: "#111827",
  surfaceHigh: "#1E2A38",
  text: "#F0EBE3",
  textMuted: "#8A9BB0",
  green: "#27AE60",
  greenBright: "#2ECC71",
  amber: "#F39C12",
  border: "rgba(255,255,255,0.08)",
};

// ── Utility ────────────────────────────────────────────────────────────────
const clsx = (...args) => args.filter(Boolean).join(" ");

function useTypewriter(text, speed = 28, start = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return { displayed, done };
}

function useIntersection(ref, opts = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...opts });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ── Shared UI ──────────────────────────────────────────────────────────────
function Badge({ children, color = C.red, style = {} }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 99,
      background: color + "22", color, border: `1px solid ${color}55`,
      fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", ...style
    }}>{children}</span>
  );
}

function BloodTypePill({ type, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 16px", borderRadius: 8, border: `2px solid ${active ? C.red : C.border}`,
      background: active ? C.red + "22" : C.surface, color: active ? C.red : C.textMuted,
      fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s",
    }}>{type}</button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: "0" }} />;
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
      padding: 24, transition: "border-color .2s", cursor: onClick ? "pointer" : "default",
      ...style
    }}>{children}</div>
  );
}

function PulsingDot({ color = C.green }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 10, height: 10, marginRight: 6 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%", background: color,
        animation: "pulse-ring 1.5s ease-out infinite", opacity: 0.6
      }} />
      <span style={{ position: "absolute", inset: 2, borderRadius: "50%", background: color }} />
    </span>
  );
}

function StatCard({ number, label, sublabel }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [count, setCount] = useState(0);
  const target = parseInt(number.replace(/\D/g, ""));
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [visible, target]);
  const formatted = number.includes("+") ? count.toLocaleString() + "+" : count.toLocaleString();
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "24px 16px" }}>
      <div style={{ fontSize: 42, fontWeight: 900, color: C.red, lineHeight: 1 }}>{visible ? formatted : "0"}</div>
      <div style={{ color: C.text, fontWeight: 700, marginTop: 6, fontSize: 16 }}>{label}</div>
      {sublabel && <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

// ── Emergency Bar ──────────────────────────────────────────────────────────
function EmergencyBar({ onNav }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: C.red, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 24px", height: 44,
      boxShadow: "0 2px 20px rgba(192,57,43,0.5)"
    }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ opacity: blink ? 1 : 0.3, transition: "opacity .2s" }}>🩸</span>
        EMERGENCY ACCESS — No login required
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onNav("emergency")} style={{
          background: "#fff", color: C.red, border: "none", borderRadius: 6,
          padding: "6px 16px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 0.5
        }}>FIND BLOOD NOW</button>
        <button onClick={() => onNav("find-hospital")} style={{
          background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 6, padding: "6px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>FIND HOSPITAL</button>
      </div>
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav({ currentPage, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = [
    { label: "How It Works", page: "how-it-works" },
    { label: "For Hospitals", page: "partner" },
    { label: "Blog", page: "blog" },
    { label: "About", page: "about" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 44, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(8,12,16,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all .3s", padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 60
    }}>
      <button onClick={() => onNav("home")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8
      }}>
        <span style={{ fontSize: 22 }}>🩸</span>
        <span style={{ color: C.text, fontWeight: 900, fontSize: 20, letterSpacing: "-0.5px" }}>
          Blood<span style={{ color: C.red }}>.net</span>
        </span>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {links.map(l => (
          <button key={l.page} onClick={() => onNav(l.page)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: currentPage === l.page ? C.red : C.textMuted,
            fontWeight: 600, fontSize: 14, padding: "8px 12px",
            transition: "color .2s",
          }}>{l.label}</button>
        ))}
        <button onClick={() => onNav("auth")} style={{
          background: "none", border: `1px solid ${C.border}`, borderRadius: 8,
          color: C.text, padding: "8px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer"
        }}>Login</button>
        <button onClick={() => onNav("auth")} style={{
          background: C.red, border: "none", borderRadius: 8,
          color: "#fff", padding: "8px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer"
        }}>Register as Donor</button>
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGES
// ══════════════════════════════════════════════════════════════════

// ── HOME PAGE ──────────────────────────────────────────────────────────────
const STORY_TEXT = `A 52-year-old man collapses on a street in Patna. His wife calls 108. She is put on hold for 4 minutes. A bystander flags down a private car. At the hospital: no ICU beds. They drive to a second hospital. The doctor needs 3 units of O-negative blood — immediately. The blood bank has 1 unit. The family calls relatives, who call friends. Nobody is O-negative or available. 90 minutes pass before compatible blood is found — from a donor 12 kilometres away, located via a WhatsApp group.\n\nThis is not an edge case. This is routine. Blood.net exists to end it.`;

function HomePage({ onNav }) {
  const storyRef = useRef(null);
  const storyVisible = useIntersection(storyRef);
  const { displayed, done } = useTypewriter(STORY_TEXT, 18, storyVisible);

  const howRef = useRef(null);
  const howVisible = useIntersection(howRef);

  const impactRef = useRef(null);
  const impactVisible = useIntersection(impactRef);

  const [activeBlood, setActiveBlood] = useState(null);
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div style={{ color: C.text }}>
      {/* ── Hero ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        {/* background glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.18) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <Badge color={C.red} style={{ marginBottom: 24 }}>India's Emergency Healthcare Coordination Platform</Badge>
        <h1 style={{
          fontSize: "clamp(44px, 8vw, 90px)", fontWeight: 900, lineHeight: 1.0,
          letterSpacing: "-2px", maxWidth: 900, margin: "0 auto 24px",
          color: C.text
        }}>
          When every second matters,<br />
          <span style={{ color: C.red }}>Blood.net</span> is already working.
        </h1>
        <p style={{
          fontSize: 20, color: C.textMuted, maxWidth: 600, lineHeight: 1.6, marginBottom: 40
        }}>
          Real-time blood availability. Live hospital capacity. Verified donor matching.
          A single platform connecting patients, donors, hospitals, and blood banks — in the moments that count.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          <button onClick={() => onNav("auth")} style={{
            background: C.red, border: "none", borderRadius: 10, color: "#fff",
            padding: "16px 32px", fontWeight: 800, fontSize: 17, cursor: "pointer",
            boxShadow: "0 4px 24px rgba(192,57,43,0.4)"
          }}>Register as Donor</button>
          <button onClick={() => onNav("partner")} style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text,
            padding: "16px 32px", fontWeight: 700, fontSize: 17, cursor: "pointer"
          }}>Add Your Hospital →</button>
        </div>
        <p style={{ color: C.textMuted, fontSize: 13 }}>
          Trusted by <strong style={{ color: C.text }}>200+ hospitals</strong> and <strong style={{ color: C.text }}>50,000+ donors</strong> across India
        </p>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: C.surface, padding: "60px 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
          maxWidth: 900, margin: "0 auto", gap: 8
        }}>
          <StatCard number="50000+" label="Verified Donors" sublabel="across India" />
          <StatCard number="200+" label="Hospital Partners" sublabel="and growing" />
          <StatCard number="48+" label="Blood Banks" sublabel="live on platform" />
          <StatCard number="12000+" label="Lives Coordinated" sublabel="since launch" />
        </div>
      </section>

      {/* ── Story Section ── */}
      <section ref={storyRef} style={{ padding: "100px 24px", maxWidth: 800, margin: "0 auto" }}>
        <Badge color={C.amber} style={{ marginBottom: 20 }}>The Problem — In Real Terms</Badge>
        <div style={{
          fontFamily: "Georgia, serif", fontSize: "clamp(16px, 2.5vw, 20px)",
          lineHeight: 1.85, color: C.textMuted, whiteSpace: "pre-wrap",
          borderLeft: `3px solid ${C.red}`, paddingLeft: 28
        }}>
          {displayed}
          {!done && storyVisible && (
            <span style={{ display: "inline-block", width: 2, height: "1em", background: C.red, animation: "blink 0.7s step-end infinite", verticalAlign: "bottom", marginLeft: 2 }} />
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section ref={howRef} style={{ padding: "100px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <Badge color={C.red} style={{ marginBottom: 16 }}>For Donors</Badge>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, marginBottom: 60, letterSpacing: "-1px" }}>
            Three steps. One life saved.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 24, textAlign: "left" }}>
            {[
              { n: "01", title: "Register your blood type & availability", body: "Tell us your blood type, location, and when you can be reached. Set availability windows — we'll only call when you're free.", icon: "🩸" },
              { n: "02", title: "Get notified when someone nearby needs you", body: "Instant push notification when a matching request is within your radius. One tap to accept or decline — no pressure, ever.", icon: "📲" },
              { n: "03", title: "Show up. Save a life.", body: "Head to the hospital. Donate. See your anonymised impact on your dashboard. The 90-day eligibility countdown starts automatically.", icon: "💉" },
            ].map((s, i) => (
              <Card key={i} style={{
                opacity: howVisible ? 1 : 0, transform: howVisible ? "translateY(0)" : "translateY(32px)",
                transition: `all .5s ease ${i * 0.15}s`
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ color: C.red, fontSize: 12, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10, color: C.text }}>{s.title}</div>
                <div style={{ color: C.textMuted, lineHeight: 1.7, fontSize: 15 }}>{s.body}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency Search Preview ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <Badge color={C.red} style={{ marginBottom: 16 }}>No Login Required</Badge>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 20 }}>
                Blood search in under 5 seconds.
              </h2>
              <p style={{ color: C.textMuted, lineHeight: 1.8, marginBottom: 28, fontSize: 16 }}>
                In an emergency, we do not make you create an account. Select your blood type, share your location, and see verified donors and hospitals on a live map — instantly.
              </p>
              <button onClick={() => onNav("emergency")} style={{
                background: C.red, border: "none", borderRadius: 10, color: "#fff",
                padding: "14px 28px", fontWeight: 800, fontSize: 16, cursor: "pointer"
              }}>Try Emergency Search →</button>
            </div>
            {/* Mock UI */}
            <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 24 }}>
              <div style={{ fontWeight: 700, marginBottom: 16, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.red }}>🩸</span> Select Blood Type
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
                {bloodTypes.map(t => (
                  <BloodTypePill key={t} type={t} active={activeBlood === t} onClick={() => setActiveBlood(t)} />
                ))}
              </div>
              <button onClick={() => { if (activeBlood) onNav("emergency"); }} style={{
                width: "100%", background: activeBlood ? C.red : C.surfaceHigh, border: "none",
                borderRadius: 10, color: activeBlood ? "#fff" : C.textMuted, padding: "14px",
                fontWeight: 800, fontSize: 16, cursor: activeBlood ? "pointer" : "default",
                transition: "all .2s"
              }}>
                {activeBlood ? `Find ${activeBlood} Blood Near Me →` : "Select a blood type above"}
              </button>
              {activeBlood && (
                <div style={{ marginTop: 16, padding: 12, background: C.green + "11", borderRadius: 8, border: `1px solid ${C.green}33` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.greenBright, fontSize: 13, fontWeight: 600 }}>
                    <PulsingDot color={C.greenBright} />
                    3 verified donors within 5km · 2 hospitals with stock
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── For Hospitals ── */}
      <section style={{ padding: "100px 24px", background: C.navyLight }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontWeight: 800, color: C.text, marginBottom: 20, fontSize: 16 }}>🏥 Hospital Dashboard — Live Preview</div>
            {[
              { label: "ICU Beds Available", value: "12 / 30", status: "warn" },
              { label: "General Ward", value: "45 / 100", status: "good" },
              { label: "Emergency Dept", value: "Operational", status: "good" },
              { label: "O-Negative Blood", value: "3 units", status: "warn" },
              { label: "Data Freshness", value: "Updated 22 min ago", status: "good" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none"
              }}>
                <span style={{ color: C.textMuted, fontSize: 14 }}>{r.label}</span>
                <span style={{
                  color: r.status === "good" ? C.greenBright : C.amber,
                  fontWeight: 700, fontSize: 14
                }}>{r.value}</span>
              </div>
            ))}
            <button style={{
              width: "100%", marginTop: 16, background: C.red, border: "none", borderRadius: 8,
              color: "#fff", padding: 12, fontWeight: 700, cursor: "pointer"
            }}>Save Capacity Update</button>
          </div>
          <div>
            <Badge color={C.green} style={{ marginBottom: 16 }}>For Hospitals & Blood Banks</Badge>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 20 }}>
              Reduce inbound calls by 60%.
            </h2>
            <p style={{ color: C.textMuted, lineHeight: 1.8, marginBottom: 24, fontSize: 16 }}>
              Hospital staff update ICU counts, blood availability, and specialist status in under 60 seconds per day. Patients find the right hospital before they arrive. Your team answers fewer calls asking about beds that don't exist.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Manual updates — no HIS integration required", "Multi-staff accounts with role-based access", "Data freshness indicators visible to patients", "Weekly referral reports and bed utilisation data"].map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: C.textMuted, fontSize: 15 }}>
                  <span style={{ color: C.greenBright, marginTop: 1, flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => onNav("partner")} style={{
              background: C.green, border: "none", borderRadius: 10, color: "#fff",
              padding: "14px 28px", fontWeight: 700, fontSize: 16, cursor: "pointer"
            }}>Partner With Us →</button>
          </div>
        </div>
      </section>

      {/* ── Blood Type Compatibility ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Badge color={C.red} style={{ marginBottom: 16 }}>Compatibility Intelligence</Badge>
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 8 }}>
            We match beyond exact type.
          </h2>
          <p style={{ color: C.textMuted, marginBottom: 40, fontSize: 16 }}>Our matching engine implements full transfusion compatibility — O-negative donors appear for any recipient in need.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { type: "O−", label: "Universal Donor", note: "Can give to all 8 types", color: C.red },
              { type: "AB+", label: "Universal Recipient", note: "Can receive from all 8 types", color: C.green },
              { type: "O+", label: "Most Common", note: "37% of population", color: C.amber },
              { type: "AB−", label: "Rarest", note: "<1% of population", color: "#9B59B6" },
            ].map((b, i) => (
              <Card key={i} style={{ textAlign: "center", borderColor: b.color + "44" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: b.color, marginBottom: 6 }}>{b.type}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{b.label}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{b.note}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "80px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginBottom: 48, letterSpacing: "-1px" }}>
            Real moments. Real people.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
            {[
              { name: "Kavitha R.", city: "Jaipur", role: "Family member", text: "I found a matching donor in 6 minutes. I was shaking and barely functional. Blood.net showed me exactly who to call and where to go.", avatar: "K" },
              { name: "Arjun Mehta", city: "Bengaluru", role: "Blood Donor", text: "I've donated 4 times through Blood.net. The notification told me exactly how far away I was. Seeing my impact on the dashboard keeps me coming back.", avatar: "A" },
              { name: "Dr. Sunita Rao", city: "Chennai", role: "Medical Superintendent", text: "We used to get 30 availability calls a day. Now that number is under 5. The dashboard takes my staff 45 seconds to update. It's become part of our morning round.", avatar: "S" },
            ].map((t, i) => (
              <Card key={i} style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: C.red + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.red, fontWeight: 900, fontSize: 18
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{t.name}</div>
                    <div style={{ color: C.textMuted, fontSize: 12 }}>{t.role} · {t.city}</div>
                  </div>
                </div>
                <div style={{ color: C.textMuted, lineHeight: 1.75, fontSize: 15, fontStyle: "italic" }}>"{t.text}"</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Impact ── */}
      <section ref={impactRef} style={{ padding: "60px 24px", background: C.red + "11", borderTop: `1px solid ${C.red}22`, borderBottom: `1px solid ${C.red}22` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
            <PulsingDot color={C.red} />
            <span style={{ color: C.textMuted, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Live Platform Activity</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { n: "14", label: "Active blood requests right now" },
              { n: "847", label: "Donors available in Rajasthan" },
              { n: "3", label: "Requests fulfilled in the last hour" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 40, fontWeight: 900, color: C.red }}>{impactVisible ? s.n : "–"}</div>
                <div style={{ color: C.textMuted, fontSize: 14, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 20 }}>
          The blood that saves a life<br />is already out there.
        </h2>
        <p style={{ color: C.textMuted, fontSize: 18, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
          It just needs a way to reach the person who needs it. Be part of the network.
        </p>
        <button onClick={() => onNav("auth")} style={{
          background: C.red, border: "none", borderRadius: 12, color: "#fff",
          padding: "20px 48px", fontWeight: 900, fontSize: 20, cursor: "pointer",
          boxShadow: "0 8px 32px rgba(192,57,43,0.45)", letterSpacing: "-0.5px"
        }}>Register as a Donor →</button>
      </section>
    </div>
  );
}

// ── EMERGENCY PAGE ─────────────────────────────────────────────────────────
function EmergencyPage() {
  const [bloodType, setBloodType] = useState(null);
  const [step, setStep] = useState("type"); // type | location | results
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const MOCK_HOSPITALS = [
    { name: "SMS Hospital, Jaipur", distance: "1.2 km", hasBlood: true, icu: "8 available", phone: "0141-256-0291", badge: "GOVT", verified: true },
    { name: "Fortis Escorts, Jaipur", distance: "3.4 km", hasBlood: true, icu: "3 available", phone: "0141-254-7000", badge: "PRIVATE", verified: true },
    { name: "SDMH Jaipur", distance: "5.1 km", hasBlood: false, icu: "12 available", phone: "0141-511-3000", badge: "PRIVATE", verified: true },
  ];
  const MOCK_DONORS = [
    { id: "D001", distance: "0.9 km", type: "O+", lastDonated: "4 months ago", verified: true },
    { id: "D002", distance: "2.3 km", type: bloodType || "O+", lastDonated: "6 months ago", verified: true },
    { id: "D003", distance: "4.1 km", type: bloodType || "A+", lastDonated: "3 months ago", verified: true },
  ];

  const doSearch = () => {
    setSearching(true);
    setTimeout(() => { setSearching(false); setResults(true); setStep("results"); }, 1600);
  };

  return (
    <div style={{ minHeight: "100vh", color: C.text, padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 12,
          padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12
        }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <div>
            <div style={{ fontWeight: 800, color: C.red }}>Emergency Blood Search</div>
            <div style={{ color: C.textMuted, fontSize: 13 }}>No login required. Results in seconds.</div>
          </div>
          <a href="tel:108" style={{
            marginLeft: "auto", background: C.red, color: "#fff", borderRadius: 8, padding: "8px 16px",
            fontWeight: 700, fontSize: 14, textDecoration: "none"
          }}>📞 Call 108</a>
        </div>

        {step !== "results" && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>Step 1 — Select Blood Type Needed</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {bloodTypes.map(t => (
                  <BloodTypePill key={t} type={t} active={bloodType === t} onClick={() => { setBloodType(t); setStep("location"); }} />
                ))}
              </div>
            </Card>
            {step === "location" && (
              <Card style={{ marginBottom: 16, borderColor: C.red + "55" }}>
                <div style={{ fontWeight: 700, marginBottom: 14, color: C.text }}>Step 2 — Share Your Location</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    placeholder="Enter area, hospital, or address…"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    style={{
                      flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
                      color: C.text, padding: "12px 16px", fontSize: 15, outline: "none"
                    }}
                  />
                  <button onClick={doSearch} style={{
                    background: C.red, border: "none", borderRadius: 8, color: "#fff",
                    padding: "12px 20px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
                  }}>Find Now</button>
                </div>
                <button onClick={doSearch} style={{
                  marginTop: 10, background: "none", border: `1px dashed ${C.border}`, borderRadius: 8,
                  color: C.textMuted, padding: "10px", width: "100%", cursor: "pointer", fontSize: 14
                }}>📍 Use My Current Location</button>
              </Card>
            )}
          </>
        )}

        {searching && (
          <Card style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ color: C.text, fontWeight: 700, marginBottom: 8 }}>Searching nearby donors & hospitals…</div>
            <div style={{ color: C.textMuted, fontSize: 14 }}>Checking live blood bank inventory</div>
          </Card>
        )}

        {results && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <PulsingDot color={C.greenBright} />
              <span style={{ color: C.greenBright, fontWeight: 700 }}>
                Found {bloodType || "matching"} blood — 2 hospitals, 3 donors within 5km
              </span>
              <button onClick={() => { setStep("type"); setResults(null); setBloodType(null); }}
                style={{ marginLeft: "auto", background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>
                New Search
              </button>
            </div>

            <div style={{ fontWeight: 700, color: C.textMuted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Hospitals with Blood Available</div>
            {MOCK_HOSPITALS.filter(h => h.hasBlood).map((h, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: C.text, fontSize: 16 }}>{h.name}</span>
                      {h.verified && <Badge color={C.green} style={{ fontSize: 10 }}>Verified</Badge>}
                      <Badge color={C.textMuted}>{h.badge}</Badge>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 13 }}>
                      📍 {h.distance} · ICU: {h.icu}
                    </div>
                  </div>
                  <a href={`tel:${h.phone}`} style={{
                    background: C.red, color: "#fff", borderRadius: 8, padding: "10px 16px",
                    fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap"
                  }}>📞 Call</a>
                </div>
              </Card>
            ))}

            <div style={{ fontWeight: 700, color: C.textMuted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", margin: "24px 0 12px" }}>Nearby Verified Donors</div>
            {MOCK_DONORS.map((d, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: C.text }}>Anonymous Donor</span>
                      <Badge color={C.red}>{d.type}</Badge>
                      {d.verified && <Badge color={C.green} style={{ fontSize: 10 }}>Verified</Badge>}
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 13 }}>
                      Within {d.distance} · Last donated {d.lastDonated}
                    </div>
                  </div>
                  <button style={{
                    background: C.surface, border: `1px solid ${C.red}`, color: C.red,
                    borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer"
                  }}>Request →</button>
                </div>
              </Card>
            ))}

            <Card style={{ marginTop: 20, background: C.amber + "11", borderColor: C.amber + "44" }}>
              <div style={{ fontWeight: 700, color: C.amber, marginBottom: 8 }}>Also consider</div>
              {MOCK_HOSPITALS.filter(h => !h.hasBlood).map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.textMuted, fontSize: 14 }}>{h.name} · {h.distance}</span>
                  <span style={{ color: C.amber, fontSize: 13, fontWeight: 600 }}>No blood stock — has ICU</span>
                </div>
              ))}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ── DONOR DASHBOARD ────────────────────────────────────────────────────────
function DonorDashboard() {
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState([
    { id: 1, type: "O+", distance: "2.3km", hospital: "SMS Hospital", urgency: "Immediate", status: "pending" },
    { id: 2, type: "O+", distance: "5.1km", hospital: "Fortis Escorts", urgency: "Urgent", status: "pending" },
  ]);

  const respond = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <div style={{ color: C.text, padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontWeight: 900, fontSize: 28, marginBottom: 24 }}>Donor Dashboard</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Eligibility card */}
          <Card style={{ background: C.green + "11", borderColor: C.green + "44" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Eligibility</div>
                <div style={{ fontWeight: 900, fontSize: 24, color: C.greenBright }}>Eligible to Donate</div>
                <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Last donated: 4 months ago · Blood type: <strong style={{ color: C.red }}>O+</strong></div>
              </div>
              <span style={{ fontSize: 36 }}>✅</span>
            </div>
          </Card>

          {/* Availability toggle */}
          <Card>
            <div style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Availability Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setAvailable(a => !a)} style={{
                width: 56, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
                background: available ? C.green : C.surfaceHigh, position: "relative", transition: "background .2s"
              }}>
                <div style={{
                  position: "absolute", top: 3, left: available ? 30 : 3, width: 22, height: 22,
                  borderRadius: "50%", background: "#fff", transition: "left .2s"
                }} />
              </button>
              <span style={{ fontWeight: 800, color: available ? C.greenBright : C.textMuted, fontSize: 18 }}>
                {available ? "Available" : "Unavailable"}
              </span>
            </div>
            <div style={{ color: C.textMuted, fontSize: 12, marginTop: 8 }}>
              {available ? "You will receive notifications for nearby requests" : "Notifications paused"}
            </div>
          </Card>
        </div>

        {/* Impact */}
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Your Impact</div>
            <Badge color={C.red}>Blood Hero</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "center" }}>
            {[{ n: "4", l: "Donations" }, { n: "4", l: "Lives Coordinated" }, { n: "2", l: "Badges Earned" }].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.red }}>{s.n}</div>
                <div style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Requests */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Requests in Your Area</div>
        {requests.map(r => (
          <Card key={r.id} style={{ marginBottom: 12, borderColor: r.status === "pending" ? C.red + "44" : C.border }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <Badge color={C.red}>{r.type}</Badge>
                  <Badge color={r.urgency === "Immediate" ? C.red : C.amber}>{r.urgency}</Badge>
                </div>
                <div style={{ color: C.text, fontWeight: 700 }}>{r.hospital}</div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>📍 {r.distance} away</div>
              </div>
              {r.status === "pending" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => respond(r.id, "accepted")} style={{
                    background: C.green, border: "none", borderRadius: 8, color: "#fff",
                    padding: "10px 16px", fontWeight: 700, cursor: "pointer"
                  }}>Accept</button>
                  <button onClick={() => respond(r.id, "declined")} style={{
                    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.textMuted,
                    padding: "10px 16px", fontWeight: 700, cursor: "pointer"
                  }}>Decline</button>
                </div>
              ) : (
                <Badge color={r.status === "accepted" ? C.green : C.textMuted}>
                  {r.status === "accepted" ? "✓ Accepted" : "Declined"}
                </Badge>
              )}
            </div>
          </Card>
        ))}

        {/* Notification Prefs */}
        <Card style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Notification Preferences</div>
          {[
            { label: "Contact window", value: "8:00 AM – 10:00 PM" },
            { label: "Days active", value: "Weekdays + Weekends" },
            { label: "Max radius", value: "10 km" },
            { label: "Emergency override", value: "On — always notify for Immediate" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ color: C.textMuted, fontSize: 14 }}>{p.label}</span>
              <span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{p.value}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── HOSPITAL DASHBOARD ─────────────────────────────────────────────────────
function HospitalDashboard() {
  const [capacity, setCapacity] = useState({ icu: 12, icuTotal: 30, general: 45, generalTotal: 100, emergency: true });
  const [blood, setBlood] = useState({ "A+": 8, "A-": 2, "B+": 5, "B-": 1, "AB+": 3, "AB-": 0, "O+": 12, "O-": 3 });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ color: C.text, padding: "24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 26 }}>🏥 Hospital Dashboard</h1>
            <div style={{ color: C.textMuted, fontSize: 14 }}>SMS Hospital, Jaipur · Last updated <strong style={{ color: C.greenBright }}>just now</strong></div>
          </div>
          <button onClick={save} style={{
            background: saved ? C.green : C.red, border: "none", borderRadius: 10,
            color: "#fff", padding: "14px 28px", fontWeight: 800, cursor: "pointer", fontSize: 16,
            transition: "background .3s"
          }}>{saved ? "✓ Saved!" : "Save Updates"}</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Bed Capacity */}
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Bed Availability</div>
            {[
              { label: "ICU Beds", avail: "icu", total: "icuTotal" },
              { label: "General Ward", avail: "general", total: "generalTotal" },
            ].map((b, i) => {
              const pct = Math.round(capacity[b.avail] / capacity[b.total] * 100);
              return (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: C.textMuted, fontSize: 14 }}>{b.label}</span>
                    <span style={{ fontWeight: 800, color: pct < 20 ? C.red : pct < 40 ? C.amber : C.greenBright }}>
                      {capacity[b.avail]} / {capacity[b.total]} available
                    </span>
                  </div>
                  <div style={{ height: 8, background: C.surfaceHigh, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: pct < 20 ? C.red : pct < 40 ? C.amber : C.green, borderRadius: 4, transition: "width .3s" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={() => setCapacity(c => ({ ...c, [b.avail]: Math.max(0, c[b.avail] - 1) }))} style={{ background: C.surfaceHigh, border: "none", borderRadius: 6, color: C.text, width: 32, height: 32, cursor: "pointer", fontWeight: 700 }}>−</button>
                    <button onClick={() => setCapacity(c => ({ ...c, [b.avail]: Math.min(c[b.total], c[b.avail] + 1) }))} style={{ background: C.surfaceHigh, border: "none", borderRadius: 6, color: C.text, width: 32, height: 32, cursor: "pointer", fontWeight: 700 }}>+</button>
                    <span style={{ color: C.textMuted, fontSize: 12, alignSelf: "center" }}>tap to adjust</span>
                  </div>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.textMuted, fontSize: 14 }}>Emergency Dept</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setCapacity(c => ({ ...c, emergency: !c.emergency }))} style={{
                  width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                  background: capacity.emergency ? C.green : C.surfaceHigh, position: "relative", transition: "background .2s"
                }}>
                  <div style={{ position: "absolute", top: 3, left: capacity.emergency ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                </button>
                <span style={{ color: capacity.emergency ? C.greenBright : C.textMuted, fontWeight: 700, fontSize: 14 }}>
                  {capacity.emergency ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </Card>

          {/* Specialists */}
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Specialist Availability</div>
            {[
              "Cardiologist", "Neurosurgeon", "Orthopaedic", "Radiologist", "Anaesthesiologist", "General Surgeon"
            ].map((sp, i) => {
              const [on, setOn] = useState(i < 3);
              return (
                <div key={sp} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.textMuted, fontSize: 14 }}>{sp}</span>
                  <button onClick={() => setOn(v => !v)} style={{
                    width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer",
                    background: on ? C.green : C.surfaceHigh, position: "relative", transition: "background .2s"
                  }}>
                    <div style={{ position: "absolute", top: 3, left: on ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                  </button>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Blood Inventory */}
        <Card>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Blood Bank Inventory</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {Object.entries(blood).map(([type, units]) => (
              <div key={type} style={{
                background: C.bg, borderRadius: 10, padding: 14, border: `1px solid ${units === 0 ? C.red + "66" : units < 3 ? C.amber + "44" : C.border}`,
                textAlign: "center"
              }}>
                <div style={{ fontWeight: 900, fontSize: 20, color: units === 0 ? C.red : C.text }}>{type}</div>
                <div style={{ fontWeight: 700, color: units === 0 ? C.red : units < 3 ? C.amber : C.greenBright, fontSize: 18, margin: "4px 0" }}>
                  {units} units
                </div>
                {units === 0 && <div style={{ color: C.red, fontSize: 10, fontWeight: 700 }}>OUT OF STOCK</div>}
                {units > 0 && units < 3 && <div style={{ color: C.amber, fontSize: 10, fontWeight: 700 }}>LOW STOCK</div>}
                <div style={{ display: "flex", gap: 4, marginTop: 8, justifyContent: "center" }}>
                  <button onClick={() => setBlood(b => ({ ...b, [type]: Math.max(0, b[type] - 1) }))} style={{ background: C.surfaceHigh, border: "none", borderRadius: 4, color: C.text, width: 24, height: 24, cursor: "pointer" }}>−</button>
                  <button onClick={() => setBlood(b => ({ ...b, [type]: b[type] + 1 }))} style={{ background: C.surfaceHigh, border: "none", borderRadius: 4, color: C.text, width: 24, height: 24, cursor: "pointer" }}>+</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Incoming Requests */}
        <Card style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Incoming Blood Requests via Blood.net</div>
          {[
            { type: "O-", units: 2, urgency: "Immediate", from: "Family — patient in surgery", time: "3 min ago" },
            { type: "A+", units: 1, urgency: "Urgent", from: "Trauma patient, ward 4", time: "12 min ago" },
          ].map((req, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <Badge color={C.red}>{req.type}</Badge>
                  <Badge color={req.urgency === "Immediate" ? C.red : C.amber}>{req.urgency}</Badge>
                  <span style={{ color: C.textMuted, fontSize: 12, alignSelf: "center" }}>{req.time}</span>
                </div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>{req.units} unit(s) · {req.from}</div>
              </div>
              <button style={{ background: C.red, border: "none", borderRadius: 8, color: "#fff", padding: "8px 16px", fontWeight: 700, cursor: "pointer" }}>
                Acknowledge
              </button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── AUTH PAGE ──────────────────────────────────────────────────────────────
function AuthPage({ onNav }) {
  const [mode, setMode] = useState("signup");
  const [role, setRole] = useState("donor");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", bloodType: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const sendOTP = () => setOtpSent(true);
  const next = () => { if (step < 3) setStep(s => s + 1); else onNav("dashboard"); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, color: C.text }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 40 }}>🩸</span>
          <h1 style={{ fontWeight: 900, fontSize: 28, marginTop: 8 }}>
            {mode === "signup" ? "Join Blood.net" : "Welcome back"}
          </h1>
          <div style={{ color: C.textMuted, marginTop: 4 }}>
            {mode === "signup" ? "Register as a donor in under 3 minutes." : "Login to your account"}
          </div>
        </div>

        <Card>
          <div style={{ display: "flex", gap: 4, background: C.bg, borderRadius: 8, padding: 4, marginBottom: 24 }}>
            {["signup", "login"].map(m => (
              <button key={m} onClick={() => { setMode(m); setStep(1); }} style={{
                flex: 1, padding: "10px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                background: mode === m ? C.surface : "transparent", color: mode === m ? C.text : C.textMuted,
                transition: "all .2s"
              }}>{m === "signup" ? "Register" : "Login"}</button>
            ))}
          </div>

          {mode === "signup" && (
            <>
              {/* Role selector */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: C.textMuted, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>I am a</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["donor", "patient", "hospital"].map(r => (
                    <button key={r} onClick={() => setRole(r)} style={{
                      flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${role === r ? C.red : C.border}`,
                      background: role === r ? C.red + "18" : C.bg, color: role === r ? C.red : C.textMuted,
                      fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all .2s", textTransform: "capitalize"
                    }}>{r}</button>
                  ))}
                </div>
              </div>

              {step === 1 && (
                <>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name</label>
                    <input placeholder="Arjun Kapoor" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Mobile Number</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none" }} />
                      <button onClick={sendOTP} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.textMuted, padding: "12px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                        {otpSent ? "Resend" : "Send OTP"}
                      </button>
                    </div>
                  </div>
                  {otpSent && (
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>OTP</label>
                      <input placeholder="Enter 6-digit OTP" maxLength={6} value={form.otp} onChange={e => setForm(f => ({ ...f, otp: e.target.value }))}
                        style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none", letterSpacing: 8, boxSizing: "border-box" }} />
                    </div>
                  )}
                </>
              )}

              {step === 2 && role === "donor" && (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Your Blood Type</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                      {bloodTypes.map(t => (
                        <BloodTypePill key={t} type={t} active={form.bloodType === t} onClick={() => setForm(f => ({ ...f, bloodType: t }))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Availability Windows</div>
                    <div style={{ color: C.textMuted, fontSize: 13, background: C.bg, borderRadius: 8, padding: 12 }}>
                      Default: 8 AM – 10 PM, all days. You can customise this in your dashboard.
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>You're registered!</div>
                  <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>
                    Welcome to the network, {form.name || "Donor"}. Your blood type has been added. You'll receive a notification when someone nearby needs your help.
                  </div>
                </div>
              )}

              <button onClick={next} style={{
                width: "100%", marginTop: 20, background: C.red, border: "none", borderRadius: 10,
                color: "#fff", padding: 14, fontWeight: 800, fontSize: 16, cursor: "pointer"
              }}>
                {step === 3 ? "Go to Dashboard →" : step === 2 ? "Complete Registration →" : otpSent ? "Verify & Continue →" : "Continue →"}
              </button>

              <div style={{ marginTop: 16, textAlign: "center" }}>
                <button onClick={() => {}} style={{
                  background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10,
                  color: C.text, padding: "12px 20px", width: "100%", cursor: "pointer", fontWeight: 600, fontSize: 14
                }}>Continue with Google</button>
              </div>
            </>
          )}

          {mode === "login" && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Email or Mobile</label>
                <input placeholder="you@example.com or +91…"
                  style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
                <input type="password" placeholder="••••••••"
                  style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => onNav("dashboard")} style={{
                width: "100%", background: C.red, border: "none", borderRadius: 10,
                color: "#fff", padding: 14, fontWeight: 800, fontSize: 16, cursor: "pointer"
              }}>Login →</button>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>Forgot password?</button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ── HOW IT WORKS PAGE ──────────────────────────────────────────────────────
function HowItWorksPage() {
  const sections = [
    { title: "For Donors", color: C.red, icon: "🩸", steps: [
      { n: "01", t: "Register", b: "Sign up with your blood type, city, and availability windows. Takes under 3 minutes. No documents needed in V1." },
      { n: "02", t: "Get Notified", b: "When a matching request arrives within your radius, you receive a push notification — only during your set availability window." },
      { n: "03", t: "Respond", b: "One tap to accept. You get the hospital address and blood type needed. Your identity remains protected." },
      { n: "04", t: "Donate & See Impact", b: "Donate at the hospital. Your dashboard updates automatically. See your 90-day eligibility countdown and impact metrics." },
    ]},
    { title: "For Patients & Families", color: C.amber, icon: "🏥", steps: [
      { n: "01", t: "No Login Required", b: "Go to /emergency. Select blood type. Grant location or type your address. Results appear in under 5 seconds." },
      { n: "02", t: "See Live Results", b: "Map and list of nearby hospitals with blood in stock, and verified donors in the area. One-tap call or message." },
      { n: "03", t: "Track Your Request", b: "If you submit a formal request, track its status in real time: open → matched → donor en route → confirmed." },
      { n: "04", t: "Emergency SOS", b: "One-tap SOS broadcasts your location and blood need to all nearby donors and hospitals simultaneously." },
    ]},
    { title: "For Hospitals", color: C.green, icon: "🏨", steps: [
      { n: "01", t: "Partner with Us", b: "Submit a partnership form. Our team onboards you within 48 hours. No IT integration required." },
      { n: "02", t: "Update Capacity Daily", b: "Staff update ICU availability, ward counts, specialist status — 60 seconds per day on any device." },
      { n: "03", t: "Reduce Inbound Calls", b: "Patients find your hospital before calling. They arrive knowing you can help, not hoping you can." },
      { n: "04", t: "Get Reports", b: "Weekly referral data, bed utilisation reports, and blood demand forecasts. Exportable for internal use." },
    ]},
  ];

  return (
    <div style={{ color: C.text, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16 }}>How Blood.net works</h1>
          <p style={{ color: C.textMuted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
            Three entry points. One coordinated outcome. Here's exactly what happens when you use Blood.net.
          </p>
        </div>
        {sections.map((s, si) => (
          <div key={si} style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 32 }}>{s.icon}</span>
              <h2 style={{ fontWeight: 900, fontSize: 28, color: s.color }}>{s.title}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16 }}>
              {s.steps.map((step, i) => (
                <Card key={i} style={{ borderTop: `3px solid ${s.color}` }}>
                  <div style={{ color: s.color, fontWeight: 900, fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>{step.n}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: C.text }}>{step.t}</div>
                  <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{step.b}</div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Blood Type Chart */}
        <Card style={{ marginBottom: 40 }}>
          <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 20 }}>Blood Type Compatibility Matrix</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>Donor Type</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>Can Donate To</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { d: "O−", to: "All 8 types", note: "Universal Donor", color: C.red },
                  { d: "O+", to: "O+, A+, B+, AB+", note: "Most common" },
                  { d: "A−", to: "A−, A+, AB−, AB+", note: "" },
                  { d: "A+", to: "A+, AB+", note: "" },
                  { d: "B−", to: "B−, B+, AB−, AB+", note: "" },
                  { d: "B+", to: "B+, AB+", note: "" },
                  { d: "AB−", to: "AB−, AB+", note: "" },
                  { d: "AB+", to: "AB+ only", note: "Universal Recipient", color: C.green },
                ].map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : C.surfaceHigh + "55" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 900, color: r.color || C.text }}>{r.d}</td>
                    <td style={{ padding: "10px 12px", color: C.textMuted }}>{r.to}</td>
                    <td style={{ padding: "10px 12px" }}>{r.note && <Badge color={r.color || C.textMuted} style={{ fontSize: 10 }}>{r.note}</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── PARTNER PAGE ───────────────────────────────────────────────────────────
function PartnerPage() {
  const [form, setForm] = useState({ name: "", role: "", phone: "", email: "", hospital: "", city: "", type: "private" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ color: C.text, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Badge color={C.green} style={{ marginBottom: 16 }}>For Hospitals & Blood Banks</Badge>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Partner with Blood.net
          </h1>
          <p style={{ color: C.textMuted, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
            Join 200+ hospitals already on the platform. Reduce inbound calls, serve patients better, get real-time referrals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, marginBottom: 20 }}>What you get</h2>
            {[
              { icon: "📉", title: "60% fewer availability calls", body: "Patients find your bed count and blood stock before they call you." },
              { icon: "📊", title: "Weekly referral reports", body: "See how many patients Blood.net directed to your hospital and from where." },
              { icon: "🏆", title: "Verified Hospital badge", body: "Displayed to every patient searching in your area — builds trust and drives footfall." },
              { icon: "💉", title: "Blood bank coordination", body: "Link your blood bank directly or update inventory manually in 60 seconds." },
              { icon: "🔐", title: "Multi-staff accounts", body: "Different staff members can update different data — shift-based access included." },
              { icon: "📤", title: "Compliance-ready exports", body: "Download blood inventory logs in PDF/CSV for regulatory documentation." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4, color: C.text }}>{f.title}</div>
                  <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}

            <Card style={{ background: C.green + "11", borderColor: C.green + "33", marginTop: 32 }}>
              <div style={{ fontWeight: 800, color: C.greenBright, marginBottom: 8 }}>Onboarding timeline</div>
              {[
                { step: "Submit form", time: "Today" },
                { step: "Platform team review", time: "Within 48 hours" },
                { step: "Account created + onboarding call", time: "Day 2-3" },
                { step: "First live update", time: "Day 4" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.textMuted, fontSize: 14 }}>{s.step}</span>
                  <span style={{ color: C.greenBright, fontWeight: 600, fontSize: 13 }}>{s.time}</span>
                </div>
              ))}
            </Card>
          </div>

          <Card>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>Request Partnership</div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>Request received!</div>
                <div style={{ color: C.textMuted, fontSize: 14 }}>Our team will contact you within 48 hours to complete onboarding.</div>
              </div>
            ) : (
              <>
                {[
                  { label: "Your Name", key: "name", placeholder: "Dr. Meenakshi Rajan" },
                  { label: "Your Role", key: "role", placeholder: "Medical Superintendent" },
                  { label: "Hospital / Blood Bank Name", key: "hospital", placeholder: "City Hospital" },
                  { label: "City", key: "city", placeholder: "Jaipur" },
                  { label: "Phone", key: "phone", placeholder: "+91 98765 43210" },
                  { label: "Email", key: "email", placeholder: "admin@hospital.com" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                      style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Institution Type</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["hospital", "bloodbank"].map(t => (
                      <button key={t} onClick={() => setForm(v => ({ ...v, type: t }))} style={{
                        flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${form.type === t ? C.green : C.border}`,
                        background: form.type === t ? C.green + "18" : C.bg, color: form.type === t ? C.greenBright : C.textMuted,
                        fontWeight: 700, fontSize: 13, cursor: "pointer", textTransform: "capitalize"
                      }}>{t === "bloodbank" ? "Blood Bank" : "Hospital"}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSent(true)} style={{
                  width: "100%", background: C.green, border: "none", borderRadius: 10,
                  color: "#fff", padding: 14, fontWeight: 800, fontSize: 16, cursor: "pointer"
                }}>Submit Partnership Request →</button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ─────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ color: C.text, padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 56 }}>🩸</span>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-1.5px", marginTop: 16, marginBottom: 16 }}>
            Why Blood.net exists
          </h1>
        </div>

        <blockquote style={{ borderLeft: `3px solid ${C.red}`, paddingLeft: 24, marginBottom: 48 }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: 1.8, color: C.textMuted, fontStyle: "italic" }}>
            "Medical emergencies are coordination failures, not resource failures. In most cases, the blood exists. The hospital bed exists. The ambulance is reachable. What fails is the information layer that connects the person in crisis with the resource that can help them."
          </p>
        </blockquote>

        <div style={{ color: C.textMuted, lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
          <p style={{ marginBottom: 20 }}>Blood.net was built from a single observation: India does not have a blood supply problem. It has a blood coordination problem. The donors exist. The hospitals exist. The life-saving units of O-negative blood are sitting in a refrigerator somewhere within 10 kilometres of the person who needs them — and neither party knows the other exists.</p>
          <p style={{ marginBottom: 20 }}>We are not building another donation app. We are building the coordination infrastructure for medical emergencies in India. That means real-time data, verified institutions, privacy-first design, and a platform that works on a Redmi 8 in a district hospital in Rajasthan — not just on a Pixel in Bengaluru.</p>
          <p>We are starting in Rajasthan. We are building for Bharat.</p>
        </div>

        <Divider />
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 24 }}>The numbers behind the mission</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
            {[
              { n: "38,000+", l: "Road accident deaths annually", sub: "involving delayed emergency response" },
              { n: "1%", l: "Of eligible Indians donate blood", sub: "WHO recommends 2–3%" },
              { n: "41%", l: "Of collected blood goes to waste", sub: "due to poor logistics coordination" },
              { n: "12–15 min", l: "Average time lost", sub: "searching for a hospital post-accident" },
            ].map((s, i) => (
              <Card key={i} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 28, color: C.red, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontWeight: 700, color: C.text, marginTop: 6, fontSize: 14 }}>{s.l}</div>
                <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{s.sub}</div>
              </Card>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 24 }}>What we will not do</h2>
          {["Replace 108/112 emergency services — we complement them.", "Provide medical advice or diagnosis of any kind.", "Monetise user health data — ever.", "Guarantee blood availability — we show availability, not commitments.", "Act as a payment processor for hospital fees."].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ color: C.red, flexShrink: 0, marginTop: 2 }}>✗</span>
              <span style={{ color: C.textMuted, fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 20 }}>Vision & Mission</h2>
          <Card style={{ marginBottom: 16, borderColor: C.red + "44" }}>
            <div style={{ fontWeight: 800, color: C.red, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Vision</div>
            <div style={{ color: C.text, fontSize: 16, lineHeight: 1.7 }}>A world where no Indian dies from a lack of blood, a delayed ambulance, or a hospital bed that existed but could not be found.</div>
          </Card>
          <Card style={{ borderColor: C.green + "44" }}>
            <div style={{ fontWeight: 800, color: C.greenBright, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Mission</div>
            <div style={{ color: C.text, fontSize: 16, lineHeight: 1.7 }}>To build the coordination infrastructure for medical emergencies in India — connecting people, donors, hospitals, and resources in real time so that every second between crisis and care is minimised.</div>
          </Card>
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 20 }}>North Star Metric</h2>
          <Card style={{ borderColor: C.amber + "44" }}>
            <div style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.75 }}>
              <strong style={{ color: C.amber }}>Time-to-resource</strong> — the average time between a user triggering an emergency event on Blood.net and their first verified, actionable response from a donor, hospital, or ambulance. Target: below <strong style={{ color: C.text }}>8 minutes</strong> for urban users and below <strong style={{ color: C.text }}>20 minutes</strong> for tier-2 users within 18 months of launch.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── BLOG PAGE ──────────────────────────────────────────────────────────────
function BlogPage({ onNav }) {
  const posts = [
    { title: "Why we're launching in Rajasthan first", category: "Strategy", date: "June 2025", readTime: "5 min", excerpt: "The decision to start state-first wasn't obvious. Here's the case for focused distribution over broad coverage — and why we chose Rajasthan.", img: "🗺️" },
    { title: "The blood coordination problem India doesn't talk about", category: "Research", date: "May 2025", readTime: "8 min", excerpt: "India has more blood than it needs in aggregate. The problem is that the blood that exists can't be found fast enough. A data-driven look at India's blood logistics gap.", img: "📊" },
    { title: "What we learned from onboarding our first 15 hospitals", category: "Operations", date: "April 2025", readTime: "6 min", excerpt: "The hospital dashboard took 3 redesigns before staff would actually use it. Here's what changed and why 60-second updates matter.", img: "🏥" },
    { title: "Donor dormancy: the biggest problem in blood donation apps", category: "Product", date: "March 2025", readTime: "7 min", excerpt: "87% of donor accounts go dormant within 30 days. Here's our research into why, and the features we built to fight it.", img: "💤" },
    { title: "Building for Bharat: designing for a Redmi 8 on 3G", category: "Engineering", date: "Feb 2025", readTime: "9 min", excerpt: "When your user is a 45-year-old father in a district hospital corridor with a BSNL connection, every kilobyte is a design decision.", img: "📱" },
    { title: "eRaktKosh, ABDM, and the government data opportunity", category: "Policy", date: "Jan 2025", readTime: "6 min", excerpt: "India's government health data infrastructure is richer than most people realise. Here's what Blood.net is building toward — and what's blocked.", img: "🏛️" },
  ];

  return (
    <div style={{ color: C.text, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-1.5px", marginBottom: 12 }}>Blog</h1>
          <p style={{ color: C.textMuted, fontSize: 18 }}>Research, product decisions, and stories from building Blood.net.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 20 }}>
          {posts.map((p, i) => (
            <Card key={i} style={{ cursor: "pointer", transition: "transform .2s, border-color .2s" }}
              onClick={() => {}}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{p.img}</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <Badge color={C.red}>{p.category}</Badge>
                <span style={{ color: C.textMuted, fontSize: 12, alignSelf: "center" }}>{p.date} · {p.readTime} read</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: C.text, lineHeight: 1.4 }}>{p.title}</div>
              <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{p.excerpt}</div>
              <div style={{ marginTop: 16, color: C.red, fontWeight: 700, fontSize: 13 }}>Read more →</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ───────────────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ color: C.text, padding: "40px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", marginBottom: 12 }}>Contact & Support</h1>
        <p style={{ color: C.textMuted, fontSize: 16, marginBottom: 40 }}>For platform support, media enquiries, or partnership questions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "🏥", label: "Hospital onboarding", sub: "hospitals@blood.net" },
            { icon: "🩸", label: "Donor support", sub: "donors@blood.net" },
            { icon: "📰", label: "Press & media", sub: "press@blood.net" },
            { icon: "🔧", label: "Technical / API", sub: "api@blood.net" },
          ].map((c, i) => (
            <Card key={i}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: C.red, fontSize: 14 }}>{c.sub}</div>
            </Card>
          ))}
        </div>

        <Card>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>Send a message</div>
          {sent ? (
            <div style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 40 }}>✅</div>
              <div style={{ fontWeight: 800, marginTop: 12 }}>Message sent. We'll respond within 24 hours.</div>
            </div>
          ) : (
            <>
              {[
                { label: "Name", placeholder: "Your name" },
                { label: "Email", placeholder: "your@email.com" },
                { label: "Subject", placeholder: "Brief subject" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input placeholder={f.placeholder} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
                <textarea rows={5} placeholder="Your message…" style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: "100%", background: C.red, border: "none", borderRadius: 10, color: "#fff", padding: 14, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>Send Message →</button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ── FIND HOSPITAL PAGE ─────────────────────────────────────────────────────
function FindHospitalPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const hospitals = [
    { name: "SMS Hospital", city: "Jaipur", type: "govt", icu: "8 available", cardiac: true, neuro: true, blood: "O+, A+, B+", dist: "1.2 km", phone: "0141-256-0291", verified: true },
    { name: "Fortis Escorts", city: "Jaipur", type: "private", icu: "3 available", cardiac: true, neuro: false, blood: "All types", dist: "3.4 km", phone: "0141-254-7000", verified: true },
    { name: "SDMH Jaipur", city: "Jaipur", type: "private", icu: "12 available", cardiac: false, neuro: true, blood: "A+, B+, O+", dist: "5.1 km", phone: "0141-511-3000", verified: true },
    { name: "Mahatma Gandhi Hospital", city: "Jaipur", type: "govt", icu: "0 available", cardiac: false, neuro: false, blood: "Limited", dist: "8.3 km", phone: "0141-220-1234", verified: true },
  ];
  const filtered = hospitals.filter(h =>
    (filter === "all" || h.type === filter) &&
    (query === "" || h.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ color: C.text, padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontWeight: 900, fontSize: 28, marginBottom: 6 }}>Find Hospitals</h1>
        <p style={{ color: C.textMuted, marginBottom: 24 }}>Live capacity data. No login required.</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input placeholder="Search hospital name…" value={query} onChange={e => setQuery(e.target.value)}
            style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 15, outline: "none" }} />
          {["all", "govt", "private"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? C.red : C.surface, border: `1px solid ${filter === f ? C.red : C.border}`,
              borderRadius: 8, color: filter === f ? "#fff" : C.textMuted, padding: "12px 16px",
              fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize"
            }}>{f === "all" ? "All" : f === "govt" ? "Government" : "Private"}</button>
          ))}
        </div>
        {filtered.map((h, i) => (
          <Card key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 900, fontSize: 18, color: C.text }}>{h.name}</span>
                  {h.verified && <Badge color={C.green} style={{ fontSize: 10 }}>Verified</Badge>}
                  <Badge color={C.textMuted}>{h.type.toUpperCase()}</Badge>
                  {h.cardiac && <Badge color={C.red} style={{ fontSize: 10 }}>Cardiac</Badge>}
                  {h.neuro && <Badge color="#9B59B6" style={{ fontSize: 10 }}>Neuro</Badge>}
                </div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ color: C.textMuted, fontSize: 13 }}>📍 {h.dist}</span>
                  <span style={{ color: parseInt(h.icu) === 0 ? C.red : C.greenBright, fontWeight: 600, fontSize: 13 }}>🛏 ICU: {h.icu}</span>
                  <span style={{ color: C.textMuted, fontSize: 13 }}>🩸 Blood: {h.blood}</span>
                </div>
              </div>
              <a href={`tel:${h.phone}`} style={{
                background: C.red, color: "#fff", borderRadius: 8, padding: "10px 16px",
                fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0
              }}>📞 Call</a>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 36 }}>🔍</div>
            <div style={{ color: C.textMuted, marginTop: 12 }}>No hospitals found. Try a different search.</div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ────────────────────────────────────────────────────────
function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "hospitals", "donors", "requests", "alerts"];

  return (
    <div style={{ color: C.text, padding: "24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <Badge color={C.red} style={{ marginBottom: 8 }}>Platform Admin</Badge>
            <h1 style={{ fontWeight: 900, fontSize: 26 }}>Admin Dashboard</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <PulsingDot color={C.greenBright} />
            <span style={{ color: C.greenBright, fontSize: 13, fontWeight: 600 }}>All systems operational</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, background: C.surface, borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              background: tab === t ? C.surfaceHigh : "transparent", color: tab === t ? C.text : C.textMuted,
              textTransform: "capitalize", transition: "all .2s"
            }}>{t}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Active Requests", value: "14", color: C.red, sub: "2 immediate priority" },
                { label: "Response Rate", value: "91%", color: C.green, sub: "last 30 days" },
                { label: "Avg Resolution", value: "11 min", color: C.amber, sub: "urban users" },
                { label: "Platform Uptime", value: "99.8%", color: C.greenBright, sub: "last 30 days" },
              ].map((s, i) => (
                <Card key={i}>
                  <div style={{ color: C.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{s.sub}</div>
                </Card>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card>
                <div style={{ fontWeight: 800, marginBottom: 16 }}>Hospitals — Data Freshness Alert</div>
                {[
                  { name: "Govt Hospital Barmer", lastUpdate: "9h ago", status: "stale" },
                  { name: "City Clinic Ajmer", lastUpdate: "6h ago", status: "warn" },
                  { name: "SMS Hospital Jaipur", lastUpdate: "23 min ago", status: "good" },
                ].map((h, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ fontSize: 14, color: C.textMuted }}>{h.name}</span>
                    <span style={{ color: h.status === "stale" ? C.red : h.status === "warn" ? C.amber : C.greenBright, fontWeight: 700, fontSize: 13 }}>
                      {h.lastUpdate} {h.status === "stale" ? "⚠" : h.status === "warn" ? "◐" : "✓"}
                    </span>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ fontWeight: 800, marginBottom: 16 }}>Geographic Coverage Gaps</div>
                {[
                  { area: "Barmer District", donors: 12, hospitals: 0 },
                  { area: "Jaisalmer", donors: 8, hospitals: 1 },
                  { area: "Churu", donors: 34, hospitals: 2 },
                ].map((a, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{a.area}</span>
                      <Badge color={a.hospitals === 0 ? C.red : C.amber}>Low coverage</Badge>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{a.donors} donors · {a.hospitals} hospital{a.hospitals !== 1 ? "s" : ""}</div>
                  </div>
                ))}
              </Card>
            </div>
          </>
        )}

        {tab === "hospitals" && (
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Hospital Partner Management</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Hospital", "City", "Type", "Status", "Last Update", "Actions"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "SMS Hospital", city: "Jaipur", type: "Government", status: "Active", update: "23 min" },
                  { name: "Fortis Escorts", city: "Jaipur", type: "Private", status: "Active", update: "1h" },
                  { name: "City Clinic Ajmer", city: "Ajmer", type: "Private", status: "Stale", update: "6h" },
                  { name: "Govt Barmer", city: "Barmer", type: "Government", status: "Offline", update: "9h" },
                ].map((h, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px", fontWeight: 700, color: C.text }}>{h.name}</td>
                    <td style={{ padding: "12px", color: C.textMuted }}>{h.city}</td>
                    <td style={{ padding: "12px", color: C.textMuted }}>{h.type}</td>
                    <td style={{ padding: "12px" }}><Badge color={h.status === "Active" ? C.green : h.status === "Stale" ? C.amber : C.red}>{h.status}</Badge></td>
                    <td style={{ padding: "12px", color: C.textMuted }}>{h.update} ago</td>
                    <td style={{ padding: "12px" }}>
                      <button style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "4px 10px", cursor: "pointer", fontSize: 12 }}>Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "alerts" && (
          <Card>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Broadcast Platform Alert</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Target Region</label>
              <select style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 14, outline: "none" }}>
                <option>All of Rajasthan</option>
                <option>Jaipur District</option>
                <option>Jodhpur Division</option>
                <option>All Donors</option>
                <option>All Hospitals</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Alert Message</label>
              <textarea rows={4} placeholder="Critical blood shortage alert: O-negative donors urgently needed in Jaipur…"
                style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "12px 16px", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
            <button style={{ background: C.red, border: "none", borderRadius: 10, color: "#fff", padding: "14px 28px", fontWeight: 800, cursor: "pointer" }}>
              🚨 Broadcast Alert
            </button>
          </Card>
        )}

        {(tab === "donors" || tab === "requests") && (
          <Card style={{ textAlign: "center", padding: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, textTransform: "capitalize" }}>{tab} Management</div>
            <div style={{ color: C.textMuted }}>Full {tab} table, filtering, and management tools available in production.</div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ onNav }) {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "40px 24px 24px", color: C.textMuted }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 40 }}>
          <div>
            <button onClick={() => onNav("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🩸</span>
              <span style={{ color: C.text, fontWeight: 900, fontSize: 18 }}>Blood<span style={{ color: C.red }}>.net</span></span>
            </button>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>India's Emergency Healthcare Coordination Platform. Building the information layer that connects people in crisis with the resources that can help them.</p>
            <div style={{ marginTop: 12, fontSize: 13 }}>
              Emergency: <a href="tel:108" style={{ color: C.red, fontWeight: 700, textDecoration: "none" }}>108</a> &nbsp;·&nbsp;
              Ambulance: <a href="tel:102" style={{ color: C.red, fontWeight: 700, textDecoration: "none" }}>102</a>
            </div>
          </div>
          {[
            { title: "Platform", links: [{ l: "Emergency Search", p: "emergency" }, { l: "Find Hospital", p: "find-hospital" }, { l: "How It Works", p: "how-it-works" }, { l: "Register as Donor", p: "auth" }] },
            { title: "Institutions", links: [{ l: "Partner With Us", p: "partner" }, { l: "Hospital Dashboard", p: "hospital-dashboard" }, { l: "Admin Login", p: "admin" }] },
            { title: "Company", links: [{ l: "About", p: "about" }, { l: "Blog", p: "blog" }, { l: "Contact", p: "contact" }, { l: "Privacy Policy", p: "home" }] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontWeight: 800, color: C.text, marginBottom: 12, fontSize: 14 }}>{col.title}</div>
              {col.links.map(link => (
                <button key={link.l} onClick={() => onNav(link.p)} style={{ display: "block", background: "none", border: "none", color: C.textMuted, cursor: "pointer", padding: "4px 0", fontSize: 13, textAlign: "left" }}>{link.l}</button>
              ))}
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, fontSize: 12 }}>
          <span>© 2025 Blood.net. All rights reserved. Rajasthan, India.</span>
          <span style={{ color: C.textMuted }}>Confidential · V1.0 · Built for Bharat.</span>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const noBarPages = ["home", "how-it-works", "about", "blog", "contact", "partner", "find-hospital", "emergency", "auth"];
  const noNavPages = [];
  const noFooterPages = ["emergency", "auth", "dashboard", "hospital-dashboard", "admin"];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNav={navigate} />;
      case "emergency": return <EmergencyPage />;
      case "dashboard": return <DonorDashboard />;
      case "hospital-dashboard": return <HospitalDashboard />;
      case "admin": return <AdminDashboard />;
      case "auth": return <AuthPage onNav={navigate} />;
      case "how-it-works": return <HowItWorksPage />;
      case "partner": return <PartnerPage />;
      case "about": return <AboutPage />;
      case "blog": return <BlogPage onNav={navigate} />;
      case "contact": return <ContactPage />;
      case "find-hospital": return <FindHospitalPage />;
      default: return <HomePage onNav={navigate} />;
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${C.bg}; }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
        select option { background: ${C.bg}; color: ${C.text}; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${C.bg}; } ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>

      <EmergencyBar onNav={navigate} />
      <Nav currentPage={page} onNav={navigate} />

      <main style={{ paddingTop: 104 }}>
        {renderPage()}
      </main>

      {!noFooterPages.includes(page) && <Footer onNav={navigate} />}
    </div>
  );
}
