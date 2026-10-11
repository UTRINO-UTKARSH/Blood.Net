import React, { useState } from "react";
import { Droplet, CalendarCheck, CheckCircle2, BellOff } from "lucide-react";
// needed to changeg after the other dashboard are made

// Dummy data. Shape mirrors a future `notifications` table:
// id, type, title, body, created_at, read_at, payload
const DUMMY_ALERTS = [
  {
    id: 1,
    type: "match",
    title: "Urgent match",
    body: "A patient needs O+ at City General Hospital, 2.4 km away.",
    createdAt: "2026-10-11T09:41:00",
    readAt: null,
    payload: { requestId: "req_1042" },
  },
  {
    id: 2,
    type: "request",
    title: "Your request was accepted",
    body: "Aman S. will donate B+ at SMS Hospital this evening.",
    createdAt: "2026-10-11T08:15:00",
    readAt: null,
    payload: { requestId: "req_1039" },
  },
  {
    id: 3,
    type: "appointment",
    title: "Donation scheduled",
    body: "Confirmed at Central Blood Bank, Tue 14th, 10:30 AM.",
    createdAt: "2026-10-10T17:20:00",
    readAt: "2026-10-10T18:00:00",
    payload: { appointmentId: "apt_88" },
  },
  {
    id: 4,
    type: "appointment",
    title: "Donation scheduled",
    body: "Confirmed at Central Blood Bank, Tue 14th, 10:30 AM.",
    createdAt: "2026-10-10T17:20:00",
    readAt: "2026-10-10T18:00:00",
    payload: { appointmentId: "apt_88" },
  },
  {
    id: 5,
    type: "appointment",
    title: "Donation scheduled",
    body: "Confirmed at Central Blood Bank, Tue 14th, 10:30 AM.",
    createdAt: "2026-10-10T17:20:00",
    readAt: "2026-10-10T18:00:00",
    payload: { appointmentId: "apt_88" },
  },
];

const TYPE_STYLES = {
  match: { icon: Droplet, ring: "bg-red-500/15 text-red-400" },
  request: { icon: CheckCircle2, ring: "bg-emerald-500/15 text-emerald-400" },
  appointment: { icon: CalendarCheck, ring: "bg-sky-500/15 text-sky-400" },
};

function timeAgo(iso, now = new Date("2026-10-11T10:00:00")) {
  const mins = Math.round((now - new Date(iso)) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

const AlertsFeed = ({ initialAlerts = DUMMY_ALERTS, onRespond }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const unread = alerts.filter((a) => !a.readAt).length;

  const markRead = (id) =>
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id && !a.readAt ? { ...a, readAt: new Date().toISOString() } : a
      )
    );

  const handleRespond = (alert) => {
    markRead(alert.id);
    onRespond?.(alert); // wire to your respond flow / route
  };

  const markAllRead = () =>
    setAlerts((prev) =>
      prev.map((a) => (a.readAt ? a : { ...a, readAt: new Date().toISOString() }))
    );

  return (
    <section
      aria-labelledby="alerts-heading"
      className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-5"
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 id="alerts-heading" className="text-base font-semibold text-slate-100 sm:text-lg">
            Alerts
          </h2>
          {unread > 0 && (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
              {unread} new
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="rounded text-xs text-sky-400 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Mark all read
          </button>
        )}
      </header>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-slate-400">
          <BellOff className="h-6 w-6" aria-hidden="true" />
          <p className="text-sm">No alerts yet. Match requests and confirmations will show up here.</p>
        </div>
      ) : (
        <ul className="divide-y divide-white/5">
          {alerts.map((alert) => {
            const { icon: Icon, ring } = TYPE_STYLES[alert.type];
            const isUnread = !alert.readAt;
            return (
              <li key={alert.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ring}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm ${
                        isUnread ? "font-semibold text-slate-100" : "font-medium text-slate-300"
                      }`}
                    >
                      {alert.title}
                    </p>
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
                      {isUnread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-label="Unread" />
                      )}
                      {timeAgo(alert.createdAt)}
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm leading-snug text-slate-400">{alert.body}</p>

                  {alert.type === "match" && isUnread && (
                    <button
                      onClick={() => handleRespond(alert)}
                      className="mt-2 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
                    >
                      Respond
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default AlertsFeed;