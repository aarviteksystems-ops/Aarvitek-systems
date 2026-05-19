import type { Route } from "./+types/ecommerce";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import * as ScrollTriggerModule from "gsap/ScrollTrigger";
import * as GSAPReact from "@gsap/react";

const ScrollTrigger = (ScrollTriggerModule as any).ScrollTrigger || (ScrollTriggerModule as any).default || ScrollTriggerModule;
const useGSAP = (GSAPReact as any).useGSAP || (GSAPReact as any).default?.useGSAP || GSAPReact;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Scalable E-Commerce Web Development & Shopify Expert | Aarvitek Systems" },
        { name: "description", content: "Aarvitek Systems delivers high-converting custom e-commerce web development, professional Shopify expert setups, and headless WooCommerce platforms. Speed, security, and checkout optimized." },
        { name: "keywords", content: "ecommerce web development, Shopify developer, custom online store builder, WooCommerce website development, custom shopping cart system, high converting checkouts, payment integrations, stripe razorpay delhi" }
    ];
}

export default function Ecommerce() {
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
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 blur-[180px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Hero Text */}
                        <div className="lg:col-span-7 space-y-8 hero-text-animate">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-sm font-semibold text-emerald-200 tracking-wide">High-Converting E-Commerce Engineering</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                                Custom E-Commerce <br />
                                Platforms Built <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                                    to Scale Sales
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                                We engineer high-performance online storefronts, headless e-commerce architectures, and frictionless checkout funnels. Powered by Next.js, Shopify APIs, and WooCommerce, we build scalable platforms optimized for maximum page speed, zero cart abandonment, and complete payment security.
                            </p>

                            {/* SEO Bullet List */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                {[
                                    { text: "Bespoke Headless Architectures", desc: "Speed-focused React & Next.js storefronts" },
                                    { text: "Seamless Multi-Gateway Payment", desc: "Integrated with Stripe, Razorpay, and PayPal" },
                                    { text: "Frictionless Checkout Funnels", desc: "Form setups designed to reduce cart drops" },
                                    { text: "Automated CRM & Inventory Wires", desc: "Real-time stock level synchronization" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mt-1">
                                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
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
                                    Launch My Store
                                </Link>
                                <a href="#ecommerce-stack" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center">
                                    Explore E-Com Stack
                                </a>
                            </div>
                        </div>

                        {/* Right Column: E-Commerce Storefront Mockup */}
                        <div className="lg:col-span-5 relative hero-visual-animate">
                            
                            {/* Ambient glow backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full"></div>

                            {/* Browser Mockup Frame */}
                            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
                                
                                {/* Browser Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></span>
                                    </div>
                                    <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate">
                                        aarviteksystems.com/custom-ecommerce
                                    </div>
                                    <div className="w-12 h-2"></div>
                                </div>

                                {/* Mockup Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-emerald-950/20 flex items-center justify-center">
                                    <img 
                                        src="/images/web-development.png" 
                                        alt="High performance e-commerce platform and shopping cart design mockup" 
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Floating Widget 1: Secure SSL Check */}
                            <div className="absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4"></path></svg>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">SSL secured</span>
                                    <span className="block text-slate-400 text-[10px]">Stripe & PCI compliant</span>
                                </div>
                            </div>

                            {/* Floating Widget 2: Checkout conversion */}
                            <div className="absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]">
                                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 relative">
                                    <span className="text-xs font-black text-indigo-400">+82%</span>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">Checkout rate</span>
                                    <span className="block text-slate-400 text-[10px]">Optimized forms</span>
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
                            { value: "LCP < 1.0s", label: "Blazing Store Speed" },
                            { value: "82%", label: "Checkouts Lift Average" },
                            { value: "100%", label: "Secure PCI Compliance" },
                            { value: "Real-Time", label: "Inventory Sync Wires" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">{stat.value}</span>
                                <span className="block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Custom E-Commerce Capabilities (Improved Cards) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Tailored Selling Systems & Storefronts
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We don't build standard stock templates. We engineer bespoke checkout steps, custom product grids, and complete automated pipelines to streamline merchant operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                                title: "Custom Headless Storefronts",
                                desc: "Architecting React and Next.js frontends connected with headless Shopify or Commerce APIs. Guaranteeing blazing speeds and custom layout freedoms standard templates cannot offer.",
                                tag: "Headless E-Com"
                            },
                            {
                                icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                                title: "Shopify Customization & Setup",
                                desc: "Delivering fast, beautiful stores on the world's most stable storefront framework. Providing completely bespoke Liquid theme customizations, app setup wires, and automated checkout rules.",
                                tag: "Shopify Specialist"
                            },
                            {
                                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                                title: "WooCommerce Engine Integration",
                                desc: "Turning standard WordPress portals into high-volume selling systems. Coding custom WooCommerce page layouts, cart hooks, and custom administrative dashboard management screens.",
                                tag: "WooCommerce Pro"
                            },
                            {
                                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                                title: "Secure Multi-Gateway Payment Rails",
                                desc: "Integrating secure payment gateways (Stripe, Razorpay, PayPal) with proper error auditing, webhook listeners, automated client invoicing, and secure SSL datastores.",
                                tag: "Payment Systems"
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="reveal-card">
                                <div className="relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent">
                                    
                                    {/* conic border indicator */}
                                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#10b981_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"></div>

                                    {/* main card space */}
                                    <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden">
                                        
                                        <div className="space-y-6">
                                            {/* icon wrapper */}
                                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                                                <svg className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}></path></svg>
                                            </div>

                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                {card.title}
                                            </h3>

                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {card.desc}
                                            </p>
                                        </div>

                                        {/* card footer */}
                                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Engine:</span>
                                            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded-md">{card.tag}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 3. Dynamic Creative Tools Stack */}
            <section id="ecommerce-stack" className="py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Our E-Commerce Stack
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We use industry-standard libraries to construct robust cart systems, process payments securely, build fast SSR front-ends, and host scaling online stores.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Next.js", type: "Store SSR", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/40", icon: "Nx" },
                            { name: "Shopify API", type: "Headless Sales", glow: "hover:shadow-[0_0_20px_rgba(150,191,72,0.2)] hover:border-[#96bf48]/40", icon: "Sh" },
                            { name: "WooCommerce", type: "WP selling", glow: "hover:shadow-[0_0_20px_rgba(150,90,200,0.2)] hover:border-purple-500/40", icon: "Wc" },
                            { name: "Stripe", type: "Payment gateway", glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-indigo-500/40", icon: "St" },
                            { name: "PostgreSQL", type: "Products DB", glow: "hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:border-sky-500/40", icon: "Pg" },
                            { name: "AWS Serverless", type: "Scale Scaling", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-500/40", icon: "Aw" }
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

            {/* 4. Interactive E-Commerce Roadmap / Process (Step-by-step) */}
            <section id="ecommerce-process" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Structured E-Com Development Flow
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            A highly organized four-step creation pipeline ensuring your digital catalog sells exactly what your business yields.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { num: "01", step: "Catalog & Funnel Map", desc: "Auditing product attributes, defining visual product categories, layout plans, and mapping the payment structures." },
                            { num: "02", step: "Frictionless Cart Wires", desc: "Constructing scalable shopping cart wires in Figma. Designing fast checkout forms and setting up payment methods." },
                            { num: "03", step: "API Gate & Security Audit", desc: "Testing payment gateway webhooks, checking stock level synchronization rules, and validating core speed stats." },
                            { num: "04", step: "Scale Serverless Setup", desc: "Deploying high-speed serverless setups on AWS or Vercel, hooked with automated analytical dashboard trackers." }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
                                <span className="block text-4xl font-black text-emerald-500/30 group-hover:text-emerald-400/80 transition-colors">{phase.num}</span>
                                <h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-emerald-300 transition-colors">{phase.step}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. Improved Call to Action (CTA) Box */}
            <section className="py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#051a10] to-[#010a06] shadow-2xl">
                        
                        {/* Glow spots inside CTA */}
                        <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Ready to Architect a <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                                    High-Performance Custom Store?
                                </span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Let's build a secure, fast, and completely checkout-optimized e-commerce platform tailored to elevate your sales and drive organic retail growth.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    to="/contact" 
                                    className="inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]"
                                >
                                    Get a Free Custom Store CRO Audits
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
