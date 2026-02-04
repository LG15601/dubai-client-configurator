"use client";

import { useState, useEffect } from "react";

// ─── DATA ──────────────────────────────────────────────

const client = {
  name: "Sophia Al-Mansouri",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
};

const project = {
  name: "Villa Al-Mansouri",
  location: "Palm Jumeirah, Dubai",
  totalBudget: 1200000,
  paidAmount: 540000,
  progress: 68,
  currentPhase: "Interior Finishing",
  daysRemaining: 147,
};

const milestones = [
  { id: 1, title: "Contract Signed", status: "completed" as const, date: "Jan 15", payment: 120000, paymentStatus: "paid" as const },
  { id: 2, title: "Design Approval", status: "completed" as const, date: "Jan 28", payment: 120000, paymentStatus: "paid" as const },
  { id: 3, title: "Demolition", status: "completed" as const, date: "Feb 10", payment: 120000, paymentStatus: "paid" as const },
  { id: 4, title: "Structural Work", status: "completed" as const, date: "Mar 5", payment: 180000, paymentStatus: "paid" as const },
  { id: 5, title: "MEP Installation", status: "in_progress" as const, date: "Mar 25", payment: 180000, paymentStatus: "due" as const },
  { id: 6, title: "Interior Finishing", status: "upcoming" as const, date: "Apr 15", payment: 180000, paymentStatus: "locked" as const },
  { id: 7, title: "Final Inspection", status: "upcoming" as const, date: "Jun 15", payment: 150000, paymentStatus: "locked" as const },
  { id: 8, title: "Handover", status: "upcoming" as const, date: "Jun 30", payment: 150000, paymentStatus: "locked" as const },
];

const activity = [
  { id: 1, text: "Kitchen countertop installed", time: "2h ago", icon: "🔨" },
  { id: 2, text: "Payment received — Structural Work", time: "Yesterday", icon: "✓" },
  { id: 3, text: "New photos uploaded (12)", time: "2 days ago", icon: "📷" },
  { id: 4, text: "MEP wiring approved", time: "3 days ago", icon: "⚡" },
];

// ─── COMPONENTS ────────────────────────────────────────

function ProgressRing({
  progress, size = 220, strokeWidth = 10, color = "var(--accent-green)", children,
}: {
  progress: number; size?: number; strokeWidth?: number; color?: string; children?: React.ReactNode;
}) {
  const r = (size - strokeWidth) / 2;
  const c = r * 2 * Math.PI;
  const offset = c - (progress / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="ring-svg" width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          className="ring-circle" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

function DualRing({ proj, pay }: { proj: number; pay: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 280, height: 280 }}>
        <ProgressRing progress={proj} size={280} strokeWidth={14} color="var(--accent-green)">
          <ProgressRing progress={pay} size={210} strokeWidth={12} color="var(--accent-blue)">
            <div className="text-center">
              <div className="text-5xl font-bold text-white tracking-tight">{proj}<span className="text-2xl opacity-60">%</span></div>
              <div className="text-xs text-white/55 mt-1 uppercase tracking-widest">Complete</div>
            </div>
          </ProgressRing>
        </ProgressRing>
      </div>
      <div className="flex items-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-green)]" style={{ boxShadow: '0 0 8px rgba(48,209,88,0.5)' }} />
          <span className="text-xs text-white/60">Project</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)]" style={{ boxShadow: '0 0 8px rgba(10,132,255,0.5)' }} />
          <span className="text-xs text-white/60">Payments</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────

