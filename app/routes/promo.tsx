import type { Route } from "./+types/promo";
import { Link } from "react-router";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Bespoke Web Development & High-Converting Websites - Aarvitek Systems" },
        { name: "description", content: "Get a high-performance, custom website built by certified experts. Maximize your business conversions, speed, and design. Get a free proposal in 24 hours." },
        { name: "robots", content: "noindex, nofollow" } // Keeps search engines from indexing promo pages as main site content
    ];
}

export default function PromoLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formSectionRef = useRef<HTMLDivElement>(null);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("web-dev");
    const [details, setDetails] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submittedName, setSubmittedName] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");

    // Calculator State
    const [calcType, setCalcType] = useState<"standard" | "ecommerce" | "custom">("standard");
    const [pageCount, setPageCount] = useState<number>(5);
    const [features, setFeatures] = useState<string[]>(["seo", "responsive", "cms", "pixel"]);

    // Calculate Estimated Price
    const calculatePrice = () => {
        let base = 0;
        if (calcType === "standard") base = 0;
        else if (calcType === "ecommerce") base = 0;
        else base = 0;

        let pageCost = pageCount * 999;
        let featureCost = features.length * 2500;

        return base + pageCost + featureCost;
    };

    const toggleFeature = (feat: string) => {
        if (features.includes(feat)) {
            setFeatures(features.filter((f) => f !== feat));
        } else {
            setFeatures([...features, feat]);
        }
    };

    // Scroll to form helper
    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getServiceLabel = (val: string) => {
        switch (val) {
            case "web-dev": return "Bespoke Website Development";
            case "ecommerce": return "Shopify / E-Commerce Store";
            case "custom-app": return "Custom Web Application";
            case "ui-ux": return "UI/UX Redesign & Graphic Pack";
            default: return val;
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[0-9\s-]{8,15}$/.test(phone.trim())) {
            newErrors.phone = "Please enter a valid phone number";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const WEB3FORMS_ACCESS_KEY = "2bf3198d-6793-47b6-bffa-cb44d5716c25";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `[Promo Proposal Form] New Proposal Claimed by ${name}`,
                    from_name: "Aarvitek Systems - Promo Proposal Form",
                    name: name,
                    email: email,
                    phone: phone,
                    service: getServiceLabel(service),
                    details: details || "No additional details provided",
                    calculator_class: calcType,
                    calculator_pages: pageCount,
                    calculator_addons: features.join(", "),
                    calculator_estimated_price: `₹${calculatePrice().toLocaleString("en-IN")}`,
                    botcheck: "",
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmittedName(name);
                setSubmittedEmail(email);
                setIsSubmitted(true);
                // Clear form fields
                setName("");
                setEmail("");
                setPhone("");
                setDetails("");
            } else {
                setErrors({ submit: "Submission failed. Please try again." });
            }
        } catch {
            setErrors({ submit: "Network error. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    useGSAP(() => {
        gsap.from(".promo-animate", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] text-slate-300 font-sans antialiased relative">
            {/* Ambient Background Lights */}
            <div className="absolute top-[-5%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[5%] left-[10%] w-[450px] h-[450px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff02_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

            {/* SIMPLIFIED HEADER (CRO optimized - no menu leak paths) */}
            <header className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <span className="text-xl font-black text-white tracking-wider flex items-center">
                            AARVITEK
                            <span className="h-2 w-2 rounded-full bg-purple-500 ml-1.5 animate-pulse"></span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <a href="tel:+917870901336" className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>+91 787 090 1336</span>
                        </a>
                        <button
                            onClick={scrollToForm}
                            className="px-5 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        >
                            Claim Free Proposal
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Hero Text Info */}
                        <div className="lg:col-span-7 space-y-8 promo-animate">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
                                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">🔥 Limited Time Offer</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                                We Build Websites That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Convert Visitors</span> Into Buyers
                            </h1>
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                                Forget slow page speeds and generic WordPress templates. We engineer bespoke, lightning-fast React, Shopify, and Node web applications built to capture attention, build trust, and maximize your sales revenue.
                            </p>

                            {/* Key Highlights */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    "Custom UI/UX (Zero generic templates)",
                                    "90+ Google PageSpeed Score guaranteed",
                                    "SEO & Conversion Rate Optimized",
                                    "Integrated Analytics & Meta Pixels Setup"
                                ].map((tick, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-xs font-semibold text-slate-200">{tick}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Trust badges */}
                            <div className="pt-8 border-t border-white/5">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">Trusted Technology Standards</p>
                                <div className="flex flex-wrap gap-6 items-center opacity-40">
                                    <span className="text-sm font-bold text-white tracking-widest">REACT</span>
                                    <span className="text-sm font-bold text-white tracking-widest">SHOPIFY</span>
                                    <span className="text-sm font-bold text-white tracking-widest">AWS</span>
                                    <span className="text-sm font-bold text-white tracking-widest">NEXTJS</span>
                                </div>
                            </div>
                        </div>

                        {/* Conversion Form */}
                        <div ref={formSectionRef} className="lg:col-span-5 promo-animate">
                            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl relative">
                                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 px-3.5 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-wider shadow-md">
                                    Free wireframe included
                                </div>

                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Get a Custom Proposal</h3>
                                            <p className="text-xs text-slate-400 mt-1">Submit your details and get an estimate and wireframe concept in 24 hours.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Your Name</label>
                                                <input
                                                    type="text"
                                                    disabled={isSubmitting}
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                        if (errors.name) {
                                                            const copy = { ...errors };
                                                            delete copy.name;
                                                            setErrors(copy);
                                                        }
                                                    }}
                                                    placeholder="John Doe"
                                                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                        errors.name ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                                                    }`}
                                                />
                                                {errors.name && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                                                    <input
                                                        type="email"
                                                        disabled={isSubmitting}
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value);
                                                            if (errors.email) {
                                                                const copy = { ...errors };
                                                                delete copy.email;
                                                                setErrors(copy);
                                                            }
                                                        }}
                                                        placeholder="john@company.com"
                                                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                            errors.email ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                                                        }`}
                                                    />
                                                    {errors.email && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        disabled={isSubmitting}
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(e.target.value);
                                                            if (errors.phone) {
                                                                const copy = { ...errors };
                                                                delete copy.phone;
                                                                setErrors(copy);
                                                            }
                                                        }}
                                                        placeholder="+91 99999 99999"
                                                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                            errors.phone ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                                                        }`}
                                                    />
                                                    {errors.phone && <p className="text-red-400 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">What do you need built?</label>
                                                <select
                                                    disabled={isSubmitting}
                                                    value={service}
                                                    onChange={(e) => setService(e.target.value)}
                                                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-all"
                                                >
                                                    <option value="web-dev">Bespoke Website Development</option>
                                                    <option value="ecommerce">Shopify / E-Commerce Store</option>
                                                    <option value="custom-app">Custom Web Application</option>
                                                    <option value="ui-ux">UI/UX Redesign & Graphic Pack</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Brief details (optional)</label>
                                                <textarea
                                                    disabled={isSubmitting}
                                                    value={details}
                                                    onChange={(e) => setDetails(e.target.value)}
                                                    placeholder="Tell us about your brand goals..."
                                                    rows={3}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                                                    Claiming Proposal...
                                                </>
                                            ) : (
                                                "Claim My Free Proposal →"
                                            )}
                                        </button>
                                        {errors.submit && <p className="text-red-400 text-xs text-center font-bold mt-2">{errors.submit}</p>}
                                        <p className="text-[9px] text-center text-slate-500">🔒 We respect your privacy. Zero spam guaranteed.</p>
                                    </form>
                                ) : (
                                    <div className="text-center py-12 space-y-6">
                                        <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-white">Proposal Claimed!</h3>
                                            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                                Thank you, {submittedName}. Our solutions engineers are reviewing your request. We will reach out to you within 24 hours at <strong>{submittedEmail}</strong>.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* INTERACTIVE PRICE ESTIMATOR */}
            <section className="py-24 border-t border-white/5 bg-[#040404]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Interactive Calculator</span>
                        <h2 className="text-3xl font-black text-white mt-4">Estimate Your Web Project</h2>
                        <p className="text-xs text-slate-500 mt-2">Adjust details dynamically to estimate project value instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/[0.01] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                        <div className="md:col-span-7 space-y-6">

                            {/* Project Type */}
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">Project Class</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(["standard", "ecommerce", "custom"] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setCalcType(type)}
                                            className={`py-3.5 px-2 rounded-xl border text-center text-xs font-bold uppercase transition-all ${calcType === type
                                                ? "bg-purple-600 border-purple-500 text-white"
                                                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {type === "standard" ? "Corporate" : type === "ecommerce" ? "E-Com Store" : "Custom Web"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Page count slider */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Page Templates</label>
                                    <span className="text-sm font-bold text-white">{pageCount} Pages</span>
                                </div>
                                <input
                                    type="range"
                                    min={5}
                                    max={25}
                                    value={pageCount}
                                    onChange={(e) => setPageCount(parseInt(e.target.value))}
                                    className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Feature Checklist */}
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">Include Integration Add-ons</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: "seo", label: "Structured Schema & Meta SEO" },
                                        { id: "responsive", label: "Advanced Responsive Testing" },
                                        { id: "cms", label: "Custom Content Manager (CMS)" },
                                        { id: "pixel", label: "Tracking Pixels & Analytics" }
                                    ].map((feat) => (
                                        <button
                                            key={feat.id}
                                            onClick={() => toggleFeature(feat.id)}
                                            className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${features.includes(feat.id)
                                                ? "bg-purple-500/10 border-purple-500/40 text-purple-200"
                                                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                                                }`}
                                        >
                                            <span>{feat.label}</span>
                                            {features.includes(feat.id) && (
                                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cost Output Display */}
                        <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8 flex flex-col justify-center items-center text-center space-y-6">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Estimated Value Setup</span>
                                <div className="text-4xl sm:text-5xl font-black text-white mt-2">
                                    ₹{calculatePrice().toLocaleString("en-IN")}
                                </div>
                                <p className="text-[10px] text-slate-500 mt-2">Includes design, markup code, and initial setup handoff.</p>
                            </div>
                            <button
                                onClick={scrollToForm}
                                className="px-6 py-3.5 w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg"
                            >
                                Lock in this estimate →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CASE STUDY SECTION */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Work Portfolio</span>
                        <h2 className="text-3xl font-black text-white mt-4">Built For Speed & Performance</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] p-2">
                                <img
                                    src="/images/landing_promo_hero.png"
                                    alt="Analytics dashboard platform"
                                    className="rounded-xl w-full object-cover opacity-95 aspect-[16/10]"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">E-COMMERCE METRIC SUCCESS</span>
                            <h3 className="text-2xl font-bold text-white">Modern Enterprise Redesign</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                We redesigned a leading retail platform into a fast, headless Next.js architecture. The result was a 1.2s page load speed improvement and a 42% increase in sales conversion within the first 30 days.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <div className="text-xl font-bold text-white">1.2s</div>
                                    <div className="text-[9px] font-mono text-slate-500 uppercase">Load Time Saved</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">+42%</div>
                                    <div className="text-[9px] font-mono text-slate-500 uppercase">Conversion Growth</div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button onClick={scrollToForm} className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center">
                                    Build a platform like this
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS MAP */}
            <section className="py-24 border-t border-white/5 bg-[#030303]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Execution Path</span>
                        <h2 className="text-3xl font-black text-white mt-4">Our 4-Step Development Map</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", name: "Strategic Plan", desc: "Define user objectives, design mapping, content architecture, and tech selection." },
                            { step: "02", name: "Bespoke Design", desc: "Construct fully custom layout mockups that align with corporate conversion goals." },
                            { step: "03", name: "Clean Coding", desc: "Write responsive code using high-end frameworks to ensure fast browser load times." },
                            { step: "04", name: "Launch & QC", desc: "Comprehensive testing, meta tags configuration, analytics setup, and production release." }
                        ].map((proc, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="text-2xl font-black text-purple-500/60 font-mono">{proc.step}</div>
                                    <h3 className="text-base font-bold text-white mt-4">{proc.name}</h3>
                                </div>
                                <p className="text-xs text-slate-400 mt-4 leading-relaxed">{proc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQS */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "How long does it take to launch a custom web project?",
                                a: "Most custom business landing pages and corporate sites are completed in 3 to 4 weeks. High-end e-commerce setups and large-scale applications usually range between 4 to 8 weeks."
                            },
                            {
                                q: "Do I own the complete code and design files?",
                                a: "Yes. Upon project handoff and final payment settlement, you retain 100% intellectual property ownership of the source code, design assets, and database schemas."
                            },
                            {
                                q: "What support SLA packages do you offer post-launch?",
                                a: "We provide comprehensive security patch support, uptime monitoring, and content maintenance agreements (monthly or custom retainer model)."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIMPLE CRO FOOTER */}
            <footer className="py-12 border-t border-white/5 bg-[#010101]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} Aarvitek Systems. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
