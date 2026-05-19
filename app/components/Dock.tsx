import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export function Dock() {
  const [showDock, setShowDock] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      if (window.scrollY > 300 && !isNearBottom) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNav = (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home and append hash
      navigate(`/#${id}`);
    }
  };

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showDock ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-90 pointer-events-none'}`}>
      <div className="flex items-end gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-[72px]">

        {/* Home Icon */}
        <Link to="/" className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-purple-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">Home</span>
        </Link>

        {/* About Us Icon */}
        <Link to="/about" className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-pink-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">About Us</span>
        </Link>

        {/* Services Stack (macOS style popup) */}
        <div className="group relative mx-1 flex flex-col justify-end">
          {/* The Stack Menu */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-4 flex flex-col gap-2 items-center opacity-0 translate-y-4 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50 origin-bottom">
            <Link to="/video-editing" className="w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all">Video Editing</Link>
            <Link to="/ecommerce" className="w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all">eCommerce</Link>
            <Link to="/graphic-design" className="w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all">Graphic Design</Link>
            <Link to="/website-design" className="w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all">Website Design</Link>
            <Link to="/web-development" className="w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all">Web Dev</Link>
          </div>

          {/* Main Services Icon */}
          <button onClick={() => handleNav('services')} className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:w-16 group-hover:h-16 group-hover:-translate-y-2 border border-white/5 group-hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
            <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-blue-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </button>
        </div>

        {/* Portfolio Icon */}
        <Link to="/portfolio" className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-amber-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">Portfolio</span>
        </Link>

        {/* Clients Icon */}
        <Link to="/clients" className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-yellow-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">Clients</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-2 self-center"></div>

        {/* Contact Icon */}
        <Link to="/contact" className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-indigo-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">Book a call</span>
        </Link>

        {/* Scroll to Top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-16 hover:h-16 hover:-translate-y-2 mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom">
          <svg className="w-6 h-6 group-hover:w-8 group-hover:h-8 text-slate-300 group-hover:text-emerald-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg">Top</span>
        </button>
      </div>
    </div>
  );
}
