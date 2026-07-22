import React from "react";
import { useEffect, useRef, useState } from "react";
// need's huge improvement and spacing fix{by-utkarsh}
// sentinal div adding
function useReveal() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible];
}
function Reveal({ children, delayMs = 0 }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
//sentinal ends
function DropIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5C12 2.5 5.5 11 5.5 15.3C5.5 19 8.4 22 12 22C15.6 22 18.5 19 18.5 15.3C18.5 11 12 2.5 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 20.5C12 20.5 3.5 15.5 3.5 9.3C3.5 6.4 5.8 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.2 4.3 20.5 6.4 20.5 9.3C20.5 15.5 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartbeatIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 12H9L10.5 8L13 16L14.5 12H18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L19 6V11C19 16 16 19.5 12 21C8 19.5 5 16 5 11V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12L11.2 14.2L15.5 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21C12 21 19 14.6 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 14.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5C9.5 3.5 8 5.3 8 7.7V11.5C8 13 7.4 14.4 6.5 15.5H17.5C16.6 14.4 16 13 16 11.5V7.7C16 5.3 14.5 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 18.5C10.3 19.5 11.1 20.2 12 20.2C12.9 20.2 13.7 19.5 14 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 21C4 16.6 7.6 14 12 14C16.4 14 20 16.6 20 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HandDropHero({ size = 400 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width={size} height={size}>
      <defs>
        {/* <!-- Sharp Neon Glow for Primary Shapes --> */}
        <filter id="drop-outline-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feGaussianBlur stdDeviation="14" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* <!-- Softer, Controlled Glow for Hand Fine Details & Fingertips --> */}
        <filter id="hand-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur1" />
          <feGaussianBlur stdDeviation="4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* <!-- Subtler Fill Blur for Inside the Drop --> */}
        <filter id="drop-fill-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* <!-- Background Ambient Glow --> */}
        <radialGradient id="bg-glow" cx="55%" cy="40%" r="45%">
          <stop offset="0%" stopColor="#7a0010" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#300005" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0b0c10" stopOpacity="0" />
        </radialGradient>

        {/* <!-- Reduced Opacity Interior Drop Gradient --> */}
        <radialGradient id="drop-interior" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff1e38" stopOpacity="0.5" />
          <stop offset="75%" stopColor="#b3001b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4a0008" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* <!-- Background Layer --> */}
      <rect width="100%" height="100%" fill="#0a0b0e" />
      <rect width="100%" height="100%" fill="url(#bg-glow)" />

      {/* <!-- Drop Elements Group --> */}
      <g filter="url(#drop-outline-glow)">
        {/* <!-- Toned-Down Semi-Transparent Drop Fill --> */}
        <path
          d="M 283,52 C 283,52 328,118 328,148 A 45,45 0 1,1 238,148 C 238,118 283,52 283,52 Z"
          fill="url(#drop-interior)"
          filter="url(#drop-fill-glow)"
        />

        {/* <!-- Main Drop Neon Outline --> */}
        <path
          d="M 283,52 C 283,52 328,118 328,148 A 45,45 0 1,1 238,148 C 238,118 283,52 283,52 Z"
          fill="none"
          stroke="#ff2a4b"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* <!-- Inner Highlight Arc --> */}
        <path
          d="M 255,123 A 22,22 0 0,0 258,154"
          fill="none"
          stroke="#ff3b58"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* <!-- Hand & Fingertips Group (Sharper & Less Bleed) --> */}
      <g filter="url(#hand-glow)">
        {/* <!-- Cupped Hand Outline --> */}
        <path
          d="M 98,234 C 135,200 162,183 197,183 C 225,183 238,198 268,204 C 283,207 295,204 297,215 C 299,223 288,230 270,230 L 220,230 C 255,232 285,225 301,220 C 328,210 348,192 376,177 C 378,176 381,180 378,184 C 353,212 323,248 290,265 C 255,283 205,273 175,258 C 145,243 130,260 130,260"
          fill="none"
          stroke="#ff2a4b"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* <!-- Palm Crease Detail --> */}
        <path
          d="M 253,243 C 257,250 258,258 256,267"
          fill="none"
          stroke="#ff2a4b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* <!-- Fingertip Contour Accent --> */}
        <path
          d="M 306,204 C 318,196 331,187 341,181"
          fill="none"
          stroke="#ff2a4b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>

  );
}

const cardBox = "rounded-xl border border-white/10 bg-neutral-900 p-4 sm:p-5";

const redButton =
  "rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold text-white w-full sm:w-auto text-center";

const outlineButton =
  "rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white w-full sm:w-auto text-center";

