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
  LayoutGrid,
  List,
  ArrowLeft,
  BookOpen,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Pencil,
  Accessibility,
  Map as MapIcon,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";
import fallbackImage from "./assets/hero.png";

// ---- Placeholder data (swap with real API data later) ----

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Buildings", icon: Building2 },
  { label: "Facilities", icon: Landmark, active: true },
  { label: "Pathways", icon: Route },
  { label: "Map", icon: MapIcon },
  { label: "Logs", icon: ClipboardList },
  { label: "System Information", icon: Settings },
];

const facilities = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Main library",
  location: "Central Campus",
  category: "Library",
  image: fallbackImage,
  wheelchairAccessible: true,
  building: "Academic building",
  openingHours: "7:00 am - 8:00 pm (Mon - Fri)\n8:00 am - 5:00 pm (Sat)",
  contactNumber: "+63 912345 6789",
  description:
    "The main library serves as the central hub for academic resources, research materials, and quiet study spaces. It houses a wide range of books, digital resources, and computers for students and faculty use.",
  accessibility: {
    wheelchairAccessible: true,
    ramps: true,
    accessibleRestroom: true,
  },
  lastEdit: "September 26, 2026 10:12 AM",
}));

// ---- Small building blocks ----

function FacilityCard({ facility, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(facility.id)}
      className={`flex flex-col overflow-hidden rounded-[10px] border bg-white p-0 text-left transition-colors ${
        active
          ? "border-blue-600 shadow-[0_0_0_1px_#2563eb]"
          : "border-[#eef0f4] hover:border-blue-300"
      }`}
    >
      <div className="h-[90px] bg-gray-200">
        <img src={facility.image} alt={facility.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 p-[10px_12px_12px]">
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-blue-600">
          <BookOpen size={16} />
          <span>{facility.name}</span>
        </div>
        <p className="m-0 flex items-center gap-1 text-[11px] text-gray-500">
          <MapPin size={12} />
          {facility.location}
        </p>
        <p className="m-0 flex items-center gap-1 text-[11px] text-gray-500">
          <Landmark size={12} />
          {facility.category}
        </p>
        {facility.wheelchairAccessible && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-[3px] text-[10px] font-semibold text-green-600">
            <Accessibility size={12} />
            Wheelchair Accessible
          </span>
        )}
      </div>
    </button>
  );
}

// ---- Main component ----