export default function ClientPortal() {
  const [aProj, setAProj] = useState(0);
  const [aPay, setAPay] = useState(0);

  const payPct = Math.round((project.paidAmount / project.totalBudget) * 100);
  const payDiff = project.progress - payPct;
  const behind = payDiff > 10;

  useEffect(() => {
    const t1 = setTimeout(() => setAProj(project.progress), 500);
    const t2 = setTimeout(() => setAPay(payPct), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [payPct]);

  return (
    <div className="min-h-screen relative">
      {/* ── Immersive Background ── */}
      <div className="bg-immersive">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&h=1600&fit=crop&q=80"
          alt="Luxury renovation"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ── Top Bar ── */}
        <header className="flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="liquid-glass-pill px-5 py-2.5 flex items-center gap-3 animate-fade-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-teal)] flex items-center justify-center">
              <span className="text-white font-bold text-xs">ST</span>
            </div>
            <span className="text-sm font-semibold text-white/90">SmartTrader</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 liquid-glass-pill px-2 py-1.5 animate-fade-up delay-100">
            {["Overview", "Timeline", "Payments", "Materials", "Photos"].map((item, i) => (
              <button key={item} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0 ? "bg-white/10 text-white" : "text-white/60 hover:text-white/90 hover:bg-white/5"
              }`}>{item}</button>
            ))}
          </nav>

          <div className="liquid-glass-pill px-3 py-1.5 flex items-center gap-3 animate-fade-up delay-200">
            <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm text-white/90 hidden sm:inline">{client.name.split(" ")[0]}</span>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="px-6 lg:px-12 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-10 animate-fade-up delay-200">
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text tracking-tight mb-3">
                Welcome back, Sophia
              </h1>
              <p className="text-lg text-white/55">Your renovation journey, at a glance</p>
            </div>

            {/* ── Main Grid ── */}
            <div className="grid lg:grid-cols-2 gap-6">

              {/* ── Left: Project Ring Card ── */}
              <div className="liquid-glass-strong p-8 lg:p-10 animate-scale-in delay-300">
                <div className="flex flex-col items-center">
                  <DualRing proj={aProj} pay={aPay} />

                  <div className="w-full mt-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
                    <p className="text-sm text-white/55 flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </p>
                  </div>

                  {/* Phase + Warning */}
                  <div className="w-full mt-6 space-y-3">
                    <div className="liquid-glass-pill px-4 py-2.5 flex items-center justify-center gap-2">
                      <span className="status-dot status-active" />
                      <span className="text-sm font-medium text-[var(--accent-green)]">{project.currentPhase}</span>
                    </div>

                    {behind && (
                      <div className="liquid-glass-subtle px-4 py-3 flex items-center gap-3 !rounded-2xl border-[var(--accent-orange)]/30" style={{ borderColor: 'rgba(255,159,10,0.25)' }}>
                        <span className="text-lg">⚠️</span>
                        <div>
                          <p className="text-sm font-medium text-[var(--accent-orange)]">Payments are {payDiff}% behind</p>
                          <p className="text-xs text-white/60 mt-0.5">On-time payment keeps your project on schedule</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Right: Stats + Quick Info ── */}
              <div className="space-y-6">
                {/* Stat Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Budget", value: `AED ${(project.totalBudget/1e6).toFixed(1)}M`, color: "white", delay: "delay-300" },
                    { label: "Paid", value: `AED ${(project.paidAmount/1e3).toFixed(0)}K`, color: "var(--accent-blue)", delay: "delay-400" },
                    { label: "Days Left", value: `${project.daysRemaining}`, color: "white", delay: "delay-500" },
                    { label: "Milestones", value: `${milestones.filter(m=>m.status==="completed").length}/${milestones.length}`, color: "var(--accent-green)", delay: "delay-600" },
                  ].map(s => (
                    <div key={s.label} className={`liquid-glass p-5 glass-hover animate-fade-up ${s.delay}`}>
                      <div className="text-xs text-white/60 uppercase tracking-widest mb-2">{s.label}</div>
                      <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Payment CTA */}
                <div className="liquid-glass p-6 animate-fade-up delay-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Next Payment Due</h3>
                    <span className="status-dot status-due" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[var(--accent-orange)]">AED 180K</p>
                      <p className="text-xs text-white/60 mt-1">MEP Installation phase</p>
                    </div>
                    <button className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all hover:scale-[1.02]">
                      Pay Now →
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="liquid-glass p-6 animate-fade-up delay-700">
                  <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {activity.map((a) => (
                      <div key={a.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-sm flex-shrink-0">{a.icon}</div>
                        <div>
                          <p className="text-sm text-white/90">{a.text}</p>
                          <p className="text-xs text-white/45">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Timeline Section ── */}
            <div className="mt-8 liquid-glass-strong p-8 animate-fade-up delay-600">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Project & Payment Timeline</h3>
                <div className="liquid-glass-pill px-3 py-1.5 text-xs text-white/60">
                  {milestones.filter(m=>m.status==="completed").length} of {milestones.length} complete
                </div>
              </div>

              {/* Horizontal timeline */}
              <div className="relative">
                {/* Progress bar background */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/8 rounded-full" />
                {/* Progress bar filled */}
                <div
                  className="absolute top-5 left-0 h-0.5 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(milestones.filter(m=>m.status==="completed").length / milestones.length) * 100}%`,
                    background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))',
                    boxShadow: '0 0 12px rgba(48,209,88,0.4)',
                  }}
                />

                <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                  {milestones.map((m) => {
                    const dotColor = m.status === "completed" ? "bg-[var(--accent-blue)]" :
                      m.status === "in_progress" ? "status-active" : "bg-white/15";
                    const payColor = m.paymentStatus === "paid" ? "text-[var(--accent-green)]" :
                      m.paymentStatus === "due" ? "text-[var(--accent-orange)]" : "text-white/40";
                    const payBg = m.paymentStatus === "paid" ? "bg-[var(--accent-green)]/10" :
                      m.paymentStatus === "due" ? "bg-[var(--accent-orange)]/10" : "bg-white/5";
                    const payLabel = m.paymentStatus === "paid" ? "Paid" :
                      m.paymentStatus === "due" ? "Due" : "Locked";

                    return (
                      <div key={m.id} className="flex flex-col items-center text-center">
                        {/* Dot */}
                        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} mb-3 relative z-10`} />
                        {/* Title */}
                        <p className={`text-xs font-medium mb-1 ${m.status === "upcoming" ? "text-white/45" : "text-white/90"}`}>
                          {m.title}
                        </p>
                        <p className="text-[10px] text-white/40 mb-2">{m.date}</p>
                        {/* Payment badge */}
                        <div className={`${payBg} ${payColor} text-[10px] font-medium px-2 py-1 rounded-full`}>
                          {payLabel}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Photos ── */}
            <div className="mt-8 liquid-glass p-6 animate-fade-up delay-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Latest Photos</h3>
                <button className="text-xs text-[var(--accent-blue)] font-medium">View All →</button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", caption: "Living room" },
                  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop", caption: "Kitchen" },
                  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", caption: "Master bedroom" },
                  { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=300&fit=crop", caption: "Bathroom" },
                ].map((p, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs font-medium">{p.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div className="mt-8 mb-12 liquid-glass-strong p-8 text-center animate-fade-up delay-800"
              style={{ borderColor: 'rgba(10,132,255,0.2)', boxShadow: '0 0 60px rgba(10,132,255,0.08)' }}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Payments unlock progress
              </h3>
              <p className="text-sm text-white/60 max-w-lg mx-auto mb-6">
                Each milestone is tied to a payment. Stay on track and your dream home stays on schedule.
                Delays in payment may pause the next construction phase.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="px-8 py-3.5 rounded-2xl bg-[var(--accent-blue)] text-white font-semibold text-sm hover:brightness-110 transition-all">
                  Make Payment
                </button>
                <button className="px-8 py-3.5 rounded-2xl bg-white/8 hover:bg-white/12 border border-white/12 text-white/90 text-sm font-medium transition-all">
                  Contact Team
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="fixed bottom-4 left-4 right-4 md:hidden liquid-glass-pill px-2 py-2 z-50 flex items-center justify-around">
          {[
            { icon: "◉", label: "Home", active: true },
            { icon: "◎", label: "Timeline", active: false },
            { icon: "◈", label: "Pay", active: false },
            { icon: "◻", label: "Photos", active: false },
          ].map(n => (
            <button key={n.label} className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-full ${n.active ? "bg-white/10 text-white" : "text-white/60"}`}>
              <span className="text-base">{n.icon}</span>
              <span className="text-[10px]">{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
