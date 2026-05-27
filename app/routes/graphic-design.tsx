import type { Route } from "./+types/graphic-design";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { generateMeta, generateJsonLd, getBreadcrumbSchema } from "../utils/seo-config";

export function meta({ }: Route.MetaArgs) {
    return [
        ...generateMeta({
            title: "Premium Graphic Design Services & Branding | Aarvitek Systems",
            description: "Aarvitek Systems delivers professional custom graphic design, memorable logo creation, corporate brand identity guides, and print-ready digital marketing assets. 100% SEO-optimized.",
            url: "/graphic-design",
        }),
        generateJsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Graphic Design",
            "provider": {
                "@type": "Organization",
                "name": "Aarvitek Systems"
            },
            "description": "Professional custom graphic design, memorable logo creation, corporate brand identity guides, and print-ready digital marketing assets.",
            "areaServed": "IN"
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Graphic Design", item: "/graphic-design" }
        ]))
    ];
}

export default function GraphicDesign() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero load animation
        gsap.from(".hero-text-animate > *", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.1
        });

        gsap.from(".hero-visual-animate", {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.4
        });

        // Cards fade-in reveal
        const cards = gsap.utils.toArray<HTMLElement>(".reveal-card");
        cards.forEach((card) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            });
        });

        // Tool items stagger reveal
        gsap.from(".tool-card-animate", {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".tool-section-trigger",
                start: "top 80%"
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[180px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Hero Text */}
                        <div className="lg:col-span-7 space-y-8 hero-text-animate">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                                <span className="text-sm font-semibold text-rose-200 tracking-wide">Dynamic Branding & Vector Artistry</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                                Visual Storytelling <br />
                                That Builds <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400">
                                    Brand Authority
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                                We engineer high-impact visual identities. From corporate logo packages and complete color system design guides to customized digital vector art and high-converting marketing print media, we transform abstract brand goals into striking graphical reality.
                            </p>

                            {/* SEO Bullet List */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                {[
                                    { text: "Memorable Logos & Identity Guides", desc: "Cohesive style sheets with custom typography" },
                                    { text: "100% Handcrafted Scalable Vectors", desc: "Clean SVG, EPS & AI vector assets" },
                                    { text: "High-Converting Ad & Social Packs", desc: "Dynamic banners designed to lift click-throughs" },
                                    { text: "Print-Ready Corporate Collaterals", desc: "High-DPI layout sheets ready for production" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 mt-1">
                                            <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-sm tracking-wide">{item.text}</span>
                                            <span className="block text-slate-500 text-xs mt-0.5">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/contact" className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                                    Consult Our Designers
                                </Link>
                                <a href="#graphic-process" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center">
                                    Our Creative Process
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Graphic Artboard Mockup */}
                        <div className="lg:col-span-5 relative hero-visual-animate">
                            
                            {/* Ambient glow backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-violet-500/10 blur-3xl -z-10 rounded-full"></div>

                            {/* Canvas Artboard Mockup */}
                            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
                                
                                {/* Artboard Menu Bar */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></span>
                                    </div>
                                    <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate">
                                        artboard_canvas_v2.ai (300 DPI)
                                    </div>
                                    <div className="w-12 h-2"></div>
                                </div>

                                {/* Mockup Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-rose-950/20 flex items-center justify-center">
                                    <img 
                                        src="/images/ui-ux-design.png" 
                                        alt="Vector illustrations and digital branding layouts" 
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    {/* Ruler guides overlay */}
                                    <div className="absolute inset-0 border border-dashed border-rose-500/30 m-8 pointer-events-none"></div>
                                    <div className="absolute top-1/2 inset-x-0 border-t border-dashed border-violet-500/30 pointer-events-none"></div>
                                    <div className="absolute left-1/2 inset-y-0 border-l border-dashed border-violet-500/30 pointer-events-none"></div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Floating Widget 1: Vector Check */}
                            <div className="absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]">
                                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4"></path></svg>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">Scale Check</span>
                                    <span className="block text-slate-400 text-[10px]">100% Scalable SVG</span>
                                </div>
                            </div>

                            {/* Floating Widget 2: Uptime / Trust */}
                            <div className="absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]">
                                <div className="flex gap-1.5 items-center">
                                    <span className="w-3.5 h-3.5 rounded-full bg-rose-500"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-pink-500"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-purple-500"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-violet-500"></span>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">Active Brand Palette</span>
                                    <span className="block text-slate-400 text-[10px]">Harmonious CSS Matching</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Brand Impact Stats banner */}
            <section className="py-8 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
                        {[
                            { value: "7.4x", label: "Higher Visual Retention" },
                            { value: "300 DPI", label: "High-DPI Print Precision" },
                            { value: "100%", label: "Handcrafted Unique Logos" },
                            { value: "SVG/EPS", label: "Lossless Vector Formats" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">{stat.value}</span>
                                <span className="block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Custom Graphic Design Capabilities (Improved Cards) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Tailored Visual Systems
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We don't use stock graphics. We map out bespoke color profiles, tailored icon assets, and complete corporate identity styles customized to your audience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                                title: "Brand Strategy & Logo Identity",
                                desc: "Forging dynamic corporate symbols and cohesive logotypes from scratch. Handing over exhaustive visual brand books defining your active colors, layouts, and font structures.",
                                tag: "Logo System"
                            },
                            {
                                icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                                title: "Digital Ad & Social Design Packs",
                                desc: "Creating high-CTR Google display assets, visually aesthetic social grid wireframes (Instagram, LinkedIn), and targeted graphical banners aligned to fuel your digital marketing campaigns.",
                                tag: "Social & Ad Media"
                            },
                            {
                                icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                                title: "Custom Explainer Infographics",
                                desc: "Distilling complex statistics and abstract software concepts into simple, visually stunning explainer vectors. Highly shareable graphics customized to boost organic search backlinks.",
                                tag: "Vector Infographics"
                            },
                            {
                                icon: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9v4a2 2 0 00-2 2v2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h8z",
                                title: "Print-Ready Corporate Media",
                                desc: "Designing premium commercial pamphlets, visual booklets, elegant business cards, and sales flyers. Exported in strict high-DPI CMYK profiles with proper bleed zones.",
                                tag: "Print Collaterals"
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="reveal-card">
                                <div className="relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(244,63,94,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent">
                                    
                                    {/* conic border indicator */}
                                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#f43f5e_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"></div>

                                    {/* main card space */}
                                    <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden">
                                        
                                        <div className="space-y-6">
                                            {/* icon wrapper */}
                                            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-600 group-hover:border-rose-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300">
                                                <svg className="w-6 h-6 text-rose-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}></path></svg>
                                            </div>

                                            <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                                                {card.title}
                                            </h3>

                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {card.desc}
                                            </p>
                                        </div>

                                        {/* card footer */}
                                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Output:</span>
                                            <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/5 border border-rose-500/10 px-2.5 py-0.5 rounded-md">{card.tag}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 3. Dynamic Creative Tools Stack */}
            <section id="tools" className="py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Our Graphic Design Toolkit
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We deploy advanced graphic production suites to trace high-definition shapes, edit textures, arrange print boundaries, and compile vector packages.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Illustrator", type: "Vector Creator", glow: "hover:shadow-[0_0_20px_rgba(255,154,0,0.2)] hover:border-amber-500/40", icon: "Ai" },
                            { name: "Photoshop", type: "Raster & Mockup", glow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.2)] hover:border-sky-500/40", icon: "Ps" },
                            { name: "InDesign", type: "Page Layout", glow: "hover:shadow-[0_0_20px_rgba(255,0,102,0.2)] hover:border-rose-500/40", icon: "Id" },
                            { name: "Figma", type: "Component Vectors", glow: "hover:shadow-[0_0_20px_rgba(242,78,30,0.2)] hover:border-orange-500/40", icon: "Fi" },
                            { name: "CorelDRAW", type: "Print Vectorizing", glow: "hover:shadow-[0_0_20px_rgba(0,204,102,0.2)] hover:border-emerald-500/40", icon: "Cd" },
                            { name: "Procreate", type: "Digital Sketching", glow: "hover:shadow-[0_0_20px_rgba(153,102,255,0.2)] hover:border-purple-500/40", icon: "Pr" }
                        ].map((tool, idx) => (
                            <div key={idx} className="tool-card-animate">
                                <div className={`group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`}>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-rose-600/10 group-hover:text-rose-300 group-hover:border-rose-500/30 transition-all">
                                        {tool.icon}
                                    </div>
                                    <span className="block text-sm font-bold text-white group-hover:text-rose-200 transition-colors">{tool.name}</span>
                                    <span className="block text-[10px] text-slate-500 mt-1">{tool.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 4. Interactive Design Roadmap / Process (Step-by-step) */}
            <section id="graphic-process" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Structured Creative Pipeline
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            A highly organized four-step creation pipeline ensuring your digital collateral conveys exactly what your business represents.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { num: "01", step: "Moodboards & Concepting", desc: "Formulating initial shape ideas, checking color profiles, drawing rough layout lines, and checking logo structures." },
                            { num: "02", step: "Vector Tracing Sprints", desc: "Constructing scalable curve nodes in Illustrator. Designing high-DPI layouts and picking typography pairings." },
                            { num: "03", step: "Palette & Context Testing", desc: "Validating how graphic mockups render inside mobile websites, commercial mockups, and high-impact print collaterals." },
                            { num: "04", step: "Production Delivery Sync", desc: "Exporting raw layer formats (SVG, EPS, high-res PNG, bleed PDF) alongside the corporate brand guidelines book." }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
                                <span className="block text-4xl font-black text-rose-500/30 group-hover:text-rose-400/80 transition-colors">{phase.num}</span>
                                <h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-rose-300 transition-colors">{phase.step}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. Improved Call to Action (CTA) Box */}
            <section className="py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#1a0505] to-[#0a0101] shadow-2xl">
                        
                        {/* Glow spots inside CTA */}
                        <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-violet-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Ready to Redesign Your <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400">
                                    Brand's Visual System?
                                </span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Let's architect high-impact brand guidelines and gorgeous marketing graphics to skyrocket click-throughs and secure instant user trust.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    to="/contact" 
                                    className="inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]"
                                >
                                    Get a Free Custom Brand Style Session
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
