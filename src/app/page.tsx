"use client";
import { useState, useEffect } from "react";

/* ─── DATA ─── */
const project = {
  name: "Villa Al-Mansouri",
  location: "Palm Jumeirah, Dubai",
  budget: 1200000,
  paid: 540000,
  progress: 68,
  phase: "Interior Finishing",
  daysLeft: 147,
};

const team = [
  { name: "Omar", role: "Project Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Layla", role: "Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Ravi", role: "MEP Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Aisha", role: "Interior", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { name: "You", role: "Client", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

const milestones = [
  { title: "Contract", done: true, paid: true },
  { title: "Design", done: true, paid: true },
  { title: "Demolition", done: true, paid: true },
  { title: "Structure", done: true, paid: true },
  { title: "MEP", done: false, active: true, paid: false },
  { title: "Finishing", done: false, paid: false },
  { title: "Inspection", done: false, paid: false },
  { title: "Handover", done: false, paid: false },
];

const photos = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=200&fit=crop",
];

const activity = [
  { text: "Kitchen countertop installed", time: "2h ago", icon: "🔨" },
  { text: "Payment — Structural Work", time: "Yesterday", icon: "✓" },
  { text: "12 new photos uploaded", time: "2d ago", icon: "📷" },
];

/* ─── GAUGE COMPONENT (semi-circle like AC temp) ─── */
function Gauge({ value, max, size = 160, color = "var(--green)", label, sub }: {
  value: number; max: number; size?: number; color?: string; label: string; sub: string;
}) {
  const sw = 10;
  const r = (size - sw) / 2;
  const half = r * Math.PI; // semi-circle
  const pct = Math.min(value / max, 1);
  const offset = half - pct * half;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + sw} className="gauge-svg" style={{ transform: 'rotate(180deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw}
            strokeDasharray={`${half} ${half * 2}`} strokeLinecap="round" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
            strokeDasharray={`${half} ${half * 2}`} strokeDashoffset={offset} strokeLinecap="round"
            className="gauge-track" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-3xl font-bold text-white">{label}</div>
          <div className="text-xs text-white/40 mt-0.5">{sub}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROGRESS RING ─── */
function Ring({ pct, size = 52, sw = 4, color = "var(--green)" }: { pct: number; size?: number; sw?: number; color?: string }) {
  const r = (size - sw) / 2;
  const c = r * 2 * Math.PI;
  const offset = c - (pct / 100) * c;
  return (
    <svg className="ring-svg" width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} className="ring-track"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

/* ─── MAIN ─── */
export default function Portal() {
  const [prog, setProg] = useState(0);
  const [pay, setPay] = useState(0);
  const payPct = Math.round((project.paid / project.budget) * 100);

  useEffect(() => {
    const t1 = setTimeout(() => setProg(project.progress), 400);
    const t2 = setTimeout(() => setPay(payPct), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [payPct]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="bg-scene">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&h=1600&fit=crop&q=80" alt="" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ─── Top Nav Pill ─── */}
        <div className="flex justify-center pt-5 px-4 anim d1">
          <div className="glass-pill px-2 py-1.5 flex items-center gap-1">
            {[
              { icon: "⌂", label: "Home", active: true },
              { icon: "◎", label: "Timeline" },
              { icon: "◈", label: "Payments" },
              { icon: "▣", label: "Materials" },
              { icon: "△", label: "Alerts" },
              { icon: "◷", label: "History" },
            ].map((n, i) => (
              <button key={i} className={`px-4 py-2 rounded-full text-sm transition-all ${
                n.active ? "bg-white/12 text-white font-medium" : "text-white/40 hover:text-white/60"
              }`}>
                <span className="mr-1.5">{n.icon}</span>
                <span className="hidden lg:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="flex-1 px-5 lg:px-10 py-8 max-w-[1400px] mx-auto w-full">

          {/* ─── BENTO ROW 1: Welcome + Camera + Progress ─── */}
          <div className="grid grid-cols-12 gap-4 mb-4">

            {/* Welcome + Team (col 1-4) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between anim d2 min-h-[320px]">
              <div>
                <p className="text-white/50 text-sm italic mb-2">Good Morning Sophia!</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-2">
                  {project.name}
                </h1>
                <p className="text-white/40 text-sm flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-sm font-medium mb-3">Team</p>
                <div className="flex items-center -space-x-2">
                  {team.map((t, i) => (
                    <img key={i} src={t.img} alt={t.name} title={`${t.name} — ${t.role}`}
                      className="w-10 h-10 rounded-full border-2 border-black/30 object-cover hover:scale-110 hover:z-10 transition-transform cursor-pointer" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center text-white/40 text-lg ml-1 cursor-pointer hover:bg-white/10 transition-colors">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Live Camera / Latest Photo (col 5-8) */}
            <div className="col-span-12 lg:col-span-4 anim-scale d3">
              <div className="glass-strong overflow-hidden h-full min-h-[320px] relative group">
                <img src={photos[0]} alt="Live renovation"
                  className="absolute inset-0 w-full h-full object-cover rounded-[23px] group-hover:scale-105 transition-transform duration-700" />
                {/* Overlays */}
                <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 text-xs text-white/70 flex items-center gap-2">
                  Camera 1 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className="absolute top-4 right-4 glass-pill px-3 py-1.5 text-xs text-white flex items-center gap-2">
                  <span className="dot-live" /> Live
                </div>
                {/* Bottom controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="glass-pill px-3 py-2 flex items-center gap-4">
                    {["◉", "🎙", "📷", "⏏", "⏻"].map((ic, i) => (
                      <button key={i} className="text-white/50 hover:text-white transition-colors text-sm">{ic}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Progress Widget (col 9-12) */}
            <div className="col-span-12 lg:col-span-4 glass-strong p-6 anim d4 min-h-[320px] flex flex-col">
              {/* Top stats */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Ring pct={prog} size={52} sw={5} color="var(--green)" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{prog}%</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{project.progress}%</div>
                    <div className="text-xs text-white/35">Complete</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{project.daysLeft}</div>
                  <div className="text-xs text-white/35">Days Left</div>
                </div>
              </div>

              <div className="glass-divider mb-4" />

              {/* Budget / Paid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs text-white/35 mb-1">Budget</div>
                  <div className="text-base font-bold text-white">AED 1.2M</div>
                </div>
                <div>
                  <div className="text-xs text-white/35 mb-1">Paid</div>
                  <div className="text-base font-bold text-[var(--blue)]">AED 540K</div>
                </div>
              </div>

              <div className="glass-divider mb-4" />

              {/* Milestones mini bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40">Milestones</span>
                  <span className="text-xs text-white/60 font-medium">4 / 8</span>
                </div>
                <div className="flex gap-1.5">
                  {milestones.map((m, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full ${
                      m.done ? "bg-[var(--green)]" : m.active ? "bg-[var(--orange)] animate-pulse" : "bg-white/8"
                    }`} style={m.done ? { boxShadow: '0 0 6px rgba(74,222,128,0.3)' } : {}} />
                  ))}
                </div>
              </div>

              {/* Phase */}
              <div className="mt-auto glass-inset px-4 py-3 flex items-center gap-2.5">
                <span className="dot-green flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">{project.phase}</div>
                  <div className="text-xs text-white/35">Current phase</div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── BENTO ROW 2: Payment Gauge + Timeline + Materials + Activity ─── */}
          <div className="grid grid-cols-12 gap-4 mb-4">

            {/* Payment Gauge (like AC) */}
            <div className="col-span-6 lg:col-span-3 glass p-5 anim d5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="dot-green" style={{ background: 'var(--blue)', boxShadow: '0 0 10px rgba(96,165,250,0.5)' }} />
                  <div>
                    <div className="text-sm font-semibold text-white">Payments</div>
                    <div className="text-xs text-white/35">Budget tracking</div>
                  </div>
                </div>
                <button className="text-white/30 hover:text-white/60 transition-colors">◈</button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Gauge value={pay} max={100} size={150} color="var(--blue)" label={`${pay}%`} sub="Paid" />
              </div>
              <div className="flex items-center justify-around mt-2 text-center">
                {[
                  { label: "Paid", val: "540K" },
                  { label: "Due", val: "180K" },
                  { label: "Left", val: "480K" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-xs text-white/30">{s.label}</div>
                    <div className="text-sm font-semibold text-white">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline + Next Payment (wider) */}
            <div className="col-span-6 lg:col-span-4 glass p-5 anim d6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-white">Timeline</div>
                <button className="text-white/30 hover:text-white/60 transition-colors">◎</button>
              </div>
              {/* Milestone dots */}
              <div className="flex items-center gap-2 mb-5">
                {milestones.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${
                      m.done ? "bg-[var(--green)]" : m.active ? "bg-[var(--orange)] animate-pulse" : "bg-white/10"
                    }`} style={m.done ? { boxShadow: '0 0 6px rgba(74,222,128,0.4)' } : m.active ? { boxShadow: '0 0 6px rgba(251,191,36,0.5)' } : {}} />
                    <span className={`text-[9px] text-center leading-tight ${m.done ? "text-white/50" : m.active ? "text-[var(--orange)]" : "text-white/25"}`}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="glass-divider mb-4" />
              {/* Next Payment */}
              <div className="glass-inset p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40">Next Payment</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--orange)]/15 text-[var(--orange)] font-medium">Due Now</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[var(--orange)]">AED 180K</div>
                    <div className="text-xs text-white/30 mt-0.5">MEP Installation</div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white text-xs font-semibold transition-all">
                    Pay →
                  </button>
                </div>
              </div>
              {/* Warning */}
              <div className="mt-3 flex items-center gap-2 text-xs text-[var(--orange)]/80">
                <span>⚠️</span>
                <span>Payment delays may pause next phase</span>
              </div>
            </div>

            {/* Materials (small) */}
            <div className="col-span-6 lg:col-span-2 glass p-5 anim d7 flex flex-col items-center justify-center text-center">
              <div className="text-3xl mb-3">✨</div>
              <div className="text-sm font-semibold text-white mb-1">Materials</div>
              <div className="text-xs text-white/35 mb-4">Fashion House Collection</div>
              <div className="glass-inset px-4 py-2 text-xs text-white/50 w-full text-center">
                12 selections pending
              </div>
            </div>

            {/* Activity Feed (like music player) */}
            <div className="col-span-6 lg:col-span-3 glass p-5 anim d8 flex flex-col">
              <div className="text-sm font-semibold text-white mb-4">Recent Activity</div>
              <div className="flex-1 space-y-3">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-sm flex-shrink-0">{a.icon}</div>
                    <div className="min-w-0">
                      <div className="text-sm text-white/80 leading-snug">{a.text}</div>
                      <div className="text-[10px] text-white/30">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-divider my-3" />
              <button className="text-xs text-[var(--blue)] font-medium hover:underline self-start">View all activity →</button>
            </div>
          </div>

          {/* ─── BENTO ROW 3: Photos + Documents + Quick Actions ─── */}
          <div className="grid grid-cols-12 gap-4 mb-4">

            {/* Photo gallery */}
            <div className="col-span-12 lg:col-span-5 glass p-4 anim d8">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="text-sm font-semibold text-white">Latest Photos</div>
                <button className="text-xs text-[var(--blue)] font-medium">View All →</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(1).map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                    <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="col-span-6 lg:col-span-3 glass p-5 anim d9">
              <div className="text-sm font-semibold text-white mb-4">Documents</div>
              <div className="space-y-2.5">
                {[
                  { name: "Contract.pdf", size: "2.4 MB", icon: "📄" },
                  { name: "Floor Plans.dwg", size: "18 MB", icon: "📐" },
                  { name: "Invoice #5", size: "540 KB", icon: "💰" },
                ].map((d, i) => (
                  <div key={i} className="glass-inset px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors rounded-xl">
                    <span className="text-lg">{d.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white/80 truncate">{d.name}</div>
                      <div className="text-[10px] text-white/30">{d.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact / CTA */}
            <div className="col-span-6 lg:col-span-4 glass p-5 anim d9 flex flex-col justify-between">
              <div>
                <div className="text-sm font-semibold text-white mb-2">Payments drive progress</div>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Each milestone unlocks the next phase. On-time payments keep your renovation on schedule.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 rounded-2xl bg-[var(--blue)] hover:brightness-110 text-white text-sm font-semibold transition-all">
                  Make Payment
                </button>
                <button className="flex-1 py-3 rounded-2xl bg-white/6 hover:bg-white/10 border border-white/10 text-white/70 text-sm font-medium transition-all">
                  Contact Team
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Bottom Nav Pill ─── */}
        <div className="flex justify-center pb-6 px-4 anim d9">
          <div className="glass-pill px-3 py-2 flex items-center gap-2">
            <div className="px-4 py-1.5 rounded-full bg-white/10 text-sm text-white flex items-center gap-2">
              <span>⌂</span> <span>Overview</span>
            </div>
            {["◎", "◈", "▣", "◻", "+"].map((ic, i) => (
              <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/5 transition-all text-sm">
                {ic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
