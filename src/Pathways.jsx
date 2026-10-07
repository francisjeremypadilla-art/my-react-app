import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Route,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Search,
  ChevronDown,
  Plus,
  ChevronRight,
  MapPin,
  Footprints,
  Clock,
  Eye,
  Accessibility,
  Pencil,
  CheckCircle2,
  Map as MapIcon,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";
import fallbackImage from "./assets/hero.png";

// ---- Placeholder data (swap with real API data later) ----

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Buildings", icon: Building2 },
  { label: "Facilities", icon: Landmark },
  { label: "Pathways", icon: Route, active: true },
  { label: "Map", icon: MapIcon },
  { label: "Logs", icon: ClipboardList },
  { label: "System Information", icon: Settings },
];

const pathways = [
  {
    id: 1,
    name: "Law Library",
    route: "Law Library \u2192 entrance",
    image: fallbackImage,
    status: "Open",
    distance: "400m",
    duration: "3mins",
    from: "Main Walkway",
    to: "Entrance",
    accessible: true,
    ramp: true,
    braille: true,
    tactile: true,
    description:
      "The Main Walkway connects the Main Gate to the Administration Building. It is the primary pedestrian route used by students, faculty, and staff.",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "Apr 26, 2025 8:45 AM",
  },
  {
    id: 2,
    name: "Student Center",
    route: "Student Center \u2192 DIT building",
    image: fallbackImage,
    status: "Open",
    distance: "250m",
    duration: "2mins",
    from: "Student Center",
    to: "DIT Building",
    accessible: true,
    ramp: true,
    braille: false,
    tactile: false,
    description:
      "Connects the Student Center to the DIT Building through a covered walkway, commonly used between classes.",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "Apr 20, 2025 1:10 PM",
  },
  {
    id: 3,
    name: "CITE Building",
    route: "Field Lab \u2192 CITE building",
    image: fallbackImage,
    status: "Open",
    distance: "180m",
    duration: "2mins",
    from: "Field Lab",
    to: "CITE Building",
    accessible: false,
    ramp: false,
    braille: false,
    tactile: false,
    description:
      "A short path linking the Field Lab to the CITE Building, mostly used by science and IT students.",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "Apr 18, 2025 9:30 AM",
  },
  {
    id: 4,
    name: "gymnasium",
    route: "gymnasium \u2192 old building",
    image: fallbackImage,
    status: "Open",
    distance: "400m",
    duration: "4mins",
    from: "Gymnasium",
    to: "Old Building",
    accessible: true,
    ramp: true,
    braille: true,
    tactile: false,
    description:
      "Runs from the Gymnasium to the Old Building, used heavily during sports events and PE classes.",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "Apr 15, 2025 3:55 PM",
  },
  {
    id: 5,
    name: "Registrar building",
    route: "Registrar \u2192 gymnasium",
    image: fallbackImage,
    status: "Open",
    distance: "300m",
    duration: "3mins",
    from: "Registrar",
    to: "Gymnasium",
    accessible: true,
    ramp: true,
    braille: true,
    tactile: true,
    description:
      "Connects the Registrar building to the Gymnasium, frequently used during enrollment and events.",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "Apr 10, 2025 11:20 AM",
  },
];

const statusHistory = [
  { label: "Pathway Route", type: "route" },
  { label: "Status", value: "Open", type: "status" },
  { label: "Accessibility", value: "Wheelchair Accessible", type: "access" },
  { label: "Ramp Available", type: "plain" },
  { label: "Braille Signage", type: "plain" },
  { label: "Tactile Paths", type: "plain" },
];

// ---- Main component ----

