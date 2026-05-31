import { useState, useEffect, useRef } from "react";

export function FloatingEnquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-enquiry", handleOpen);
    window.addEventListener("close-enquiry", handleClose);

    // Escape listener to close drawer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    // Click outside listener
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".enquiry-trigger")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("open-enquiry", handleOpen);
      window.removeEventListener("close-enquiry", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone/WhatsApp is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Web3Forms access key — get yours free at https://web3forms.com (linked to aarviteksystems@gmail.com)
  const WEB3FORMS_ACCESS_KEY = "2bf3198d-6793-47b6-bffa-cb44d5716c25";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Floating Enquiry Form] New Enquiry from ${formData.name} — ${formData.service}`,
          from_name: "Aarvitek Systems - Floating Enquiry Form",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          botcheck: "", // honeypot spam protection
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Web Development",
          message: "",
        });
        // Auto-close after 4 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsOpen(false);
        }, 4000);
      } else {
        setIsSubmitting(false);
        setErrors({ message: "Submission failed. Please try again or contact us via WhatsApp." });
      }
    } catch {
      setIsSubmitting(false);
      setErrors({ message: "Network error. Please check your connection and try again." });
    }
  };

  return (
    <>
      {/* 1. Desktop Vertical Sticky Tab */}
      <button
        onClick={() => setIsOpen(true)}
        className="enquiry-trigger hidden md:flex fixed right-0 top-[40%] -translate-y-1/2 z-40 items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase py-4 px-3 rounded-l-2xl border-l border-y border-white/20 shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-x-1 cursor-pointer [writing-mode:vertical-lr] rotate-0"
        style={{ textOrientation: "mixed" }}
      >
        <span className="mb-2 text-base select-none">📩</span> Enquire Now
      </button>

      {/* 2. Mobile Floating Circular Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="enquiry-trigger md:hidden fixed bottom-44 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(168,85,247,0.4)] border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Open Inquiry Form"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
      </button>

      {/* 3. Backdrop Overlay for Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[900] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 4. Sliding Glassmorphic Side Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-screen w-full sm:w-[460px] bg-[#090312]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[950] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
      >
        {/* Glow Spots in Drawer */}
        <div className="absolute top-[-10%] right-[-10%] w-[250px] h-[250px] bg-purple-600/10 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none"></div>

        {/* Drawer Header */}
        <div className="relative flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02] z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <div>
              <h3 className="text-white font-extrabold text-lg">Send an Enquiry</h3>
              <p className="text-slate-400 text-xs mt-0.5">We respond in less than 2 hours</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Drawer Body Scroll Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 relative z-10">
          {submitSuccess ? (
            /* High-fidelity Success Animation Screen */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="relative w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-[scaleUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
                <svg className="w-12 h-12 text-white animate-[drawCheck_0.5s_ease-in-out_0.2s_both]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl">Enquiry Received!</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Thank you for reaching out to Aarvitek Systems. Our digital consultants have been notified and will contact you within the next **2 hours**.
              </p>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 animate-[loadingBar_4s_linear_both]"></div>
              </div>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"
                    }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"
                    }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 99999 99999"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"
                    }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider">Service Needed</label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#110924] border border-white/10 text-white focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="eCommerce Platforms">eCommerce Platforms</option>
                    <option value="Website UI/UX Design">Website UI/UX Design</option>
                    <option value="Graphic Design & Branding">Graphic Design & Branding</option>
                    <option value="Video Editing & Motion UX">Video Editing & Motion UX</option>
                    <option value="AI Automation Integrations">AI Automation Integrations</option>
                    <option value="Other / Full Suite">Other / Full Suite</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider">Project Scope / Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Briefly describe your objectives, timelines, and budget constraints..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"
                    }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    Sending Enquiry...
                  </>
                ) : (
                  "Submit Proposal Request"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
