import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Route,
  Map as MapIcon,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Search,
  ChevronDown,
  Calendar,
  Users,
  Activity,
  GraduationCap,
  ArrowUp,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";

// ---- Placeholder data (swap with real API data later) ----

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Buildings", icon: Building2 },
  { label: "Facilities", icon: Landmark },
  { label: "Pathways", icon: Route },
  { label: "Map", icon: MapIcon },
  { label: "Logs", icon: ClipboardList, active: true },
  { label: "System Information", icon: Settings },
];

const statCards = [
  { key: "total", label: "Total Logs", value: "1,248", delta: "+8% From Last Week", icon: ClipboardList, tone: "blue" },
  { key: "unique", label: "Unique Users", value: "36", delta: "+8% From Last Week", icon: User, tone: "blue" },
  { key: "common", label: "Most Common Action", value: "Map Viewed", delta: "+42% of Total Logs", icon: Activity, tone: "plain" },
  { key: "activeRole", label: "Most Active Role", value: "Student", delta: "58% of Total Logs", icon: GraduationCap, tone: "plain" },
];

// tone -> tailwind classes for the icon chip
const toneIconClasses = {
  blue: "bg-[#dbeafe] text-blue-600",
  plain: "bg-[#f3f4f6] text-gray-600",
};

const roleStyles = {
  Student: "bg-red-100 text-red-500",
  Faculty: "bg-indigo-100 text-indigo-600",
  Staff: "bg-green-600 text-white",
};

const logs = [
  { id: 1, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Student", action: "Map Viewed", mapViewed: "main campus", facilitiesViewed: "\u2014", destinationSearch: "\u2014" },
  { id: 2, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Faculty", action: "Destination Search", mapViewed: "Orata Building", facilitiesViewed: "Library", destinationSearch: "\u2014" },
  { id: 3, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Staff", action: "Map Viewed", mapViewed: "main campus", facilitiesViewed: "\u2014", destinationSearch: "\u2014" },
  { id: 4, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Faculty", action: "Pathway Viewed", mapViewed: "Tech Building", facilitiesViewed: "\u2014", destinationSearch: "Tech Building" },
  { id: 5, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Faculty", action: "Map Viewed", mapViewed: "Tech Building", facilitiesViewed: "\u2014", destinationSearch: "\u2014" },
  { id: 6, date: "Apr 26, 2026", time: "10:24 AM", user: "ryan@gmail.com", accountId: "#10023", role: "Faculty", action: "Map Viewed", mapViewed: "Tech Building", facilitiesViewed: "\u2014", destinationSearch: "\u2014" },
];

// ---- Small building blocks ----

function StatCard({ label, value, delta, icon: Icon, tone }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-[14px_16px]">
      <div className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] ${toneIconClasses[tone]}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="m-0 mb-1 text-xs font-semibold text-gray-800">{label}</p>
        <p className="m-0 mb-1 text-lg font-bold text-gray-800">{value}</p>
        <p className="m-0 flex items-center gap-[3px] text-[11px] text-green-600">
          <ArrowUp size={11} />
          {delta}
        </p>
      </div>
    </div>
  );
}

// ---- Main component ----

export default function Logs({ onNavigate, activePage = "logs" }) {
  const [search, setSearch] = useState("");

  const filtered = logs.filter((log) =>
    `${log.user} ${log.action} ${log.mapViewed}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = label.toLowerCase() === activePage.toLowerCase();
            const target =
              label.toLowerCase() === "dashboard"
                ? "dashboard"
                : label.toLowerCase() === "buildings"
                ? "buildings"
                : label.toLowerCase() === "facilities"
                ? "facilities"
                : label.toLowerCase() === "pathways"
                ? "pathways"
                : label.toLowerCase() === "logs"
                ? "logs"
                : label.toLowerCase() === "system information"
                ? "system"
                : "dashboard";

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
      <main className="flex flex-1 flex-col gap-[18px] p-[0px_28px_40px]">
        <header className="-mx-[28px] flex items-start rounded-none bg-white p-4 px-7 shadow-sm">
          <div>
            <h1 className="m-0 mb-1 text-lg font-bold">Logs</h1>
            <p className="m-0 text-xs text-gray-500">View system activity and user actions</p>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 rounded-xl bg-white p-[14px_16px] shadow-sm">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-[#dbe0ea] px-3 py-2.5 text-gray-400">
            <Search size={16} />
            <input
              type="text"
              placeholder="search logs (user, action, destination, etc...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none text-[13px] text-gray-800 outline-none"
            />
          </div>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-xs text-gray-600">
            All Roles
            <ChevronDown size={14} />
          </button>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-xs text-gray-600">
            All Action
            <ChevronDown size={14} />
          </button>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-xs text-blue-600">
            <Calendar size={14} />
            September 16, 2026 - September 17, 2026
            <ChevronDown size={14} />
          </button>
          <button type="button" className="rounded-lg bg-blue-600 px-[22px] py-2.5 text-[13px] font-semibold text-white">
            Search
          </button>
        </div>

        {/* Stat cards */}
        <section className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          {statCards.map((card) => (
            <StatCard key={card.key} {...card} />
          ))}
        </section>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl bg-white p-0 shadow-sm">
          <table className="w-full min-w-[760px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Date &amp; Time</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">User/Account</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Role</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Action Performed</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Map Viewed</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Facilities Viewed</th>
                <th className="whitespace-nowrap border-b border-[#eef0f4] p-[14px_16px] text-left text-[10.5px] font-bold tracking-[0.03em] text-gray-400">Destination Search</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-slate-50">
                  <td className="p-[12px_16px] align-middle text-gray-700">
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-xs font-semibold text-blue-600">{log.date}</strong>
                      <span className="text-[11px] text-gray-400">{log.time}</span>
                    </div>
                  </td>
                  <td className="p-[12px_16px] align-middle text-gray-700">
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-xs font-semibold text-blue-600">{log.user}</strong>
                      <span className="text-[11px] text-gray-400">{log.accountId}</span>
                    </div>
                  </td>
                  <td className="p-[12px_16px] align-middle text-gray-700">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.02em] ${
                        roleStyles[log.role] ?? ""
                      }`}
                    >
                      {log.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-[12px_16px] align-middle text-gray-700">{log.action}</td>
                  <td className="p-[12px_16px] align-middle text-gray-700">{log.mapViewed}</td>
                  <td className="p-[12px_16px] align-middle text-gray-700">{log.facilitiesViewed}</td>
                  <td className="p-[12px_16px] align-middle text-gray-700">{log.destinationSearch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}