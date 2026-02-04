"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Project data
const project = {
  name: "Villa Al-Mansouri",
  location: "Palm Jumeirah, Dubai",
  budget: 1200000,
  progress: 68,
  startDate: "2026-01-15",
  endDate: "2026-06-30",
  currentPhase: "Interior Finishing",
  daysRemaining: 147,
};

const milestones = [
  { id: 1, title: "Contract Signed", status: "completed", date: "Jan 15", icon: "✓" },
  { id: 2, title: "Design Approval", status: "completed", date: "Jan 28", icon: "✓" },
  { id: 3, title: "Demolition", status: "completed", date: "Feb 10", icon: "✓" },
  { id: 4, title: "Structural Work", status: "completed", date: "Mar 5", icon: "✓" },
  { id: 5, title: "MEP Installation", status: "in_progress", date: "Mar 25", icon: "⚡" },
  { id: 6, title: "Interior Finishing", status: "upcoming", date: "Apr 15", icon: "🎨" },
  { id: 7, title: "Final Inspection", status: "upcoming", date: "Jun 15", icon: "🔍" },
  { id: 8, title: "Handover", status: "upcoming", date: "Jun 30", icon: "🔑" },
];

const recentPhotos = [
  { id: 1, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", caption: "Living room progress" },
  { id: 2, url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop", caption: "Kitchen installation" },
  { id: 3, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", caption: "Master bedroom" },
  { id: 4, url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=300&fit=crop", caption: "Bathroom tiles" },
];

const quickActions = [
  { title: "Fashion House", description: "Browse & select materials", href: "/materials", icon: "✨", color: "from-amber-100 to-amber-50" },
  { title: "Timeline", description: "View full project schedule", href: "/timeline", icon: "📅", color: "from-blue-100 to-blue-50" },
  { title: "Payments", description: "Payment schedule & status", href: "/payments", icon: "💳", color: "from-green-100 to-green-50" },
  { title: "Messages", description: "Contact your team", href: "/messages", icon: "💬", color: "from-purple-100 to-purple-50" },
];

function ProgressRing({ progress, size = 180 }: { progress: number; size?: number }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8DED1"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8960C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-brand-navy">{progress}%</span>
        <span className="text-sm text-dubai-600">Complete</span>
      </div>
    </div>
  );
}

export default function ClientPortal() {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(project.progress);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dubai">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&h=1200&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dubai-50/80 via-dubai-50/95 to-dubai-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-brand-navy">Smart Renovation</h1>
              <p className="text-xs text-dubai-600">Dubai</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl glass hover:bg-white/80 transition-colors">
              <svg className="w-5 h-5 text-dubai-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3 glass rounded-2xl px-3 py-2">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                alt="Sophia"
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-brand-navy">Sophia Al-Mansouri</p>
                <p className="text-xs text-dubai-600">Premium Client</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy mb-2">
              Welcome back, Sophia ✨
            </h2>
            <p className="text-dubai-600 text-lg">Your dream home is taking shape beautifully</p>
          </div>

          {/* Progress Card */}
          <div className="card-luxury p-8 mb-8 animate-slide-up">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Progress Ring */}
              <ProgressRing progress={animatedProgress} />

              {/* Project Info */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">{project.name}</h3>
                <p className="text-dubai-600 mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-brand-navy">AED {(project.budget / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-dubai-500">Total Budget</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-brand-gold">{project.daysRemaining}</p>
                    <p className="text-sm text-dubai-500">Days Remaining</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-brand-navy">{milestones.filter(m => m.status === "completed").length}/{milestones.length}</p>
                    <p className="text-sm text-dubai-500">Milestones</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-sm font-medium text-dubai-700">Currently: {project.currentPhase}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className="card-luxury card-hover p-5 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h4 className="font-semibold text-brand-navy mb-1">{action.title}</h4>
                <p className="text-sm text-dubai-500">{action.description}</p>
              </Link>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Timeline Preview */}
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-brand-navy">Project Timeline</h3>
                <Link href="/timeline" className="text-sm text-brand-gold font-medium hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {milestones.slice(0, 5).map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      milestone.status === "completed" 
                        ? "bg-brand-gold text-white" 
                        : milestone.status === "in_progress"
                        ? "bg-brand-gold/20 text-brand-gold pulse-gold"
                        : "bg-dubai-200 text-dubai-500"
                    }`}>
                      {milestone.status === "completed" ? "✓" : milestone.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${milestone.status === "completed" ? "text-dubai-500" : "text-brand-navy"}`}>
                        {milestone.title}
                      </p>
                      <p className="text-sm text-dubai-400">{milestone.date}</p>
                    </div>
                    {milestone.status === "in_progress" && (
                      <span className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Photos */}
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-brand-navy">Latest Photos</h3>
                <Link href="/photos" className="text-sm text-brand-gold font-medium hover:underline">
                  View gallery →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recentPhotos.map((photo) => (
                  <div key={photo.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-8 card-luxury p-8 glass-gold overflow-hidden relative">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                  Ready to choose your materials? ✨
                </h3>
                <p className="text-dubai-600">
                  Explore our curated Fashion House collection and bring your vision to life
                </p>
              </div>
              <Link
                href="/materials"
                className="btn-gold whitespace-nowrap flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-brand-gold/10 blur-3xl" />
          </div>
        </main>

        {/* Bottom Navigation (Mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 lg:hidden glass border-t border-white/20 px-6 py-3 z-50">
          <div className="flex items-center justify-around">
            {[
              { icon: "🏠", label: "Home", href: "/", active: true },
              { icon: "✨", label: "Materials", href: "/materials", active: false },
              { icon: "📅", label: "Timeline", href: "/timeline", active: false },
              { icon: "💬", label: "Messages", href: "/messages", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-1 ${item.active ? "text-brand-gold" : "text-dubai-500"}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
