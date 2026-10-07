import React from "react";
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Route,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Star,
  MapPin,
  Search,
  Sparkles,
  Map as MapIcon,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";

// ---- Placeholder data (swap with real API data later) ----

const statCards = [
  { key: "buildings", label: "Number of buildings", value: 12, delta: "+1 from last month", icon: Building2, tone: "blue" },
  { key: "facilities", label: "Number of facilities", value: 48, delta: "+3 from last month", icon: Landmark, tone: "green" },
  { key: "pathways", label: "Number of pathways", value: 36, delta: "+5 from last month", icon: MapPin, tone: "pink" },
  { key: "activity", label: "Recent Activity", value: 24, delta: "+8% From yesterday", icon: ClipboardList, tone: "orange" },
];

const mapsViewsData = [
  { day: "Apr 19", v: 180 }, { day: "Apr 20", v: 220 }, { day: "Apr 21", v: 200 },
  { day: "Apr 22", v: 260 }, { day: "Apr 23", v: 240 }, { day: "Apr 24", v: 300 },
  { day: "Apr 25", v: 280 }, { day: "Apr 26", v: 340 },
];

const facilityResearchData = [
  { day: "Apr 19", v: 120 }, { day: "Apr 20", v: 160 }, { day: "Apr 21", v: 180 },
  { day: "Apr 22", v: 150 }, { day: "Apr 23", v: 220 }, { day: "Apr 24", v: 260 },
  { day: "Apr 25", v: 300 }, { day: "Apr 26", v: 340 },
];

const aiUsageData = [
  { day: "Apr 19", v: 90 }, { day: "Apr 20", v: 130 }, { day: "Apr 21", v: 110 },
  { day: "Apr 22", v: 170 }, { day: "Apr 23", v: 150 }, { day: "Apr 24", v: 210 },
  { day: "Apr 25", v: 190 }, { day: "Apr 26", v: 240 },
];

const mostViewedFacilities = [
  { rank: 1, name: "Law Library", views: 452 },
  { rank: 2, name: "Student Center", views: 385 },
  { rank: 3, name: "CITE Building", views: 328 },
  { rank: 4, name: "Gymnasium", views: 301 },
  { rank: 5, name: "Registrar building", views: 284 },
];

const legend = [
  { label: "Total locations", value: 45, color: "#1d4ed8" },
  { label: "Buildings", value: 10, color: "#2563eb" },
  { label: "Facilities", value: 15, color: "#16a34a" },
  { label: "Pathways", value: 20, color: "#9333ea" },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, target: "dashboard", active: true },
  { label: "Buildings", icon: Building2, target: "buildings" },
  { label: "Facilities", icon: Landmark, target: "facilities" },
  { label: "Pathways", icon: Route, target: "pathways" },
  { label: "Map", icon: MapIcon, target: "dashboard" },
  { label: "Logs", icon: ClipboardList, target: "logs" },
  { label: "System Information", icon: Settings, target: "system" },
];

// tone -> tailwind bg color for stat card wrapper
const toneBg = {
  blue: "bg-[#dbeafe]",
  green: "bg-[#dcfce7]",
  pink: "bg-[#fae8ff]",
  orange: "bg-[#ffedd5]",
};

// ---- Small building blocks ----

function StatCard({ label, value, delta, icon: Icon, tone }) {
  return (
    <div
      className={`flex items-start gap-3.5 rounded-xl border border-black/[0.04] p-[16px_18px] ${toneBg[tone]}`}
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-white/60">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div>
        <p className="m-0 mb-1 text-xs text-gray-600">{label}</p>
        <p className="m-0 mb-1 text-[22px] font-bold">{value}</p>
        <p className="m-0 text-[11px] text-green-600">{delta}</p>
      </div>
    </div>
  );
}