export default function BloodDonorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden  bg-[#0A0B10] px-3 py-4 text-white sm:px-8 sm:py-8">

      <section className="flex showup flex-col items-center py-6 sm:flex-row sm:items-center sm:justify-evenly">
        <div className="max-w-lg">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Blood Donors</h1>
          <p className="mt-3 text-3xl text-neutral-400">
            Connect with verified donors when every second counts
          </p>

          <div className="mt-6 flex w-full  flex-col gap-3 sm:w-auto sm:flex-row">
            <button className={`cursor-pointer hover:scale-105 transition-all duration-300 ${redButton}`}>Register as Donor</button>
            <button className={`cursor-pointer hover:scale-105 transition-all duration-300 ${outlineButton}`}>Find Donors</button>
          </div>
        </div>

        <HandDropHero />
      </section>
      <Reveal delayMs={500}>
        <section className="mt-10">
          <h2 className="mb-5 text-center justify-center text-3xl hover:scale-105 transition-all duration-300 font-bold">How It Works</h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Reveal delayMs={400}>
              {/* step 1 */}
              <div className={`flex flex-1 items-center gap-3 ${cardBox}`}>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-500">
                  1
                </div>
                <div>
                  <h3 className="font-bold">Create Profile</h3>
                  <p className="mt-1 text-sm text-neutral-400">Sign up and complete your donor profile.</p>
                </div>
              </div>
            </Reveal>

            {/* step 2 */}
            <Reveal delayMs={400} >
              <div className={`flex flex-1 items-center gap-3 ${cardBox}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-500">
                  2
                </div>
                <div>
                  <h3 className="font-bold">Get Matched</h3>
                  <p className="mt-1 text-sm text-neutral-400">We match you with recipients near you.</p>
                </div>
              </div>
            </Reveal>
            {/* step 3 */}
            <Reveal delayMs={400}>
              <div className={`flex flex-1 items-center gap-3 ${cardBox}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-bold text-red-500">
                  3
                </div>
                <div>
                  <h3 className="font-bold">Save Lives</h3>
                  <p className="mt-1 text-sm text-neutral-400">Donate blood and make a real impact.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>
      <Reveal delayMs={100}>
        <section className="mt-10">
          <Reveal>
            <h2 className="mb-5 text-center text-3xl hover:scale-105 transition-all duration-300 font-bold">Features</h2>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className={cardBox}>
                <HeartbeatIcon className="text-red-500" />
                <h3 className="mt-3 font-bold">Real-time Availability</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Donors can update availability in real-time for quick response.
                </p>
              </div>


              <div className={cardBox}>
                <ShieldIcon className="text-red-500" />
                <h3 className="mt-3 font-bold">Verified Donors</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  All donors are verified for safety and reliability.
                </p>
              </div>


              <div className={cardBox}>
                <PinIcon className="text-red-500" />
                <h3 className="mt-3 font-bold">Location-Based Matching</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Find nearby donors based on your exact location.
                </p>
              </div>

              <div className={cardBox}>
                <BellIcon className="text-red-500" />
                <h3 className="mt-3 font-bold">Instant Notifications</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Get notified instantly when blood is needed.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </Reveal>
      <Reveal delayMs={100}>
        <section className="mt-10">
          <Reveal>
            <h2 className="mb-5 text-center text-3xl hover:scale-105 transition-all duration-300 font-bold">Why Register as a Donor?</h2>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className={cardBox}>
                <HeartbeatIcon className="text-red-500" />
                <div className="mt-3 text-2xl font-extrabold">3M+</div>
                <h3 className="mt-1 font-bold">Lives Impacted</h3>
                <p className="mt-1 text-sm text-neutral-400">Your donation can save up to 3 lives.</p>
              </div>

              <div className={cardBox}>
                <DropIcon className="text-red-500" />
                <div className="mt-3 text-2xl font-extrabold">90s</div>
                <h3 className="mt-1 font-bold">Every 90 Seconds</h3>
                <p className="mt-1 text-sm text-neutral-400">Someone needs blood every 90 seconds.</p>
              </div>

              <div className={cardBox}>
                <HeartIcon className="text-red-500" />
                <div className="mt-3 text-2xl font-extrabold">100%</div>
                <h3 className="mt-1 font-bold">Pure Impact</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Every drop donated goes directly to those in need.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </Reveal>
      <Reveal delayMs={100}>

        <section className={`mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between ${cardBox}`}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-red-500/40">
              <PersonIcon size={26} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Ready to Save Lives?</h3>
              <p className="mt-1 text-sm text-neutral-400">
                Join thousands of verified donors and be the reason someone gets a second chance at life.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button className={`cursor-pointer ${redButton}`}>Register as Donor</button>
            <button className={`cursor-pointer ${outlineButton}`}>Find Donors</button>
          </div>
        </section>
      </Reveal>
    </div>
  );
}