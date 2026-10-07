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
  ChevronLeft,
  ChevronRight,
  Pencil,
  MapPin,
  Info,
  Map as MapIcon,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";
import fallbackImage from "./assets/hero.png";

// NOTE: each building below has a unique id/name so the table never renders
// duplicate rows (that was the bug causing "Administration building" x5,
// all showing "6" as the row number).

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Buildings", icon: Building2, active: true },
  { label: "Facilities", icon: Landmark },
  { label: "Pathways", icon: Route },
  { label: "Map", icon: MapIcon },
  { label: "Logs", icon: ClipboardList },
  { label: "System Information", icon: Settings },
];

const buildings = [
  { id: 1, name: "Main Library", location: "Central Campus", description: "The central library houses books, research materials, and study spaces.", image: fallbackImage, totalFacilities: 12, coordinates: "15.1234, 120.5678", createdAt: "Sep. 1, 2020", updatedAt: "Sep. 16, 2026" },
  { id: 2, name: "Student Center", location: "Central Campus", description: "A hub for student activities, services, and dining.", image: fallbackImage, totalFacilities: 8, coordinates: "15.1240, 120.5682", createdAt: "Sep. 1, 2020", updatedAt: "Aug. 30, 2026" },
  { id: 3, name: "Science Laboratory", location: "East Campus", description: "Laboratory for science and technology program.", image: fallbackImage, totalFacilities: 5, coordinates: "15.1258, 120.5701", createdAt: "Sep. 1, 2020", updatedAt: "Jul. 12, 2026" },
  { id: 4, name: "Canteen", location: "Central Campus", description: "Dining hall with various food options.", image: fallbackImage, totalFacilities: 3, coordinates: "15.1231, 120.5675", createdAt: "Sep. 1, 2020", updatedAt: "Jun. 4, 2026" },
  { id: 5, name: "Gymnasium", location: "South Campus", description: "Indoor sports facility for recreation and events.", image: fallbackImage, totalFacilities: 4, coordinates: "15.1209, 120.5690", createdAt: "Sep. 1, 2020", updatedAt: "May 20, 2026" },
  { id: 6, name: "Administration Building", location: "Central Campus", description: "Office spaces for university administration and faculty.", image: fallbackImage, totalFacilities: 6, coordinates: "15.1236, 120.5679", createdAt: "Sep. 1, 2020", updatedAt: "Apr. 18, 2026" },
  { id: 7, name: "Engineering Building", location: "East Campus", description: "Classrooms and workshops for engineering programs.", image: fallbackImage, totalFacilities: 9, coordinates: "15.1262, 120.5698", createdAt: "Sep. 1, 2020", updatedAt: "Mar. 22, 2026" },
  { id: 8, name: "College of Nursing", location: "North Campus", description: "Simulation labs and lecture rooms for nursing students.", image: fallbackImage, totalFacilities: 7, coordinates: "15.1271, 120.5665", createdAt: "Sep. 1, 2020", updatedAt: "Feb. 10, 2026" },
  { id: 9, name: "Auditorium", location: "Central Campus", description: "Main venue for university-wide events and ceremonies.", image: fallbackImage, totalFacilities: 2, coordinates: "15.1228, 120.5683", createdAt: "Sep. 1, 2020", updatedAt: "Jan. 5, 2026" },
  { id: 10, name: "Sports Complex", location: "South Campus", description: "Outdoor courts and fields for varsity training.", image: fallbackImage, totalFacilities: 5, coordinates: "15.1195, 120.5688", createdAt: "Sep. 1, 2020", updatedAt: "Dec. 15, 2025" },
];

const emptyEditForm = {
  id: null,
  name: "",
  location: "",
  description: "",
  image: fallbackImage,
};

