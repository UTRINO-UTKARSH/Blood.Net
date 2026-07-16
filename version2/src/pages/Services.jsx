import React, { useEffect, useRef, useState } from "react";
import { HeartPulse, ArrowRight } from "lucide-react";

const IconDrop = ({ size = 40, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 5C24 5 11 21.5 11 30.5C11 37.4 16.8 43 24 43C31.2 43 37 37.4 37 30.5C37 21.5 24 5 24 5Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M19 32C19 34.7 21 37 24 37.5"
      stroke="#FF2D2D"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const IconHospitalBuilding = ({ size = 40, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="9" y="17" width="30" height="24" rx="1.5" stroke={color} strokeWidth="2.2" />
    <path d="M18 17V9C18 7.9 18.9 7 20 7H28C29.1 7 30 7.9 30 9V17" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M24 10.5V15.5M21.5 13H26.5" stroke="#FF2D2D" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="14" y="23" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.8" />
    <rect x="22" y="23" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.8" />
    <rect x="30" y="23" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.8" />
    <rect x="21" y="33" width="6" height="8" stroke={color} strokeWidth="1.8" />
  </svg>
);

const IconStethoscope = ({ size = 40, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M15 8V20C15 25 18.5 29 24 29C29.5 29 33 25 33 20V8"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M15 8C15 9.1 14.1 10 13 10C11.9 10 11 9.1 11 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M33 8C33 9.1 33.9 10 35 10C36.1 10 37 9.1 37 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 29V34" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="24" cy="38.5" r="4" stroke={color} strokeWidth="2.2" />
    <circle cx="34" cy="24" r="2.6" stroke="#FF2D2D" strokeWidth="2.2" />
  </svg>
);

const IconAmbulance = ({ size = 40, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M6 32V19C6 18.4 6.4 18 7 18H27C27.6 18 28 18.4 28 19V32" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M28 23H34.8C35.2 23 35.6 23.2 35.8 23.6L39.4 29.5C39.6 29.8 39.7 30.1 39.7 30.5V32" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M6 32H4M28 32H33M39.7 32H42V32C42 32 42 32 42 32" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="14" cy="34" r="3" stroke={color} strokeWidth="2.2" />
    <circle cx="34" cy="34" r="3" stroke={color} strokeWidth="2.2" />
    <path d="M15 20.5V27.5M11.5 24H18.5" stroke="#FF2D2D" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M32 14L33.2 16.6L36 17L33.2 17.6L32 20.2L30.8 17.6L28 17L30.8 16.6L32 14Z" fill="#FF2D2D" />
  </svg>
);

const IconBookRibbon = ({ size = 40, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 12C21 9.5 16.5 8.5 12 9V33C16.5 32.5 21 33.5 24 36C27 33.5 31.5 32.5 36 33V9C31.5 8.5 27 9.5 24 12Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M24 12V36" stroke={color} strokeWidth="2.2" />
    <path d="M27 11V22L29.5 20L32 22V11" fill="#FF2D2D" stroke="#FF2D2D" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    icon: IconDrop,
    title: "Blood Donors",
    desc: "Find verified blood donors near you quickly and connect instantly.",
  },
  {
    icon: IconHospitalBuilding,
    title: "Blood Banks",
    desc: "Locate nearby blood banks, check availability, and request with confidence.",
  },
  {
    icon: IconHospitalBuilding,
    title: "Hospitals",
    desc: "Find trusted hospitals and healthcare facilities in your area.",
  },
  {
    icon: IconStethoscope,
    title: "Doctors",
    desc: "Connect with qualified doctors and specialists when you need them.",
  },
  {
    icon: IconAmbulance,
    title: "Ambulance Services",
    desc: "Request immediate ambulance support and reach faster in emergencies.",
  },
  {
    icon: IconBookRibbon,
    title: "Knowledge Hub",
    desc: "Access health information, guides, and resources to stay informed.",
  },
];

export default function ServicesLandingPage() {
  return (
    <div
      style={{
        background: "#090B12",
        color: "#FFFFFF",
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <style>{`
        .svc-hero { padding: 140px 24px 90px; }
        .svc-grid-section { padding: 0 24px; }
        .svc-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .svc-card { padding: 36px 28px; }
        .svc-cta-section { padding: 90px 24px 0; }
        .svc-cta-box { padding: 36px 40px; flex-wrap: nowrap; }
        .svc-cta-left { flex: 1 1 auto; }
        .svc-cta-actions { width: auto; }
        .svc-cta-actions button { flex: 0 0 auto; }

        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .svc-cta-box { flex-wrap: wrap; }
        }

        @media (max-width: 640px) {
          .svc-hero { padding: 96px 20px 56px; }
          .svc-grid-section { padding: 0 16px; }
          .svc-grid { grid-template-columns: 1fr; gap: 14px; }
          .svc-card { padding: 28px 22px; }
          .svc-cta-section { padding: 56px 16px 0; }
          .svc-cta-box { padding: 28px 24px; flex-direction: column; align-items: flex-start; }
          .svc-cta-left { width: 100%; }
          .svc-cta-actions { width: 100%; flex-direction: column; }
          .svc-cta-actions button { width: 100%; justify-content: center; }
        }
      `}</style>
      <section className="svc-hero" style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
          <Reveal>
            <h1
              style={{
                fontSize: "clamp(34px, 7vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Emergency
              <br />
              <span style={{ color: "#FF2D2D" }}>Healthcare</span> Services
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ color: "#B6B6B6", fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 600, margin: "28px 0 0" }}>
              One Platform. Every Resource.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ color: "#7A7A7A", fontSize: "clamp(14px, 2.4vw, 16px)", lineHeight: 1.7, maxWidth: "560px", margin: "16px auto 0" }}>
              Blood.net connects you to life-saving resources in seconds. Access blood donors, hospitals, doctors, and
              emergency services — when every second counts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="svc-grid-section">
        <div
          className="svc-grid"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "grid",
          }}
        >
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div
                className="svc-card"
                style={{
                  background: "#1A1A1E",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  height: "100%",
                  cursor: "pointer",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(255,45,45,0.35)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(255,45,45,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <s.icon size={40} color="#FFFFFF" />
                <h3 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, margin: "24px 0 12px" }}>{s.title}</h3>
                <p style={{ color: "#B6B6B6", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta-section">
        <Reveal>
          <div
            className="svc-cta-box"
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              background: "#1A1A1E",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div className="svc-cta-left" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,45,45,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <HeartPulse size={24} color="#FF2D2D" />
              </div>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>Ready to get started?</h3>
                <p style={{ color: "#B6B6B6", fontSize: "14px", margin: 0 }}>
                  Join Blood.net today and be prepared to save lives, any time.
                </p>
              </div>
            </div>
            <div className="svc-cta-actions" style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
              <button
                style={{
                  background: "#FF2D2D",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 26px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 22px rgba(255,45,45,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Started
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "#FF2D2D",
                  border: "1px solid rgba(255,45,45,0.5)",
                  borderRadius: "10px",
                  padding: "14px 26px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                Learn More <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}