"use client";

import { useState } from "react";
import Link from "next/link";

const milestones = [
  {
    id: 1,
    title: "Contract Signed",
    description: "Project agreement and initial payment completed",
    status: "completed",
    date: "Jan 15, 2026",
    completedDate: "Jan 15, 2026",
    payment: { amount: 120000, status: "paid", dueDate: "Jan 15, 2026" },
    photos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Design Approval",
    description: "Final designs and 3D renders approved by client",
    status: "completed",
    date: "Jan 28, 2026",
    completedDate: "Jan 28, 2026",
    payment: { amount: 180000, status: "paid", dueDate: "Jan 30, 2026" },
    photos: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Demolition & Preparation",
    description: "Removal of existing fixtures and site preparation",
    status: "completed",
    date: "Feb 10, 2026",
    completedDate: "Feb 10, 2026",
    photos: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=300&h=200&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Structural Work",
    description: "Wall modifications and structural reinforcements",
    status: "completed",
    date: "Mar 5, 2026",
    completedDate: "Mar 5, 2026",
    payment: { amount: 240000, status: "paid", dueDate: "Mar 10, 2026" },
    photos: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
    ],
  },
  {
    id: 5,
    title: "MEP Installation",
    description: "Electrical, plumbing, and HVAC systems installation",
    status: "in_progress",
    date: "Mar 25, 2026",
    payment: { amount: 180000, status: "pending", dueDate: "Mar 30, 2026" },
    photos: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6e6ba5d071?w=300&h=200&fit=crop",
    ],
    progress: 65,
  },
  {
    id: 6,
    title: "Interior Finishing",
    description: "Flooring, walls, ceilings, and paint work",
    status: "upcoming",
    date: "Apr 15, 2026",
    payment: { amount: 180000, status: "upcoming", dueDate: "Apr 20, 2026" },
  },
  {
    id: 7,
    title: "Fixtures & Fittings",
    description: "Installation of kitchen, bathrooms, and custom furniture",
    status: "upcoming",
    date: "May 15, 2026",
  },
  {
    id: 8,
    title: "Final Inspection",
    description: "Quality checks and client walkthrough",
    status: "upcoming",
    date: "Jun 15, 2026",
    payment: { amount: 120000, status: "upcoming", dueDate: "Jun 20, 2026" },
  },
  {
    id: 9,
    title: "Handover",
    description: "Keys delivery and project completion",
    status: "upcoming",
    date: "Jun 30, 2026",
  },
];

const statusConfig = {
  completed: {
    icon: "✓",
    bgColor: "bg-brand-gold",
    textColor: "text-white",
    lineColor: "bg-brand-gold",
  },
  in_progress: {
    icon: "⚡",
    bgColor: "bg-brand-gold/20",
    textColor: "text-brand-gold",
    lineColor: "bg-gradient-to-b from-brand-gold to-dubai-200",
  },
  upcoming: {
    icon: "○",
    bgColor: "bg-dubai-200",
    textColor: "text-dubai-500",
    lineColor: "bg-dubai-200",
  },
};