export default function Buildings({ onNavigate, activePage = "buildings" }) {
  const [buildingList, setBuildingList] = useState(buildings);
  const [selectedId, setSelectedId] = useState(buildings[0].id);
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(emptyEditForm);

  const selected = buildingList.find((b) => b.id === selectedId) ?? buildingList[0];
  const filtered = buildingList.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const tableCellBase = "h-[72px] border-b border-gray-100 px-2.5 py-3 align-middle text-gray-700";
  const selectedCell = "border-y border-y-blue-600 bg-white";

  const openEditModal = (building) => {
    setEditForm({
      id: building.id,
      name: building.name,
      location: building.location,
      description: building.description,
      image: building.image,
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditForm(emptyEditForm);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setEditForm((current) => ({
        ...current,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    setBuildingList((current) =>
      current.map((building) =>
        building.id === editForm.id
          ? {
              ...building,
              name: editForm.name.trim() || building.name,
              location: editForm.location.trim() || building.location,
              description: editForm.description.trim() || building.description,
              image: editForm.image || building.image,
              updatedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            }
          : building
      )
    );
    setSelectedId(editForm.id);
    closeEditModal();
  };

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
              label.toLowerCase() === "dashboard" ? "dashboard" :
              label.toLowerCase() === "buildings" ? "buildings" :
              label.toLowerCase() === "facilities" ? "facilities" :
              label.toLowerCase() === "pathways" ? "pathways" :
              label.toLowerCase() === "logs" ? "logs" :
              label.toLowerCase() === "system information" ? "system" : "dashboard";

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
            <h1 className="m-0 mb-1 text-lg font-bold tracking-wide">Buildings</h1>
            <p className="m-0 text-xs text-gray-500">
              View and manage campus buildings, you can update building information.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-[1.7fr_1fr] items-start gap-5 max-[1024px]:grid-cols-1">
          {/* Left: search + table */}
          <div className="rounded-xl bg-white p-[18px_20px] shadow-sm">
            <div className="mb-4 flex gap-2.5">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#dbe0ea] px-3 py-2 text-gray-400">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search buildings (e.g., Main Library, science lab...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-none text-[13px] text-gray-800 outline-none"
                />
              </div>
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#dbe0ea] bg-white px-3.5 py-2 text-[13px] text-gray-600">
                All buildings
                <ChevronDown size={14} />
              </button>
            </div>

            <table className="w-full table-fixed border-separate border-spacing-0 text-[13px]">
              <colgroup>
                <col className="w-[6%]" />
                <col className="w-[31%]" />
                <col className="w-[20%]" />
                <col className="w-[33%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="border-b border-[#eef0f4] p-0 pb-2.5 px-2.5 text-left text-[11px] font-semibold text-gray-400">#</th>
                  <th className="border-b border-[#eef0f4] p-0 pb-2.5 px-2.5 text-left text-[11px] font-semibold text-gray-400">Building name</th>
                  <th className="border-b border-[#eef0f4] p-0 pb-2.5 px-2.5 text-left text-[11px] font-semibold text-gray-400">Location</th>
                  <th className="border-b border-[#eef0f4] p-0 pb-2.5 px-2.5 text-left text-[11px] font-semibold text-gray-400">Description</th>
                  <th className="border-b border-[#eef0f4] p-0 pb-2.5 px-2.5 text-left text-[11px] font-semibold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, index) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    className="h-[72px] cursor-pointer transition-colors hover:bg-slate-50"
                  >
                    <td className={`${tableCellBase} ${b.id === selectedId ? `${selectedCell} rounded-l-lg border-l border-l-blue-600` : ""}`}>{index + 1}</td>
                    <td className={`${tableCellBase} ${b.id === selectedId ? selectedCell : ""}`}>
                      <div className="flex items-center gap-2.5 font-medium">
                        <span className="h-[30px] w-[30px] flex-shrink-0 rounded-md bg-gray-200" />
                        <span className="line-clamp-2 overflow-hidden">{b.name}</span>
                      </div>
                    </td>
                    <td className={`${tableCellBase} ${b.id === selectedId ? selectedCell : ""}`}>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} />
                        <span className="line-clamp-2 overflow-hidden">{b.location}</span>
                      </span>
                    </td>
                    <td className={`max-w-[240px] ${tableCellBase} text-xs text-gray-500 ${b.id === selectedId ? selectedCell : ""}`}>
                      <span className="line-clamp-3 overflow-hidden">{b.description}</span>
                    </td>
                    <td className={`h-[72px] border-b border-gray-100 px-2.5 py-3 align-middle ${b.id === selectedId ? `${selectedCell} rounded-r-lg border-r border-r-blue-600` : ""}`}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditModal(b);
                        }}
                        className="flex items-center gap-1.5 border-none bg-transparent text-xs font-semibold text-blue-600"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3.5 flex items-center justify-between text-xs text-gray-500">
              <span>Showing 1 - {filtered.length} of {buildingList.length} buildings</span>
              <div className="flex items-center gap-2">
                <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500">
                  <ChevronLeft size={14} />
                </button>
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-600 font-semibold text-white">1</span>
                <button type="button" className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: building detail */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-xl border border-slate-400/20 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="absolute left-2.5 right-2.5 top-2.5 z-10 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">
                  Building
                </span>
                <button
                  type="button"
                  onClick={() => openEditModal(selected)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-700"
                >
                  <Pencil size={13} />
                  Edit
                </button>
              </div>
              <img src={selected.image} alt={selected.name} className="block h-[250px] w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#061222]/45 px-4 pb-4 pt-3.5 text-white">
                <h2 className="m-0 text-2xl font-extrabold tracking-tight">{selected.name}</h2>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] opacity-95">
                  <MapPin size={12} />
                  {selected.location}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-400/20 bg-white p-[18px_16px]">
              <h3 className="mb-3.5 flex items-center gap-2 text-xl text-[#1d2b43]">
                <Building2 size={15} />
                Building Information
              </h3>
              <dl className="m-0 flex flex-col gap-2.5">
                <div className="grid grid-cols-[120px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Name:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.name}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Location:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.location}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Description:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.description}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Image:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">
                    <img src={selected.image} alt={selected.name} className="h-[74px] w-full max-w-[150px] rounded-lg border border-slate-400/20 object-cover" />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-400/20 bg-white p-[14px_16px_18px]">
              <h3 className="mb-3.5 flex items-center gap-2 text-xl text-[#1d2b43]">
                <Info size={15} />
                Additional Details
              </h3>
              <dl className="m-0 flex flex-col gap-2.5">
                <div className="grid grid-cols-[140px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Total Facilities:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.totalFacilities}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Coordinates:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.coordinates}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Created at:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.createdAt}</dd>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2.5">
                  <dt className="pt-0.5 text-xs font-semibold text-gray-500">Last updated:</dt>
                  <dd className="m-0 text-sm leading-relaxed text-gray-800">{selected.updatedAt}</dd>
                </div>
              </dl>
            </div>

            <div className="flex items-center gap-2.5 rounded-[10px] border border-[#cfe1ff] bg-[#e8f3ff] p-[12px_14px] text-[#1e3a8a]">
              <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">i</span>
              <p className="m-0 text-xs leading-relaxed">
                Note: You can update the building name and details. You cannot
                remove or add a building this time.
              </p>
            </div>
          </div>
        </div>
      </main>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="m-0 text-lg font-bold text-gray-900">Edit Building</h2>
                <p className="m-0 mt-1 text-xs text-gray-500">
                  Update the building image, name, location, and description.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-5">
              <label className="grid gap-2 text-xs font-semibold text-gray-700">
                Image
                <div className="grid grid-cols-[150px_minmax(0,1fr)] items-center gap-4 max-[640px]:grid-cols-1">
                  <img
                    src={editForm.image}
                    alt={editForm.name || "Building preview"}
                    className="h-[96px] w-full rounded-lg border border-gray-200 object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-600 hover:border-blue-300"
                  />
                </div>
              </label>

              <label className="grid gap-2 text-xs font-semibold text-gray-700">
                Building name
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) => setEditForm((current) => ({ ...current, name: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold text-gray-700">
                Location
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(event) => setEditForm((current) => ({ ...current, location: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold text-gray-700">
                Description
                <textarea
                  value={editForm.description}
                  onChange={(event) => setEditForm((current) => ({ ...current, description: event.target.value }))}
                  className="min-h-[110px] resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-normal leading-relaxed text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 p-4">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
