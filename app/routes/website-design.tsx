import type { Route } from "./+types/website-design";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Premium UI/UX Website Design & Branding | Aarvitek Systems" },
        { name: "description", content: "Aarvitek Systems crafts modern, responsive, and high-converting custom website designs. Specializing in high-fidelity Figma prototyping, brand UI/UX overhauls, and legacy site makeovers. 100% SEO-friendly." },
        { name: "keywords", content: "website design services, custom UI/UX design, Figma website designer, digital branding agency, responsive web layouts, website redesign company, legacy site modernization, conversion rate optimization, Delhi design studio" }
    ];
}

export default function WebsiteDesign() {
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
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Hero Text */}
                        <div className="lg:col-span-7 space-y-8 hero-text-animate">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
                                <span className="text-sm font-semibold text-pink-200 tracking-wide">High-Fidelity UI/UX & Interaction</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                                Custom Web <br />
                                Design That <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                                    Captivates & Converts
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                                We craft premium, user-centric, and conversion-focused digital designs. Grounded in cognitive ergonomics and dynamic visual brand identity, we turn complex interfaces into simple, elegant, and memorable digital experiences.
                            </p>

                            {/* SEO Bullet List */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                {[
                                    { text: "User-Centric UI/UX Prototyping", desc: "Intuitive workflows built for user action" },
                                    { text: "Responsive Mobile-First Framework", desc: "Pixel-perfect views on all modern screens" },
                                    { text: "High-Converting Micro-animations", desc: "Dynamic visuals that elevate bounce rates" },
                                    { text: "Legacy Website Redesigns", desc: "Modernize legacy systems without losing rankings" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 mt-1">
                                            <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
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
                                    Schedule Design Call
                                </Link>
                                <a href="#design-process" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center">
                                    Our Design Process
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Interactive Browser Mockup */}
                        <div className="lg:col-span-5 relative hero-visual-animate">
                            
                            {/* Decorative blur background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 blur-3xl -z-10 rounded-full"></div>

                            {/* Browser Window Mockup */}
                            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
                                
                                {/* Browser Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></span>
                                    </div>
                                    <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate">
                                        aarviteksystems.com/custom-website-design
                                    </div>
                                    <div className="w-12 h-2"></div>
                                </div>

                                {/* Mockup Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-pink-950/20 flex items-center justify-center">
                                    <img 
                                        src="/images/ui-ux-design.png" 
                                        alt="Responsive UI/UX Digital Branding and Custom Website Design Mockup" 
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Floating Card 1: Conversion Gain */}
                            <div className="absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]">
                                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 relative">
                                    <span className="text-xs font-black text-pink-400">+3.2x</span>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">Conversion rate</span>
                                    <span className="block text-slate-400 text-[10px]">Average client impact</span>
                                </div>
                            </div>

                            {/* Floating Card 2: Interactive Tool */}
                            <div className="absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                                    <span className="font-black text-purple-400 text-sm">Fi</span>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">UI/UX Audit</span>
                                    <span className="block text-slate-400 text-[10px]">100% Figma Prototype</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Core Engagement Stats banner */}
            <section className="py-8 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
                        {[
                            { value: "94%", label: "First Impression Metric" },
                            { value: "-88%", label: "Average Bounce Reduction" },
                            { value: "320%", label: "Conversion Lift Potential" },
                            { value: "100%", label: "Pixel-Perfect Responsive" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{stat.value}</span>
                                <span className="block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Custom Website Design Capabilities (Improved Cards) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Tailored Design Systems & UI/UX
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We don't buy generic theme assets. We map out bespoke color profiles, tailored icon assets, and complete interactive components mapped to your target market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                title: "Responsive Web Layouts",
                                desc: "Dynamic screen layouts engineered to scale across small mobiles, tablets, and wide retina displays. Ensuring aesthetic visual balance regardless of client browser choice.",
                                tag: "Mobile First"
                            },
                            {
                                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                                title: "Intelligent UI/UX Prototyping",
                                desc: "Analyzing complete buyer personas, building user journey boards, and constructing detailed Figma blueprints to test user workflows and micro-triggers before coding starts.",
                                tag: "Conversion Focus"
                            },
                            {
                                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                                title: "Modern Website Redesigns",
                                desc: "Rebuilding slow, outdated websites into futuristic visual portals. Completely redesigning the interface, restructuring menus, and enhancing load-times without affecting Google SEO indexes.",
                                tag: "Brand Makeover"
                            },
                            {
                                icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
                                title: "Interaction & Micro-Animations",
                                desc: "Integrating custom SVG graphics, hover triggers, parallax depth systems, and smooth GSAP load transitions that keep users deeply engaged, increasing session times.",
                                tag: "Dynamic Interfaces"
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
                                            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-600 group-hover:border-pink-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300">
                                                <svg className="w-6 h-6 text-pink-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}></path></svg>
                                            </div>

                                            <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                                                {card.title}
                                            </h3>

                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {card.desc}
                                            </p>
                                        </div>

                                        {/* card footer */}
                                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Strategy:</span>
                                            <span className="text-[11px] font-semibold text-pink-400 bg-pink-500/5 border border-pink-500/10 px-2.5 py-0.5 rounded-md">{card.tag}</span>
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
                            Our UI/UX Production Stack
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We use industry-standard tools to map visual ecosystems, design component wires, mock dynamic behaviors, and export clean assets for our engineers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Figma", type: "Interface Design", glow: "hover:shadow-[0_0_20px_rgba(242,78,30,0.2)] hover:border-orange-500/40", icon: "Fi" },
                            { name: "Photoshop", type: "Raster Editing", glow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.2)] hover:border-sky-500/40", icon: "Ps" },
                            { name: "Illustrator", type: "Vector Graphics", glow: "hover:shadow-[0_0_20px_rgba(255,154,0,0.2)] hover:border-amber-500/40", icon: "Ai" },
                            { name: "After Effects", type: "Motion UX", glow: "hover:shadow-[0_0_20px_rgba(153,153,255,0.2)] hover:border-indigo-500/40", icon: "Ae" },
                            { name: "Tailwind CSS", type: "Style Blueprint", glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-500/40", icon: "Tw" },
                            { name: "GSAP Motion", type: "UI Animation", glow: "hover:shadow-[0_0_20px_rgba(136,255,0,0.2)] hover:border-lime-500/40", icon: "Gs" }
                        ].map((tool, idx) => (
                            <div key={idx} className="tool-card-animate">
                                <div className={`group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`}>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-purple-600/10 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-all">
                                        {tool.icon}
                                    </div>
                                    <span className="block text-sm font-bold text-white group-hover:text-purple-200 transition-colors">{tool.name}</span>
                                    <span className="block text-[10px] text-slate-500 mt-1">{tool.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 4. Interactive Design Roadmap / Process (Step-by-step) */}
            <section id="design-process" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Structured UI/UX Flow
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            A transparent, iterative pipeline that ensures we align completely with your target demographics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { num: "01", step: "Discovery & SEO Mapping", desc: "Evaluating market niches, analyzing competing sites, defining color schemes, and planning index structure." },
                            { num: "02", step: "Wireframes & UX Blueprint", desc: "Constructing grayscale component wires in Figma. Drafting the navigation hierarchies and scroll maps." },
                            { num: "03", step: "Hi-Fi Prototyping & Visuals", desc: "Applying complete brand stylings, adding images, designing visual layouts, and creating interactive mockups." },
                            { num: "04", step: "Handover & Developer Sync", desc: "Preparing detailed layout specs, organizing color guides, and aligning with coding teams for flawless execution." }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
                                <span className="block text-4xl font-black text-pink-500/30 group-hover:text-pink-400/80 transition-colors">{phase.num}</span>
                                <h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-pink-300 transition-colors">{phase.step}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. Improved Call to Action (CTA) Box */}
            <section className="py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#1a0510] to-[#0a0106] shadow-2xl">
                        
                        {/* Glow spots inside CTA */}
                        <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-pink-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Ready to Redesign Your <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                                    Digital Authority?
                                </span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Let's build a custom interactive UI design package to overhaul your brand value, keep users active, and significantly lift visual authority.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    to="/contact" 
                                    className="inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]"
                                >
                                    Get a Free Custom UI/UX Website Audit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
