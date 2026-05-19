import type { Route } from "./+types/portfolio";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Our Custom Web & Graphic Design Portfolio | Aarvitek Systems" },
        { name: "description", content: "Explore custom web applications, responsive Figma mockups, high-converting e-commerce storefronts, and professional motion graphic videos engineered by Aarvitek Systems." },
        { name: "keywords", content: "web development portfolio, custom UI/UX showcase, branding design case studies, shopify developer work, digital agency portfolio delhi" }
    ];
}

export default function Portfolio() {
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
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[180px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* 1. Header Hero section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-24 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-text-animate space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                        <span className="text-sm font-semibold text-purple-200 tracking-wide">Featured Case Studies</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
                        Our Engineered <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                            Digital Masterpieces
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                        We don't settle for average. Explore our curated library of custom B2B web applications, high-converting checkout stores, bespoke brand guidelines, and high-retention video stories.
                    </p>
                </div>
            </section>

            {/* 2. Portfolio Bento-Style Grid */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {[
                            {
                                img: "/images/web-development.png",
                                cat: "Full-Stack Custom Web App",
                                title: "Apex Retail Solutions Platform",
                                desc: "Rebuilding a complex B2B logistics ecosystem using Next.js and serverless AWS architectures. Replaced a slow legacy dashboard with a high-performance system, cutting server latency times and improving database synchronization.",
                                stats: [
                                    { val: "100/100", lbl: "LCP speed score" },
                                    { val: "+320%", lbl: "Data speed boost" }
                                ],
                                glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30",
                                border: "group-hover:bg-purple-500"
                            },
                            {
                                img: "/images/ui-ux-design.png",
                                cat: "Figma UI/UX & Interaction",
                                title: "Nexa Digital Bank Blueprints",
                                desc: "Crafting comprehensive mobile and desktop interactive mockup designs for an emerging digital banking product. Built custom vector component libraries, mapped complex buyer journeys, and tested click-through rates.",
                                stats: [
                                    { val: "94%", lbl: "First impressions rating" },
                                    { val: "100%", lbl: "Figma vector output" }
                                ],
                                glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] hover:border-pink-500/30",
                                border: "group-hover:bg-pink-500"
                            },
                            {
                                img: "/images/web-development.png",
                                cat: "Headless E-Commerce Solutions",
                                title: "Lumina Organic Storefront",
                                desc: "Engineering a fast, headless e-commerce store connected via Shopify store APIs. Replaced generic slow theme styles with a fully bespoke, conversion-rate optimized (CRO) React cart engine.",
                                stats: [
                                    { val: "+82%", lbl: "Checkouts increase" },
                                    { val: "< 1.0s", lbl: "Frictionless checkout speed" }
                                ],
                                glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
                                border: "group-hover:bg-emerald-500"
                            },
                            {
                                img: "/images/ui-ux-design.png",
                                cat: "Cinematic Video Editing & VFX",
                                title: "Stellar Cloud Explainer Reel",
                                desc: "Editing a high-impact promotional campaign video for an enterprise SaaS product. Handcrafted kinetic text sequences, synced complex background audio masterings, and color styled all log clips.",
                                stats: [
                                    { val: "+85%", lbl: "User retention" },
                                    { val: "4K UHD", lbl: "Lossless resolution" }
                                ],
                                glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30",
                                border: "group-hover:bg-indigo-500"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="reveal-card">
                                <div className={`group rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer shadow-2xl ${item.glow}`}>
                                    
                                    {/* Mock Browser Frame */}
                                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5 border-b border-white/5">
                                        
                                        {/* Browser Header */}
                                        <div className="absolute top-0 inset-x-0 h-10 px-4 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between z-20">
                                            <div className="flex gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-500 truncate max-w-xs">{item.title.toLowerCase().replace(/ /g, '-')}.html</span>
                                            <div className="w-12"></div>
                                        </div>

                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 pt-10" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black tracking-widest text-slate-500 uppercase">{item.cat}</span>
                                            <div className={`w-8 h-1 rounded ${item.border} transition-colors duration-300`}></div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                            {item.desc}
                                        </p>

                                        {/* Project Metrics */}
                                        <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                            {item.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                                                    <span className="block text-xl font-black text-white">{stat.val}</span>
                                                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">{stat.lbl}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CTA: Start a Project */}
            <section className="py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2rem] overflow-hidden p-12 text-center border border-white/10 bg-gradient-to-br from-[#0c051a] to-[#04010a] shadow-2xl">
                        <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Ready to Build Your Own <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                    Digital Authority?
                                </span>
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Let's collaborate to architect a stunning custom codebase or graphic vector system that places you light years ahead of your competitors.
                            </p>
                            <div className="pt-4">
                                <Link 
                                    to="/contact" 
                                    className="inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-extrabold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                                >
                                    Book a Discovery Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
