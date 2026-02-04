"use client";

import { useState, useEffect, useMemo } from "react";

// ============================================
// DATA TYPES & MOCK DATA
// ============================================

interface ProjectData {
  name: string;
  clientName: string;
  totalBudget: number;
  paidAmount: number;
  projectProgress: number;
  timelineProgress: number;
  paymentProgress: number;
  projectedDelivery: string;
  nextPaymentDue: string;
  nextPaymentAmount: number;
  paymentOverdue: boolean;
  daysOverdue: number;
  impactDays: number;
}

interface Milestone {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
}

interface Ambiance {
  id: string;
  name: string;
  image: string;
}

// Mock data - simulating real project
const projectData: ProjectData = {
  name: "Villa Al-Safa Renovation",
  clientName: "Mr. Al Maktoum",
  totalBudget: 12500000,
  paidAmount: 7500000,
  projectProgress: 72,
  timelineProgress: 58,
  paymentProgress: 60,
  projectedDelivery: "August 14, 2026",
  nextPaymentDue: "March 1, 2026",
  nextPaymentAmount: 2500000,
  paymentOverdue: true, // Toggle to see impact
  daysOverdue: 12,
  impactDays: 28,
};

const milestones: Milestone[] = [
  { id: 1, title: "Phase 1: Architectural Plan", status: "completed" },
  { id: 2, title: "Phase 2: Structural Work", status: "completed" },
  { id: 3, title: "Phase 3: MEP Installation", status: "in-progress" },
  { id: 4, title: "Phase 4: Interior Finishing", status: "upcoming" },
  { id: 5, title: "Phase 5: Final Inspection", status: "upcoming" },
];

const ambiances: Ambiance[] = [
  {
    id: "modern-warm",
    name: "Modern Warm",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
  },
  {
    id: "italian-classic",
    name: "Italian Classic",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: "minimal-zen",
    name: "Minimal Zen",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  },
];

// ============================================
// ACTIVITY RINGS COMPONENT
// ============================================

interface RingProps {
  progress: number;
  radius: number;
  color: string;
  className?: string;
}

function ActivityRing({ progress, radius, color, className }: RingProps) {
  const strokeWidth = 22;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* Track */}
      <circle
        className="ring-track"
        r={normalizedRadius}
        cx="140"
        cy="140"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        className={`ring-progress ${className}`}
        r={normalizedRadius}
        cx="140"
        cy="140"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ stroke: color }}
      />
    </>
  );
}

interface ActivityRingsProps {
  project: number;
  timeline: number;
  payment: number;
  deliveryDate: string;
  impactDays?: number;
  showImpact: boolean;
}