function MiniBarChart({ data, color }) {
  return (
    <div className="flex h-[60px] items-end gap-1.5" aria-hidden="true">
      {data.map((item) => (
        <span
          key={item.day}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${Math.max(12, (item.v / 340) * 100)}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

// ---- Main component ----

export default function Dashboard({ onNavigate, activePage = "dashboard" }) {
  return (
    <div className="flex min-h-screen bg-[#f3f4f8] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[220px] flex-col bg-[#16224f] p-[14px_14px_20px] text-white">
        <div className="flex items-center gap-2 px-2 pb-6 pt-1">
          <img src={logo} alt="UCUNAV logo" className="h-7 w-7 object-contain" />
          <span className="text-lg font-bold tracking-wide">
            UCU<span className="text-[#f7b500]">NAV</span>
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map(({ label, icon: Icon, target }) => {
            const isActive = label.toLowerCase() === activePage.toLowerCase();

            return (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate?.(target)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-[#c7cde0] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2.5 border-t border-white/10 pt-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
              <User size={16} />
            </span>
            <div>
              <p className="m-0 text-[13px] font-semibold">Admin</p>
              <p className="m-0 text-[11px] text-[#9aa3c2]">System Administrator</p>
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 px-1 py-1.5 text-[13px] text-[#c7cde0] hover:text-white">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col gap-5 p-[0px_28px_40px]">
        <header className="-mx-[28px] flex items-start rounded-none bg-white p-4 px-7 shadow-sm">
          <div>
            <h1 className="m-0 mb-1 text-lg font-bold tracking-wide">Dashboard</h1>
            <p className="m-0 text-xs text-gray-500">
              Welcome back, Admin! Here's what's happening with UCUNav.
            </p>
          </div>
        </header>

        {/* Stat cards */}
        <section className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          {statCards.map((card) => (
            <StatCard key={card.key} {...card} />
          ))}
        </section>

        {/* Usage statistics */}
        <section className="rounded-xl bg-white p-[18px_20px] shadow-sm">
          <h2 className="m-0 flex items-center gap-1.5 text-[15px] font-bold">
            Usage Statistics
          </h2>
          <p className="mb-4 mt-1 text-xs text-gray-500">
            Activity overview of the UCUNav system
          </p>

          <div className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1">
            <div className="rounded-[10px] border border-[#eef0f4] p-3.5">
              <div className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold text-gray-800">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-blue-600">
                  <MapPin size={16} />
                </span>
                <span>Maps Views</span>
              </div>
              <p className="m-0 mb-1 text-xl font-bold">
                1,248 <span className="ml-1.5 text-[11px] font-semibold text-green-600">&uarr; +12%</span>
              </p>
              <MiniBarChart data={mapsViewsData} color="#60a5fa" />
            </div>

            <div className="rounded-[10px] border border-[#eef0f4] p-3.5">
              <div className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold text-gray-800">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-green-600">
                  <Search size={16} />
                </span>
                <span>Facility Research</span>
              </div>
              <p className="m-0 mb-1 text-xl font-bold">
                842 <span className="ml-1.5 text-[11px] font-semibold text-green-600">&uarr; +18%</span>
              </p>
              <MiniBarChart data={facilityResearchData} color="#22c55e" />
            </div>

            <div className="rounded-[10px] border border-[#eef0f4] p-3.5">
              <div className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold text-gray-800">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-violet-600">
                  <Sparkles size={16} />
                </span>
                <span>AI Usage</span>
              </div>
              <p className="m-0 mb-1 text-xl font-bold">
                421 <span className="ml-1.5 text-[11px] font-semibold text-green-600">&uarr; +24%</span>
              </p>
              <MiniBarChart data={aiUsageData} color="#a78bfa" />
            </div>
          </div>
        </section>

        {/* Bottom row: facilities list + map */}
        <section className="grid grid-cols-[1.08fr_1fr] items-stretch gap-[18px] max-[1024px]:grid-cols-1">
          <div className="rounded-xl border border-slate-400/20 bg-[#f7f9fc] p-[18px_18px_14px]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="m-0 flex items-center gap-2 text-lg font-bold text-[#1e2b43]">
                <Star size={16} className="text-amber-500" />
                Most Viewed Facilities
              </h2>
              <button type="button" className="border-none bg-transparent text-xs text-blue-600">
                View all &rarr;
              </button>
            </div>

            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {mostViewedFacilities.map((f) => (
                <li
                  key={f.rank}
                  className="grid min-h-[46px] grid-cols-[22px_42px_minmax(0,1fr)_auto] items-center gap-3 rounded-[10px] bg-slate-400/[0.06] p-[4px_6px] text-[13px]"
                >
                  <span className="text-sm font-bold text-[#5f6d87]">{f.rank}</span>
                  <span className="h-9 w-9 rounded-md bg-gradient-to-br from-[#e7edf9] via-[#c9d6ee] to-[#b1bfdc] shadow-[inset_0_-6px_10px_rgba(51,70,101,0.08)]" />
                  <span className="flex-1 text-[15px] font-medium tracking-[-0.01em] text-[#1d2b43]">
                    {f.name}
                  </span>
                  <span className="min-w-[38px] text-right text-xs font-bold text-[#6c7588]">
                    {f.views}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-400/20 bg-[#f7f9fc] p-[18px_18px_14px]">
            <h2 className="m-0 mb-3 flex items-center gap-2 text-lg font-bold text-[#1e2b43]">
              <MapPin size={16} className="text-amber-500" />
              Campus Activity Overview
            </h2>

            <div className="relative mb-[18px] h-[180px] overflow-hidden rounded-[10px] border border-slate-400/[0.15] bg-gradient-to-b from-[#edf3fd] to-[#edf1fa]">
              <div className="pointer-events-none absolute inset-0 bg-[#144db3]/[0.04]" />
              {/* Replace with real map component (Leaflet / Google Maps) */}
              <div className="absolute z-[1] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/90 bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" style={{ top: "18%", left: "42%" }} />
              <div className="absolute z-[1] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/90 bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" style={{ top: "48%", left: "58%" }} />
              <div className="absolute z-[1] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/90 bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" style={{ top: "62%", left: "38%" }} />
              <div className="absolute z-[1] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/90 bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" style={{ top: "70%", left: "60%" }} />
            </div>

            <ul className="m-0 mb-5 flex list-none flex-col gap-2 p-0">
              {legend.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-xs text-slate-600">
                  <span
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1">{item.label}</span>
                  <span className="font-bold text-[#1f2c46]">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-400/20 pt-2.5 text-xs text-gray-500">
              <p className="m-0 mb-0.5 text-xs text-[#5f6c82]">Most Active Area</p>
              <strong className="text-sm font-bold text-[#1f2e46]">Central Campus</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}