export default function Pathways({ onNavigate, activePage = "pathways" }) {
  const [selectedId, setSelectedId] = useState(pathways[0].id);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("route");

  const selected = pathways.find((p) => p.id === selectedId) ?? pathways[0];

  const filtered = pathways.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
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
      <main className="flex flex-1 flex-col gap-4 p-[0px_28px_40px]">
        <header className="-mx-[28px] flex items-start rounded-none bg-white p-[16px_28px] shadow-sm">
          <div>
            <h1 className="m-0 mb-1 text-lg font-bold text-gray-900">Pathways</h1>
            <p className="m-0 text-xs text-gray-500">
              View existing pathways, edit route details, update accessibility information, and manage pathway status.
            </p>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center gap-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#eef1f6] px-3 py-2.5 text-gray-400">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search pathways (e.g., Main Walkway, Library Route...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[13px] text-gray-800 outline-none"
            />
          </div>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-green-600" />
            All Status
            <ChevronDown size={14} />
          </button>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800">
            <Accessibility size={14} />
            All Accessibility
            <ChevronDown size={14} />
          </button>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700">
            <Plus size={14} />
            Add Pathway
          </button>
        </div>

        <div className="grid grid-cols-[1fr_1.5fr] items-start gap-[18px] max-[1200px]:grid-cols-1">
          {/* Left: pathway list */}
          <div className="rounded-xl border border-gray-200 bg-white p-[16px_18px] shadow-sm">
            <h2 className="m-0 mb-0.5 text-sm font-bold text-gray-900">Existing Pathways</h2>
            <p className="m-0 mb-3 text-[11px] text-gray-500">Showing {filtered.length} pathways</p>

            <div className="flex max-h-[520px] flex-col gap-2.5 overflow-y-auto">
              {filtered.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`flex items-center gap-2.5 rounded-[10px] border bg-white p-2 text-left ${
                    p.id === selectedId
                      ? "border-blue-600 bg-white shadow-[0_0_0_1px_rgba(37,99,235,0.18)]"
                      : "border-gray-200"
                  }`}
                >
                  <span className="h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-center justify-between gap-1.5">
                      <strong className="text-[13px] text-gray-800">{p.name}</strong>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                        <span className="inline-block h-[7px] w-[7px] rounded-full bg-green-600" />
                        {p.status}
                      </span>
                    </span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-gray-500">
                      {p.route}
                    </span>
                    <span className="flex items-center gap-2.5 text-[10px] text-gray-400">
                      <span className="flex items-center gap-[3px]">
                        <Footprints size={11} />
                        {p.distance}
                      </span>
                      <span className="flex items-center gap-[3px]">
                        <Eye size={11} />
                        View
                      </span>
                      {p.accessible && (
                        <span className="flex items-center gap-[3px]">
                          <Accessibility size={11} />
                        </span>
                      )}
                    </span>
                  </span>
                  <ChevronRight size={16} className="flex-shrink-0 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: pathway detail */}
          <div className="rounded-xl bg-white p-[16px_18px] shadow-sm">
            <div className="mb-3.5 flex items-start gap-3">
              <img
                src={selected.image}
                alt={selected.name}
                className="h-14 w-[72px] flex-shrink-0 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="m-0 mb-1 text-[15px] font-bold text-gray-900">{selected.name}</h3>
                <p className="m-0 mb-1.5 flex items-center gap-[5px] text-[11px] text-gray-500">
                  <MapPin size={12} />
                  {selected.route}
                </p>
                <div className="flex gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Footprints size={12} />
                    {selected.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {selected.duration}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                  <span className="inline-block h-[7px] w-[7px] rounded-full bg-green-600" />
                  {selected.status}
                </span>
                <button type="button" className="flex items-center gap-1.5 rounded-[7px] bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
                  <Pencil size={13} />
                  Edit
                </button>
              </div>
            </div>

            <div className="mb-3.5 flex gap-[18px] border-b border-[#eef0f4]">
              <button
                type="button"
                onClick={() => setTab("route")}
                className={`whitespace-nowrap border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "route" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400"
                }`}
              >
                Route &amp; Map
              </button>
              <button
                type="button"
                onClick={() => setTab("details")}
                className={`whitespace-nowrap border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "details" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400"
                }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setTab("accessibility")}
                className={`whitespace-nowrap border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "accessibility" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400"
                }`}
              >
                Accessibility
              </button>
              <button
                type="button"
                onClick={() => setTab("history")}
                className={`whitespace-nowrap border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "history" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400"
                }`}
              >
                Status History
              </button>
            </div>

            {tab === "route" && (
              <div className="grid grid-cols-[1.4fr_1fr] gap-4 max-[1200px]:grid-cols-1">
                <div className="relative col-start-1 h-[190px] overflow-hidden rounded-[10px] bg-gray-100 max-[1200px]:col-start-1">
                  {/* Replace with real map / route rendering */}
                  <div
                    className="absolute flex -translate-x-1/2 -translate-y-full items-center gap-1 rounded-full bg-white px-1.5 py-0.5 pl-0.5 text-[10px] font-semibold text-green-600 shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                    style={{ top: "14%", left: "58%" }}
                  >
                    <MapPin size={16} />
                    <span>Entrance</span>
                  </div>
                  <div
                    className="absolute flex -translate-x-1/2 -translate-y-full items-center gap-1 rounded-full bg-white px-1.5 py-0.5 pl-0.5 text-[10px] font-semibold text-red-500 shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                    style={{ top: "68%", left: "36%" }}
                  >
                    <MapPin size={16} />
                    <span>Library</span>
                  </div>
                  <svg
                    className="absolute inset-0 h-full w-full [&_path]:fill-none [&_path]:stroke-gray-700 [&_path]:stroke-2 [&_path]:[stroke-dasharray:4_3]"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path d="M58 16 L58 45 L36 45 L36 66" />
                  </svg>
                </div>

                <div className="col-start-2 row-span-2 row-start-1 max-[1200px]:col-start-1 max-[1200px]:row-auto">
                  <div className="flex flex-col gap-2">
                    {statusHistory.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-[11px]">
                        {item.type === "status" ? (
                          <>
                            <span className="text-gray-500">{item.label}</span>
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                              <span className="inline-block h-[7px] w-[7px] rounded-full bg-green-600" />
                              {item.value}
                            </span>
                          </>
                        ) : item.type === "access" ? (
                          <>
                            <span className="text-gray-500">{item.label}</span>
                              <span className="flex items-center gap-1 font-semibold text-gray-800">
                              <Accessibility size={12} />
                              {item.value}
                            </span>
                          </>
                        ) : item.type === "route" ? (
                          <span className="text-xs font-bold text-gray-800">{item.label}</span>
                        ) : (
                          <span className="flex items-center gap-1 font-semibold text-gray-800">
                            <CheckCircle2 size={12} />
                            {item.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-start-1 rounded-[10px] bg-slate-50 p-[12px_14px] max-[1200px]:col-start-1">
                  <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Route Details</h4>
                  <dl className="m-0 flex flex-col gap-1">
                    <div className="flex justify-between text-[11px]">
                      <dt className="text-gray-500">Name:</dt>
                      <dd className="m-0 font-medium text-gray-800">{selected.from}</dd>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <dt className="text-gray-500">From:</dt>
                      <dd className="m-0 font-medium text-gray-800">{selected.from}</dd>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <dt className="text-gray-500">To:</dt>
                      <dd className="m-0 font-medium text-gray-800">{selected.to}</dd>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <dt className="text-gray-500">Distance:</dt>
                      <dd className="m-0 font-medium text-gray-800">{selected.distance}</dd>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <dt className="text-gray-500">Estimated Time:</dt>
                      <dd className="m-0 font-medium text-gray-800">{selected.duration}</dd>
                    </div>
                  </dl>
                </div>

                <div className="col-start-1 rounded-[10px] bg-slate-50 p-[12px_14px] max-[1200px]:col-start-1">
                  <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Description</h4>
                  <p className="m-0 text-xs leading-relaxed text-gray-600">{selected.description}</p>
                  <button type="button" className="mt-2 flex items-center gap-1.5 rounded-[7px] bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">
                    <Pencil size={12} />
                    Edit Description
                  </button>
                </div>

                <div className="col-start-1 rounded-[10px] bg-slate-50 p-[12px_14px] max-[1200px]:col-start-1">
                  <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Pathway Status</h4>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                    <span className="inline-block h-[7px] w-[7px] rounded-full bg-green-600" />
                    {selected.status}
                  </span>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
                    Last updated by {selected.lastUpdatedBy}
                    <br />
                    {selected.lastUpdatedAt}
                  </p>
                  <button type="button" className="mt-2 flex items-center gap-1.5 rounded-[7px] bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">
                    <Pencil size={12} />
                    Edit Status
                  </button>
                </div>
              </div>
            )}

            {tab === "details" && (
              <div>
                <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Route Details</h4>
                <dl className="m-0 mb-4 flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <dt className="text-gray-500">From:</dt>
                    <dd className="m-0 font-medium text-gray-800">{selected.from}</dd>
                  </div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-gray-500">To:</dt>
                    <dd className="m-0 font-medium text-gray-800">{selected.to}</dd>
                  </div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-gray-500">Distance:</dt>
                    <dd className="m-0 font-medium text-gray-800">{selected.distance}</dd>
                  </div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-gray-500">Estimated Time:</dt>
                    <dd className="m-0 font-medium text-gray-800">{selected.duration}</dd>
                  </div>
                </dl>
                <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Description</h4>
                <p className="m-0 rounded-lg bg-gray-50 p-[10px_12px] text-xs leading-relaxed text-gray-600">
                  {selected.description}
                </p>
              </div>
            )}

            {tab === "accessibility" && (
              <div>
                <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Accessibility Information</h4>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  <li className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Accessibility size={13} />
                      Wheelchair Accessible
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${selected.accessible ? "text-green-600" : "text-red-500"}`}>
                      <CheckCircle2 size={13} />
                      {selected.accessible ? "Yes" : "No"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Accessibility size={13} />
                      Ramp Available
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${selected.ramp ? "text-green-600" : "text-red-500"}`}>
                      <CheckCircle2 size={13} />
                      {selected.ramp ? "Yes" : "No"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Accessibility size={13} />
                      Braille Signage
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${selected.braille ? "text-green-600" : "text-red-500"}`}>
                      <CheckCircle2 size={13} />
                      {selected.braille ? "Yes" : "No"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Accessibility size={13} />
                      Tactile Paths
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${selected.tactile ? "text-green-600" : "text-red-500"}`}>
                      <CheckCircle2 size={13} />
                      {selected.tactile ? "Yes" : "No"}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {tab === "history" && (
              <div>
                <h4 className="m-0 mb-2 text-xs font-bold text-gray-800">Status History</h4>
                <p className="m-0 text-[11px] leading-relaxed text-gray-500">
                  Last updated by {selected.lastUpdatedBy} &middot; {selected.lastUpdatedAt}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}