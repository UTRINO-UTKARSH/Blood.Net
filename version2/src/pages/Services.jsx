import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, ArrowRight } from "lucide-react";

/* ============================================================
   NOTE ON COLORS
   Brand hex values (#090B12, #FF2D2D, #1A1A1E, #7A7A7A) aren't
   in Tailwind's default palette, and this environment has no
   JIT compiler, so arbitrary classes like bg-[#090B12] won't
   render. Mapped to the closest built-in Tailwind shades:
     background   -> neutral-950
     card bg      -> neutral-900
     accent red   -> red-500
     muted text   -> neutral-400
     faint text   -> neutral-500
   If you need the exact brand hex values, add them to a
   tailwind.config.js theme.extend.colors in your real project
   (that config step isn't available in this preview).
   ============================================================ */

/* ============================================================
   ICONS
   ============================================================ */
const IconDrop = ({ size = 40, className = "text-white" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M24 5C24 5 11 21.5 11 30.5C11 37.4 16.8 43 24 43C31.2 43 37 37.4 37 30.5C37 21.5 24 5 24 5Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M19 32C19 34.7 21 37 24 37.5" stroke="rgb(239,68,68)" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconHospitalBuilding = ({ size = 40, className = "text-white" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="9" y="17" width="30" height="24" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
    <path
      d="M18 17V9C18 7.9 18.9 7 20 7H28C29.1 7 30 7.9 30 9V17"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M24 10.5V15.5M21.5 13H26.5" stroke="rgb(239,68,68)" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="14" y="23" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="22" y="23" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="30" y="23" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="21" y="33" width="6" height="8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const IconStethoscope = ({ size = 40, className = "text-white" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M15 8V20C15 25 18.5 29 24 29C29.5 29 33 25 33 20V8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M15 8C15 9.1 14.1 10 13 10C11.9 10 11 9.1 11 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M33 8C33 9.1 33.9 10 35 10C36.1 10 37 9.1 37 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 29V34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="24" cy="38.5" r="4" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="34" cy="24" r="2.6" stroke="rgb(239,68,68)" strokeWidth="2.2" />
  </svg>
);

const IconAmbulance = ({ size = 40, className = "text-white" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M6 32V19C6 18.4 6.4 18 7 18H27C27.6 18 28 18.4 28 19V32" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path
      d="M28 23H34.8C35.2 23 35.6 23.2 35.8 23.6L39.4 29.5C39.6 29.8 39.7 30.1 39.7 30.5V32"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M6 32H4M28 32H33M39.7 32H42V32C42 32 42 32 42 32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="14" cy="34" r="3" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="34" cy="34" r="3" stroke="currentColor" strokeWidth="2.2" />
    <path d="M15 20.5V27.5M11.5 24H18.5" stroke="rgb(239,68,68)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M32 14L33.2 16.6L36 17L33.2 17.6L32 20.2L30.8 17.6L28 17L30.8 16.6L32 14Z" fill="rgb(239,68,68)" />
  </svg>
);

const IconBookRibbon = ({ size = 40, className = "text-white" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M24 12C21 9.5 16.5 8.5 12 9V33C16.5 32.5 21 33.5 24 36C27 33.5 31.5 32.5 36 33V9C31.5 8.5 27 9.5 24 12Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M24 12V36" stroke="currentColor" strokeWidth="2.2" />
    <path
      d="M27 11V22L29.5 20L32 22V11"
      fill="rgb(239,68,68)"
      stroke="rgb(239,68,68)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ============================================================
   SCROLL-REVEAL ANIMATION
   This is the one piece that has to stay JS: Tailwind (without
   a build step) has no way to detect "has this scrolled into
   view yet." IntersectionObserver is the only reliable way to
   trigger the fade/rise the first time a card enters the
   viewport, so it's kept as-is.
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delayMs = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   CONTENT DATA
   ============================================================ */
const services = [
  { icon: IconDrop, title: "Blood Donors", desc: "Find verified blood donors near you quickly and connect instantly.", path: "/services/blooddonors" },
  { icon: IconHospitalBuilding, title: "Blood Banks", desc: "Locate nearby blood banks, check availability, and request with confidence.", path: "/services/bloodbanks" },
  { icon: IconHospitalBuilding, title: "Hospitals", desc: "Find trusted hospitals and healthcare facilities in your area.", path: "/services/hospital" },
  { icon: IconStethoscope, title: "Doctors", desc: "Connect with qualified doctors and specialists when you need them.", path: "/services/doctor" },
  { icon: IconAmbulance, title: "Ambulance Services", desc: "Request immediate ambulance support and reach faster in emergencies.", path: "/services/ambulance" },
  { icon: IconBookRibbon, title: "Knowledge Hub", desc: "Access health information, guides, and resources to stay informed.", path: "/knowledge-hub" },
];

/* ============================================================
   PAGE SECTIONS
   Hover states, spacing, and responsive layout are all handled
   by Tailwind classes below — no inline style objects, no
   onMouseEnter/onMouseLeave handlers, no manual media queries.
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden text-center px-5 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -top-[15%] left-1/2 h-150 w-200 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Emergency
            <br />
            <span className="text-red-500">Healthcare</span> Services
          </h1>
        </Reveal>

        <Reveal delayMs={100}>
          <p className="mt-7 text-lg font-semibold text-neutral-400 sm:text-xl">One Platform. Every Resource.</p>
        </Reveal>

        <Reveal delayMs={180}>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
            Blood.net connects you to life-saving resources in seconds. Access blood donors, hospitals, doctors, and
            emergency services — when every second counts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service, delayMs }) {
  const Icon = service.icon;
  return (
    <Reveal delayMs={delayMs}>
      <Link
        to={service.path}
        className="group block h-full rounded-2xl border border-white/10 bg-neutral-900 p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] sm:p-9"
      >
        <Icon size={40} className="text-white" />
        <h3 className="mt-6 mb-3 text-xl font-bold sm:text-2xl">{service.title}</h3>
        <p className="text-[15px] leading-relaxed text-neutral-400">{service.desc}</p>
      </Link>
    </Reveal>
  );
}

function ServicesGrid() {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} delayMs={i * 70} />
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 pt-14 sm:px-6 sm:pt-16 lg:pt-24">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-[20px] border border-white/10 bg-neutral-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9 lg:p-10">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-red-500/40">
              <HeartPulse size={24} className="text-red-500" />
            </div>
            <div>
              <h3 className="mb-1.5 text-xl font-bold">Ready to get started?</h3>
              <p className="text-sm text-neutral-400">Join Blood.net today and be prepared to save lives, any time.</p>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <button className="w-full rounded-[10px] bg-red-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(239,68,68,0.4)] sm:w-auto">
              Get Started
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-red-500/50 px-6 py-3.5 text-[15px] font-semibold text-red-500 sm:w-auto">
              Learn More <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   PAGE ROOT
   ============================================================ */
export default function ServicesLandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-24 font-sans text-white">
      <Hero />
      <ServicesGrid />
      <CallToAction />
    </div>
  );
}