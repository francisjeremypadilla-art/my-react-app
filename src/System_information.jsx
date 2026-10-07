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
  Info,
  Target,
  MapPin,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  HelpCircle,
  Map as MapIcon,
} from "lucide-react";
import logo from "./assets/rasma-removebg-preview.png";
import fallbackImage from "./assets/hero.png";

// ---- Placeholder data (swap with real API data later) ----

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, target: "dashboard" },
  { label: "Buildings", icon: Building2, target: "buildings" },
  { label: "Facilities", icon: Landmark, target: "facilities" },
  { label: "Pathways", icon: Route, target: "pathways" },
  { label: "Map", icon: MapIcon, target: "dashboard" },
  { label: "Logs", icon: ClipboardList, target: "logs" },
  { label: "System Information", icon: Settings, target: "system", active: true },
];

const purposeList = [
  "Provide an easy-to-use campus map and navigation experience",
  "Help users find buildings, facilities, and key locations",
  "Improve accessibility and mobility across campus",
  "Support a more inclusive and connected university community",
];

const coverageLegend = [
  { label: "Buildings", value: 12, icon: Building2 },
  { label: "Facilities", value: 48, icon: Landmark },
  { label: "Pathways", value: 36, icon: Route },
];

const additionalInfo = [
  { label: "UCUNav Version", value: "1.0.0" },
  { label: "Build Date", value: "Apr 26, 2025" },
  { label: "Platform", value: "Web Application" },
  { label: "Database", value: "PostgreSQL" },
  { label: "Developed By", value: "UCUNav Development Team" },
  { label: "License", value: "Proprietary (University Use Only)" },
];

// ---- Main component ----

export default function SystemInfo({ onNavigate, activePage = "system" }) {
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
            const isActive = target === activePage;

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
        <header className="-mx-[28px] rounded-none bg-white p-[16px_28px] shadow-sm">
          <h1 className="m-0 mb-1 text-lg font-bold tracking-wide">System Information</h1>
          <p className="m-0 text-xs text-gray-500">
            About UCUNav, Its purpose, converge, and support details.
          </p>
        </header>

        {/* Top row: overview / purpose / coverage */}
        <section className="grid grid-cols-3 gap-4 max-[1200px]:grid-cols-1">
          {/* UCUNav Overview */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-[18px_20px] shadow-sm">
            <h2 className="m-0 flex items-center gap-2 text-[15px] font-bold text-gray-800">
              <Info size={16} />
              UCUNav Overview
            </h2>
            <div className="flex items-center gap-2">
              <img src={logo} alt="UCUNav" className="h-8 w-8 object-contain" />
              <div>
                <p className="m-0 text-sm font-semibold text-gray-800">UCUNav</p>
                <p className="m-0 text-[11px] text-gray-500">Version 1.0.0</p>
              </div>
              <span className="ml-auto rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-600">
                latest
              </span>
            </div>
            <p className="m-0 text-xs leading-relaxed text-gray-600">
              UCUNav is a campus navigation system designed to help students,
              faculty, staff, and visitors easily find locations, explore
              campus facilities, and get the information they need across the
              university.
            </p>
            <div className="mt-auto flex items-start gap-2 rounded-lg bg-gray-50 p-2.5 text-[11px] text-gray-500">
              <Info size={13} className="mt-0.5 flex-shrink-0" />
              <span>
                Built for a safer, more accessible, and more connected campus
                experience.
              </span>
            </div>
          </div>

          {/* System Purpose */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-[18px_20px] shadow-sm">
            <h2 className="m-0 flex items-center gap-2 text-[15px] font-bold text-gray-800">
              <Target size={16} />
              System Purpose
            </h2>
            <p className="m-0 text-xs text-gray-500">
              The UCUNav system aims to:
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {purposeList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-gray-600">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Coverage */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-[18px_20px] shadow-sm">
            <h2 className="m-0 flex items-center gap-2 text-[15px] font-bold text-gray-800">
              <MapPin size={16} />
              Campus Coverage
            </h2>
            <p className="m-0 text-xs text-gray-500">
              Currently covers the following areas:
            </p>

            <div className="relative h-[110px] overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              <svg viewBox="0 0 200 110" className="h-full w-full">
                <rect x="18" y="18" width="60" height="34" rx="3" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />
                <rect x="90" y="14" width="46" height="60" rx="3" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
                <rect x="146" y="30" width="38" height="46" rx="3" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" />
                <rect x="24" y="66" width="46" height="28" rx="3" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
                <path d="M10 60 H190" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M100 10 V100" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>

            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {coverageLegend.map(({ label, value, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-gray-600">
                  <Icon size={13} className="text-gray-400" />
                  <span className="flex-1 font-medium">{label}</span>
                  <span className="font-bold text-gray-800">{value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-start gap-2 rounded-lg bg-gray-50 p-2.5 text-[11px] text-gray-500">
              <Info size={13} className="mt-0.5 flex-shrink-0" />
              <span>More areas may be added in future updates.</span>
            </div>
          </div>
        </section>

        {/* Bottom row: contact / additional info */}
        <section className="grid grid-cols-[1fr_1.1fr] gap-4 max-[1024px]:grid-cols-1">
          {/* Need help / contact */}
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="relative h-[150px]">
              <img src={fallbackImage} alt="Support" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3.5 text-white">
                <p className="m-0 flex items-center gap-1.5 text-sm font-bold">
                  <HelpCircle size={15} />
                  Need Help?
                </p>
                <p className="m-0 text-xs opacity-90">
                  Our support team is here to assist you.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 p-[18px_20px]">
              <h3 className="m-0 text-[15px] font-bold text-gray-800">Contact Information</h3>
              <p className="m-0 flex items-center gap-2 text-xs text-gray-600">
                <Mail size={13} className="text-gray-400" />
                jude.dela@ucu.edu.ph
              </p>
              <p className="m-0 flex items-center gap-2 text-xs text-gray-600">
                <Phone size={13} className="text-gray-400" />
                (032) 123-4567
              </p>
              <p className="m-0 flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={13} className="text-gray-400" />
                IT Office, Main Campus
              </p>
              <p className="m-0 flex items-center gap-2 text-xs text-gray-600">
                <Clock size={13} className="text-gray-400" />
                Mon - Fri, 8:00 AM - 5:00 PM (excluding holidays)
              </p>

              <div className="mt-2 rounded-lg bg-gray-50 p-2.5 text-[11px] leading-relaxed text-gray-500">
                For technical issues or system errors, please include your
                account details and a brief description of the problem.
              </div>
            </div>
          </div>

          {/* Additional information */}
          <div className="flex flex-col gap-3 rounded-xl bg-white p-[18px_20px] shadow-sm">
            <h2 className="m-0 flex items-center gap-2 text-[15px] font-bold text-gray-800">
              <ClipboardList size={16} />
              Additional Information
            </h2>

            <dl className="m-0 flex flex-col divide-y divide-gray-100">
              {additionalInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 text-xs">
                  <dt className="font-semibold text-gray-500">{item.label}</dt>
                  <dd className="m-0 text-gray-800">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-1 flex items-start gap-2 rounded-lg bg-gray-50 p-2.5 text-[11px] text-gray-600">
              <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
              <div>
                <p className="m-0 font-semibold text-gray-700">Data Privacy &amp; Security</p>
                <p className="m-0 mt-0.5 leading-relaxed">
                  UCUNav follows university data privacy policies. User data
                  is protected and used only for system operation and
                  improvement purposes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}