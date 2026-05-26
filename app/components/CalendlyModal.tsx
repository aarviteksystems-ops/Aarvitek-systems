import { useState, useEffect } from "react";

export function CalendlyModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-calendly", handleOpen);
    window.addEventListener("close-calendly", handleClose);

    // Escape key listener to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-calendly", handleOpen);
      window.removeEventListener("close-calendly", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#0c051a]/90 backdrop-blur-2xl border border-purple-500/20 rounded-[2.5rem] shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col z-10 animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
        
        {/* Glow Spots */}
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02] z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <div>
              <h3 className="text-white font-extrabold text-lg">Book Free Consultation</h3>
              <p className="text-slate-400 text-xs mt-0.5">Select a convenient time slot for your discovery call</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Scheduler Container */}
        <div className="relative flex-1 w-full h-full bg-[#030105] z-10">
          {/* loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none z-0">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
          </div>

          <iframe
            src="https://calendly.com/d/c4s-3p8-x6h?background_color=030105&text_color=ffffff&primary_color=a855f7&hide_landing_page=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            className="relative z-10 w-full h-full border-none"
            title="Book a Consultation Meeting"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
