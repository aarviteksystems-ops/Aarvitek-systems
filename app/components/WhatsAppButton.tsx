import { useState, useEffect } from "react";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Elegant entrance delay to avoid cluttering visual onload
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "917870901336";
  const defaultMessage = encodeURIComponent(
    "Hello Aarvitek Systems! I would like to book a free consultation and learn more about your digital transformation services."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div
      className={`fixed bottom-24 right-6 md:right-8 z-40 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-12 scale-75 pointer-events-none"
        }`}
    >
      {/* Glow Ring Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-md animate-ping duration-1000"></span>
      <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#25D366] to-emerald-400 opacity-20 blur-sm animate-[pulse_2s_infinite]"></span>

      {/* Main Glassmorphic Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 hover:border-[#25D366]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95"
      >
        {/* Core Green Accent Overlay */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] opacity-10 group-hover:opacity-20 transition-opacity"></div>

        {/* WhatsApp Icon (Vibrant green by default, glows on hover) */}
        <svg
          className="w-7 h-7 text-[#25D366] group-hover:text-white transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.113.992 11.5.992c-5.448 0-9.88 4.373-9.884 9.802-.001 1.637.5 3.23 1.45 4.81l-1.027 3.75 3.864-1.008zm11.366-7.467c-.29-.145-1.716-.847-1.978-.942-.262-.096-.453-.145-.644.145-.191.29-.739.942-.906 1.134-.167.19-.334.213-.624.069-.29-.145-1.224-.451-2.33-1.439-.86-.767-1.44-1.716-1.608-2.008-.168-.29-.018-.447.127-.591.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.19.048-.362-.024-.508-.073-.145-.644-1.55-.882-2.122-.232-.559-.467-.483-.644-.492-.166-.008-.358-.01-.55-.01s-.502.072-.765.358c-.263.286-1.004.981-1.004 2.392 0 1.41 1.027 2.775 1.17 2.969.145.193 2.022 3.087 4.899 4.329.684.296 1.218.473 1.634.605.688.219 1.314.188 1.81.114.551-.082 1.716-.701 1.957-1.378.24-.677.24-1.258.17-1.378-.073-.12-.263-.193-.553-.339z" />
        </svg>

        {/* CSS Tooltip on Hover */}
        <span className="absolute right-16 scale-0 origin-right translate-x-2 opacity-0 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 whitespace-nowrap shadow-xl pointer-events-none">
          Chat with an Expert
        </span>
      </a>
    </div>
  );
}