export default function Facilities({ onNavigate, activePage = "facilities" }) {
  const [selectedId, setSelectedId] = useState(facilities[0].id);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("details");
  const [viewMode, setViewMode] = useState("grid");

  const selected = facilities.find((f) => f.id === selectedId) ?? facilities[0];

  const filtered = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
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
      <main className="flex flex-1 flex-col gap-4 p-[0px_28px_40px]">
        <header className="-mx-[28px] flex items-start rounded-none bg-white p-4 px-7 shadow-sm">
          <div>
            <h1 className="m-0 mb-1 text-lg font-bold text-blue-600">Facilities</h1>
            <p className="m-0 text-xs text-blue-600/75">
              Search, view, and manage campus facilities. Update accessibility information as needed.
            </p>
          </div>
        </header>

        {/* Search toolbar */}
        <div className="flex items-center gap-2.5 rounded-xl bg-white p-[16px_18px] shadow-sm">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#dbe0ea] px-3 py-2.5 text-gray-400">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search buildings (e.g., Main Library, science lab...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none text-[13px] text-gray-800 outline-none"
            />
          </div>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-[13px] text-gray-600">
            All buildings
            <ChevronDown size={14} />
          </button>
          <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2.5 text-[13px] text-gray-600">
            All categories
            <ChevronDown size={14} />
          </button>
          <button type="button" className="rounded-lg bg-blue-600 px-6 py-2.5 text-[13px] font-semibold text-white">
            Search
          </button>
        </div>

        <div className="grid grid-cols-[1.9fr_1fr] items-start gap-[18px] max-[1200px]:grid-cols-1">
          {/* Left: grid list */}
          <div className="rounded-xl bg-white p-[16px_18px] shadow-sm">
            <div className="mb-3.5 flex items-start justify-between">
              <div>
                <h2 className="m-0 mb-0.5 text-[15px] font-bold text-blue-600">All Facilities</h2>
                <p className="m-0 text-xs text-gray-500">Showing {filtered.length} of 48 facilities</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                  Sort by: Name (A to Z)
                  <ChevronDown size={14} />
                </button>
                <div className="flex overflow-hidden rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex h-[30px] w-[30px] items-center justify-center border-none ${
                      viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-400"
                    }`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex h-[30px] w-[30px] items-center justify-center border-none ${
                      viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-400"
                    }`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-3.5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 ${
                viewMode === "list" ? "grid-cols-1" : "grid-cols-3"
              }`}
            >
              {filtered.map((f) => (
                <FacilityCard
                  key={f.id}
                  facility={f}
                  active={f.id === selectedId}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          </div>

          {/* Right: detail panel */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-[16px_18px] shadow-sm">
            <button type="button" className="flex w-fit items-center gap-1.5 border-none bg-transparent p-0 text-xs text-gray-500">
              <ArrowLeft size={14} />
              Back to facilities
            </button>

            <div className="h-[130px] overflow-hidden rounded-[10px] bg-gray-200">
              <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="m-0 mb-1 text-[15px] font-bold text-blue-600">{selected.name}</h3>
                <p className="m-0 flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={12} />
                  {selected.location}
                </p>
                <p className="m-0 flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Landmark size={12} />
                  {selected.category}
                </p>
              </div>
              <button type="button" className="flex flex-shrink-0 items-center gap-1.5 rounded-[7px] bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                <Pencil size={13} />
                Edit
              </button>
            </div>

            {selected.wheelchairAccessible && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-600">
                <Accessibility size={12} />
                Wheelchair Accessible
              </span>
            )}

            <div className="flex border-b border-[#eef0f4]">
              <button
                type="button"
                onClick={() => setTab("details")}
                className={`flex-1 border-none border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "details" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
                }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setTab("accessibility")}
                className={`flex-1 border-none border-b-2 bg-transparent py-2 text-xs font-semibold ${
                  tab === "accessibility" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"
                }`}
              >
                Accessibility
              </button>
            </div>

            {tab === "details" ? (
              <div className="flex flex-col [&>section+section]:mt-3.5">
                <section>
                  <h4 className="m-0 mb-1.5 text-xs font-bold text-gray-800">Description</h4>
                  <p className="m-0 rounded-lg bg-blue-50 p-[10px_12px] text-xs leading-relaxed text-gray-600">
                    {selected.description}
                  </p>
                </section>

                <section>
                  <h4 className="m-0 mb-1.5 text-xs font-bold text-gray-800">Facilities information</h4>
                  <dl className="m-0 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2.5">
                      <dt className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500">
                        <Building2 size={13} />
                        Building
                      </dt>
                      <dd className="m-0 text-right text-xs text-gray-800">{selected.building}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-2.5">
                      <dt className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500">
                        <Landmark size={13} />
                        Category
                      </dt>
                      <dd className="m-0 text-right text-xs text-gray-800">{selected.category}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-2.5">
                      <dt className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500">
                        <Clock size={13} />
                        Opening hours
                      </dt>
                      <dd className="m-0 whitespace-pre-line text-right text-xs text-gray-800">
                        {selected.openingHours}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-2.5">
                      <dt className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500">
                        <Phone size={13} />
                        Contact number
                      </dt>
                      <dd className="m-0 text-right text-xs text-gray-800">{selected.contactNumber}</dd>
                    </div>
                  </dl>
                </section>
              </div>
            ) : (
              <div className="flex flex-col [&>section+section]:mt-3.5">
                <section>
                  <h4 className="m-0 mb-1.5 text-xs font-bold text-gray-800">Accessibility information</h4>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    <li className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Accessibility size={13} />
                        Wheelchair Accessible
                      </span>
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          selected.accessibility.wheelchairAccessible ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        {selected.accessibility.wheelchairAccessible ? "Yes" : "No"}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Accessibility size={13} />
                        Ramps
                      </span>
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          selected.accessibility.ramps ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        {selected.accessibility.ramps ? "Yes" : "No"}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Accessibility size={13} />
                        Accessible Restroom
                      </span>
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          selected.accessibility.accessibleRestroom ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        {selected.accessibility.accessibleRestroom ? "Yes" : "No"}
                      </span>
                    </li>
                  </ul>
                </section>
              </div>
            )}

            <div className="flex items-center justify-between rounded-[10px] border border-blue-200 bg-blue-50 p-[10px_12px]">
              <div>
                <strong className="block text-xs text-gray-800">Last Edit</strong>
                <span className="text-[11px] text-gray-500">{selected.lastEdit}</span>
              </div>
              <button type="button" className="flex items-center gap-1.5 rounded-[7px] bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                <Pencil size={13} />
                Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}