export default function TimelinePage() {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(5);
  const [showPayments, setShowPayments] = useState(false);

  const totalBudget = 1200000;
  const paidAmount = milestones
    .filter((m) => m.payment?.status === "paid")
    .reduce((sum, m) => sum + (m.payment?.amount || 0), 0);
  const pendingAmount = milestones
    .filter((m) => m.payment?.status === "pending")
    .reduce((sum, m) => sum + (m.payment?.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-dubai pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/20 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-xl hover:bg-white/50 transition-colors">
              <svg className="w-5 h-5 text-dubai-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="font-display text-xl font-bold text-brand-navy">Project Timeline</h1>
              <p className="text-sm text-dubai-500">Villa Al-Mansouri</p>
            </div>
          </div>
          <button
            onClick={() => setShowPayments(!showPayments)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showPayments
                ? "bg-brand-gold text-white"
                : "bg-white text-dubai-600 hover:bg-dubai-100"
            }`}
          >
            💳 Payments
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress Summary */}
        <div className="card-luxury p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-dubai-500">Overall Progress</p>
              <p className="text-3xl font-bold text-brand-navy">68%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-dubai-500">Estimated Completion</p>
              <p className="text-lg font-semibold text-brand-navy">Jun 30, 2026</p>
            </div>
          </div>
          <div className="h-3 bg-dubai-200 rounded-full overflow-hidden">
            <div 
              className="h-full gradient-gold rounded-full transition-all duration-1000"
              style={{ width: "68%" }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-dubai-500">{milestones.filter((m) => m.status === "completed").length} completed</span>
            <span className="text-brand-gold font-medium">1 in progress</span>
            <span className="text-dubai-500">{milestones.filter((m) => m.status === "upcoming").length} upcoming</span>
          </div>
        </div>

        {/* Payment Summary */}
        {showPayments && (
          <div className="card-luxury p-6 mb-8 glass-gold animate-slide-up">
            <h3 className="font-display text-lg font-bold text-brand-navy mb-4">Payment Schedule</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-green-50">
                <p className="text-sm text-dubai-500 mb-1">Paid</p>
                <p className="text-lg font-bold text-green-600">AED {(paidAmount / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-amber-50">
                <p className="text-sm text-dubai-500 mb-1">Pending</p>
                <p className="text-lg font-bold text-amber-600">AED {(pendingAmount / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-dubai-100">
                <p className="text-sm text-dubai-500 mb-1">Remaining</p>
                <p className="text-lg font-bold text-dubai-600">AED {((totalBudget - paidAmount - pendingAmount) / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className="h-2 bg-dubai-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-green-500" style={{ width: `${(paidAmount / totalBudget) * 100}%` }} />
              <div className="h-full bg-amber-500" style={{ width: `${(pendingAmount / totalBudget) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-0">
          {milestones.map((milestone, index) => {
            const config = statusConfig[milestone.status as keyof typeof statusConfig];
            const isExpanded = expandedMilestone === milestone.id;
            const isLast = index === milestones.length - 1;

            return (
              <div key={milestone.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${config.bgColor} ${config.textColor} ${
                      milestone.status === "in_progress" ? "pulse-gold" : ""
                    }`}
                  >
                    {config.icon}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[20px] ${config.lineColor}`} />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-6 ${isLast ? "" : ""}`}>
                  <button
                    onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                    className={`w-full text-left card-luxury p-4 transition-all ${
                      milestone.status === "in_progress" ? "ring-2 ring-brand-gold/30" : ""
                    } ${isExpanded ? "shadow-glass" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${
                            milestone.status === "completed" ? "text-dubai-500" : "text-brand-navy"
                          }`}>
                            {milestone.title}
                          </h3>
                          {milestone.status === "in_progress" && (
                            <span className="px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-medium">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dubai-500">{milestone.date}</p>
                      </div>
                      <svg
                        className={`w-5 h-5 text-dubai-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-dubai-100 animate-fade-in">
                        <p className="text-dubai-600 mb-4">{milestone.description}</p>

                        {/* Progress Bar (for in_progress) */}
                        {milestone.progress !== undefined && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-dubai-500">Progress</span>
                              <span className="font-medium text-brand-gold">{milestone.progress}%</span>
                            </div>
                            <div className="h-2 bg-dubai-200 rounded-full overflow-hidden">
                              <div
                                className="h-full gradient-gold rounded-full"
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Photos */}
                        {milestone.photos && milestone.photos.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-dubai-600 mb-2">Photos</p>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {milestone.photos.map((photo, i) => (
                                <img
                                  key={i}
                                  src={photo}
                                  alt=""
                                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Payment Info */}
                        {milestone.payment && showPayments && (
                          <div className={`p-3 rounded-xl ${
                            milestone.payment.status === "paid"
                              ? "bg-green-50"
                              : milestone.payment.status === "pending"
                              ? "bg-amber-50"
                              : "bg-dubai-100"
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-dubai-500">Payment</p>
                                <p className="font-bold text-brand-navy">
                                  AED {milestone.payment.amount.toLocaleString()}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                milestone.payment.status === "paid"
                                  ? "bg-green-500 text-white"
                                  : milestone.payment.status === "pending"
                                  ? "bg-amber-500 text-white"
                                  : "bg-dubai-300 text-dubai-700"
                              }`}>
                                {milestone.payment.status === "paid" ? "Paid" : 
                                 milestone.payment.status === "pending" ? "Due Soon" : "Upcoming"}
                              </span>
                            </div>
                            {milestone.payment.status !== "paid" && (
                              <p className="text-xs text-dubai-500 mt-1">
                                Due: {milestone.payment.dueDate}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden glass border-t border-white/20 px-6 py-3 z-30">
        <div className="flex items-center justify-around">
          {[
            { icon: "🏠", label: "Home", href: "/", active: false },
            { icon: "✨", label: "Materials", href: "/materials", active: false },
            { icon: "📅", label: "Timeline", href: "/timeline", active: true },
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
  );
}
