import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Settings,
} from 'lucide-react';
import logo from './assets/rasma-removebg-preview.png';
import loginBrandBg from './assets/loginucu.png';
import loginFormBg from './assets/login.png';
import Dashboard from './Dashboard.jsx';
import Buildings from './Buildings.jsx';
import Facilities from './Facilities.jsx';
import Logs from './Logs.jsx';
import Pathways from './Pathways.jsx';
import SystemInfo from './System_information.jsx';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  if (isAuthenticated) {
    if (currentPage === 'buildings') {
      return <Buildings onNavigate={setCurrentPage} activePage="buildings" />;
    }

    if (currentPage === 'facilities') {
      return <Facilities onNavigate={setCurrentPage} activePage="facilities" />;
    }

    if (currentPage === 'pathways') {
      return <Pathways onNavigate={setCurrentPage} activePage="pathways" />;
    }

    if (currentPage === 'logs') {
      return <Logs onNavigate={setCurrentPage} activePage="logs" />;
    }

    if (currentPage === 'system') {
      return <SystemInfo onNavigate={setCurrentPage} activePage="system" />;
    }

    return <Dashboard username={username.trim() || 'admin'} onNavigate={setCurrentPage} activePage="dashboard" />;
  }

  return (
    <div className="grid min-h-screen w-full place-items-center overflow-x-hidden bg-[#e8edf4] font-sans text-[#1f2d4d]">
      <div className="grid min-h-screen w-full grid-cols-[1.08fr_0.92fr] overflow-hidden bg-slate-50 max-[820px]:grid-cols-1">
        <aside
          className="flex flex-col justify-between bg-[linear-gradient(145deg,#16224f_0%,#263f88_58%,#3974b8_100%)] p-[34px_42px_28px] text-white max-[820px]:min-h-[410px] max-[820px]:p-[24px_28px] max-[520px]:min-h-[380px] max-[520px]:p-[18px_20px]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(22,34,79,0.82), rgba(38,63,136,0.74)), url(${loginBrandBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex items-center gap-2.5">
            <img
              className="h-[76px] w-[76px] object-contain max-[520px]:h-[58px] max-[520px]:w-[58px]"
              src={logo}
              alt="UCUNav logo"
            />
            <span className="text-[38px] font-black tracking-[1px] max-[520px]:text-[30px]">
              UCU<span className="text-[#f3bd2b]">NAV</span>
            </span>
          </div>

          <div className="my-9 max-w-[520px] max-[520px]:my-6">
            <p className="m-0 mb-2.5 text-[19px] text-white/80">Welcome to</p>
            <h1 className="m-0 text-[clamp(54px,7vw,82px)] font-black leading-[0.98] text-[#f2f8ff]">
              UCU<span className="text-[#f7d450]">Nav</span>
            </h1>
            <h2 className="mb-3 mt-[22px] text-[clamp(22px,3vw,32px)] leading-[1.15] text-white/95">Campus Navigation System</h2>
            <p className="m-0 max-w-[480px] text-[17px] leading-[1.65] text-white/80 max-[520px]:text-[15px]">
              Manage campus facilities, maps, and system settings from your
              admin dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 border-t border-white/40">
            <div className="flex min-h-[82px] flex-col items-center justify-center gap-2.5 text-center text-[#f7d450] max-[520px]:min-h-[68px] max-[520px]:gap-1.5">
              <MapPin size={20} />
              <span className="text-[11px] font-extrabold uppercase text-white/90 max-[520px]:text-[9px]">Manage Location</span>
            </div>

            <div className="flex min-h-[82px] flex-col items-center justify-center gap-2.5 border-x border-white/40 text-center text-[#f7d450] max-[520px]:min-h-[68px] max-[520px]:gap-1.5">
              <Building2 size={20} />
              <span className="text-[11px] font-extrabold uppercase text-white/90 max-[520px]:text-[9px]">Update Facilities</span>
            </div>

            <div className="flex min-h-[82px] flex-col items-center justify-center gap-2.5 text-center text-[#f7d450] max-[520px]:min-h-[68px] max-[520px]:gap-1.5">
              <Settings size={20} />
              <span className="text-[11px] font-extrabold uppercase text-white/90 max-[520px]:text-[9px]">System Settings</span>
            </div>
          </div>
        </aside>

        <section
          className="flex flex-col items-center justify-between bg-[linear-gradient(180deg,#f8fafc,#e8eef6)] p-[56px_42px_28px] max-[820px]:min-h-[570px] max-[820px]:p-[40px_24px_24px] max-[520px]:min-h-[540px] max-[520px]:p-[32px_20px_24px]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(248,250,252,0.88), rgba(232,238,246,0.9)), url(${loginFormBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="my-auto w-full max-w-[430px] text-center">
            <div className="mb-[30px] flex items-center justify-center gap-2.5">
              <img
                className="h-[78px] w-[78px] object-contain max-[520px]:h-[62px] max-[520px]:w-[62px]"
                src={logo}
                alt="UCU Nav logo"
              />
              <span className="text-[42px] font-black tracking-[1px] text-[#1d2e75] max-[520px]:text-[34px]">
                UCU<span className="text-[#f3bd2b]">NAV</span>
              </span>
            </div>

            <h2 className="m-0 mb-2 text-[38px] font-bold text-[#1f2d4d] max-[520px]:text-[32px]">Admin Login</h2>
            <p className="m-0 mb-7 text-slate-500">Sign in to access the main dashboard</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="relative flex min-h-14 items-center rounded-full border border-[#697b92]/30 bg-white/90 focus-within:border-[#3974e8] focus-within:shadow-[0_0_0_3px_rgba(57,116,232,0.14)]">
                <span className="absolute left-[19px] flex text-[#697b92]">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Enter User Admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full min-w-0 rounded-full border-0 bg-transparent px-[54px] py-[15px] font-[inherit] text-[#1f2d4d] outline-0"
                />
              </label>

              <label className="relative flex min-h-14 items-center rounded-full border border-[#697b92]/30 bg-white/90 focus-within:border-[#3974e8] focus-within:shadow-[0_0_0_3px_rgba(57,116,232,0.14)]">
                <span className="absolute left-[19px] flex text-[#697b92]">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-w-0 rounded-full border-0 bg-transparent px-[54px] py-[15px] font-[inherit] text-[#1f2d4d] outline-0 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
                />
                <button
                  type="button"
                  className="absolute right-[17px] flex border-0 bg-transparent p-[5px] text-[#697b92]"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              <button type="submit" className="mt-1 min-h-14 rounded-full border-0 bg-[linear-gradient(180deg,#3c7af5,#2a57cf)] text-[17px] font-bold text-white shadow-[0_10px_22px_rgba(35,89,204,0.22)] transition hover:-translate-y-px hover:shadow-[0_14px_24px_rgba(35,89,204,0.28)]">
                Log in
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center gap-[9px] text-center text-[13px] font-bold text-[#485a73]">
            <div className="grid h-8 w-8 place-items-center rounded-[9px] border border-slate-300 bg-white text-[#2d4fa4]">
              <Building2 size={18} />
            </div>
            <span>UCU Campus Navigation System</span>
          </div>
        </section>
      </div>
    </div>
  );
}