function ActivityRings({ project, timeline, payment, deliveryDate, impactDays, showImpact }: ActivityRingsProps) {
  const [animatedProject, setAnimatedProject] = useState(0);
  const [animatedTimeline, setAnimatedTimeline] = useState(0);
  const [animatedPayment, setAnimatedPayment] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProject(project);
      setAnimatedTimeline(timeline);
      setAnimatedPayment(payment);
    }, 200);
    return () => clearTimeout(timer);
  }, [project, timeline, payment]);

  return (
    <div className="rings-wrapper">
      <svg className="activity-rings" viewBox="0 0 280 280">
        {/* Outer ring - Project (Green) */}
        <ActivityRing
          progress={animatedProject}
          radius={130}
          color="#34C759"
          className="ring-project"
        />
        {/* Middle ring - Timeline (Blue) */}
        <ActivityRing
          progress={animatedTimeline}
          radius={100}
          color="#007AFF"
          className="ring-timeline"
        />
        {/* Inner ring - Payment (Coral) */}
        <ActivityRing
          progress={animatedPayment}
          radius={70}
          color="#FF6347"
          className="ring-payment"
        />
      </svg>

      {/* Center Hub */}
      <div className="ring-center">
        <span className="ring-label">Projected Delivery</span>
        <span className="ring-date">{deliveryDate}</span>
        {showImpact && impactDays && (
          <span className="impact-alert">+{impactDays} days impact</span>
        )}
      </div>

      {/* Legend */}
      <div className="ring-legend">
        <div className="legend-item">
          <span className="legend-dot project" />
          <span className="legend-label">Project {project}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot timeline" />
          <span className="legend-label">Timeline {timeline}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot payment" />
          <span className="legend-label">Payment {payment}%</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MILESTONE LIST COMPONENT
// ============================================

function MilestoneList({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="panel">
      <h3 className="panel-header">Project Milestones</h3>
      <div className="milestone-list">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="milestone-item">
            <span className={`milestone-dot ${milestone.status}`} />
            <span className={`milestone-text ${milestone.status}`}>
              {milestone.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FINANCIAL PANEL COMPONENT
// ============================================

interface FinancialPanelProps {
  data: ProjectData;
}

function FinancialPanel({ data }: FinancialPanelProps) {
  const formatCurrency = (amount: number) => {
    return `AED ${(amount / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="panel">
      <h3 className="panel-header">Financial Overview</h3>
      <div className="financial-data">
        <div className="financial-row">
          <span className="financial-label">Total Budget</span>
          <span className="financial-value">{formatCurrency(data.totalBudget)}</span>
        </div>
        <div className="financial-row">
          <span className="financial-label">Paid to Date</span>
          <span className="financial-value">{formatCurrency(data.paidAmount)}</span>
        </div>
        <div className="financial-row">
          <span className="financial-label">Next Payment</span>
          <span className="financial-value">{formatCurrency(data.nextPaymentAmount)}</span>
        </div>
        
        {data.paymentOverdue ? (
          <div className="payment-status overdue">
            Payment Overdue ({data.daysOverdue} days)
          </div>
        ) : (
          <div className="payment-status on-time">
            Due on {data.nextPaymentDue}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// AMBIANCE CATALOGUE COMPONENT
// ============================================

interface AmbianceCatalogueProps {
  ambiances: Ambiance[];
  selected: string;
  onSelect: (id: string) => void;
}

function AmbianceCatalogue({ ambiances, selected, onSelect }: AmbianceCatalogueProps) {
  const selectedName = ambiances.find(a => a.id === selected)?.name || "";

  return (
    <div className="bottom-panel">
      <div className="ambiance-header">
        Selected Ambiance: <strong>{selectedName}</strong>
      </div>
      <div className="ambiance-cards">
        {ambiances.map((ambiance) => (
          <div
            key={ambiance.id}
            className={`ambiance-card ${selected === ambiance.id ? "selected" : ""}`}
            onClick={() => onSelect(ambiance.id)}
          >
            <div className="ambiance-image">
              <img src={ambiance.image} alt={ambiance.name} />
            </div>
            <div className="ambiance-title">{ambiance.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function DubaiClientPortal() {
  const [selectedAmbiance, setSelectedAmbiance] = useState("italian-classic");

  // Calculate adjusted delivery if payment is overdue
  const adjustedDelivery = useMemo(() => {
    if (projectData.paymentOverdue) {
      // Parse and add impact days
      const baseDate = new Date("2026-08-14");
      baseDate.setDate(baseDate.getDate() + projectData.impactDays);
      return baseDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return projectData.projectedDelivery;
  }, []);

  return (
    <div className="ipad-frame">
      {/* Top Bar */}
      <header className="top-bar">
        <h1 className="project-title">{projectData.name}</h1>
        <span className="client-welcome">Welcome, {projectData.clientName}</span>
      </header>

      {/* Center Stage - 3 Column Layout */}
      <main className="center-stage">
        {/* Left Panel - Milestones */}
        <MilestoneList milestones={milestones} />

        {/* Center - Activity Rings */}
        <div className="panel rings-panel">
          <div className="rings-container">
            <ActivityRings
              project={projectData.projectProgress}
              timeline={projectData.timelineProgress}
              payment={projectData.paymentProgress}
              deliveryDate={projectData.paymentOverdue ? adjustedDelivery : projectData.projectedDelivery}
              impactDays={projectData.impactDays}
              showImpact={projectData.paymentOverdue}
            />
          </div>
        </div>

        {/* Right Panel - Financial */}
        <FinancialPanel data={projectData} />
      </main>

      {/* Bottom Panel - Ambiance Catalogue */}
      <AmbianceCatalogue
        ambiances={ambiances}
        selected={selectedAmbiance}
        onSelect={setSelectedAmbiance}
      />
    </div>
  );
}
