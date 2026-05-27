import type { Route } from "./+types/web-development";
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
            title: "Custom Web Development Services & Scalable SaaS Apps | Aarvitek Systems",
            description: "Aarvitek Systems delivers high-performance custom web development services, scalable headless CMS, and secure enterprise software architectures using React, Next.js, and Node.js. Speed and SEO optimized.",
            url: "/web-development",
        }),
        generateJsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Custom Web Development",
            "provider": {
                "@type": "Organization",
                "name": "Aarvitek Systems"
            },
            "description": "High-performance custom web development services, scalable headless CMS, and secure enterprise software architectures.",
            "areaServed": "IN"
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Web Development", item: "/web-development" }
        ]))
    ];
}

export default function WebDevelopment() {
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

        // Tech items stagger reveal
        gsap.from(".tech-card-animate", {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".tech-section-trigger",
                start: "top 80%"
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12">
            
            {/* Ambient Background Lights */}
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[180px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Hero Text */}
                        <div className="lg:col-span-7 space-y-8 hero-text-animate">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                                <span className="text-sm font-semibold text-purple-200 tracking-wide">Enterprise-Grade Architecture</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                                Custom Web <br />
                                Development for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                                    High-Growth Brands
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
                                We engineer lightning-fast custom web applications, highly scalable headless CMS systems, and API-driven enterprise SaaS architectures. Powered by React, Next.js, and Node.js, we guarantee impeccable performance, absolute core-vital optimization, and organic SEO prominence.
                            </p>

                            {/* SEO Bullet List */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                {[
                                    { text: "Core Web Vitals & Speed-Optimized", desc: "Average LCP under 1.2 seconds" },
                                    { text: "SEO Semantic Code Architecture", desc: "Build for crawling & high SERP ranking" },
                                    { text: "Scalable Full-Stack Engineering", desc: "API integrations & Node microservices" },
                                    { text: "Ironclad Enterprise Security", desc: "SSL, OAuth, and DDoS resistant clouds" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mt-1">
                                            <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
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
                                    Launch Your Project
                                </Link>
                                <a href="#tech-stack" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center">
                                    Explore Tech Stack
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Premium Mockup Image */}
                        <div className="lg:col-span-5 relative hero-visual-animate">
                            
                            {/* Decorative blur backdrop for mockup */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full"></div>

                            {/* Browser Mockup Panel */}
                            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
                                
                                {/* Browser Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></span>
                                        <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></span>
                                    </div>
                                    <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate">
                                        aarviteksystems.com/custom-web-dev
                                    </div>
                                    <div className="w-12 h-2"></div> {/* Spacer */}
                                </div>

                                {/* Mockup Illustration Area */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-indigo-950/20 flex items-center justify-center">
                                    <img 
                                        src="/images/web-development.png" 
                                        alt="Full-Stack Custom Web Development Architecture Illustration" 
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                            </div>

                            {/* Floating Widget 1: Page Speed */}
                            <div className="absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]">
                                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent flex items-center justify-center relative">
                                    <span className="text-xs font-black text-emerald-400">100</span>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">Page Speed</span>
                                    <span className="block text-slate-400 text-[10px]">Core Web Vitals Perfect</span>
                                </div>
                            </div>

                            {/* Floating Widget 2: SEO Optimization */}
                            <div className="absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <div>
                                    <span className="block text-white font-extrabold text-xs tracking-wider uppercase">SEO Rank</span>
                                    <span className="block text-slate-400 text-[10px]">Optimized Core Indexing</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Core Web Vitals SEO Metrics Strip */}
            <section className="py-8 bg-white/[0.02] border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
                        {[
                            { value: "LCP < 1.2s", label: "Largest Contentful Paint" },
                            { value: "FID < 15ms", label: "First Input Delay" },
                            { value: "CLS < 0.05", label: "Cumulative Layout Shift" },
                            { value: "TTFB < 0.2s", label: "Time To First Byte" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{stat.value}</span>
                                <span className="block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Custom Web Development Capabilities */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Tailored Coding & Full-Stack Solutions
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We build enterprise solutions crafted precisely around your business bottlenecks. No bloated code, no standard templates—just robust, performance-optimized digital engines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                                title: "Enterprise Full-Stack Web Apps",
                                desc: "Custom designed SaaS systems, massive databases, secure admin dashboards, and custom backend engines engineered using TypeScript, Node, and React. Built to handle heavy workloads seamlessly.",
                                keywords: "GraphQL APIs, Node microservices, PostgreSQL architectures"
                            },
                            {
                                icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                                title: "High-Converting Custom E-Commerce",
                                desc: "Fully tailored storefronts utilizing headless Commerce APIs. Integrated with smooth payment gateways, advanced inventory tracking, automated discount engines, and super-fast checkouts.",
                                keywords: "Stripe, Razorpay, conversion-rate optimized checkouts"
                            },
                            {
                                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                                title: "Headless CMS & Content Systems",
                                desc: "Lightning-fast static front-ends integrated with powerful headless CMS engines (Strapi, Sanity, WordPress REST). Allows marketing teams to manage content easily without affecting site speeds.",
                                keywords: "Static Site Generation (SSG), Incremental Regeneration"
                            },
                            {
                                icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                                title: "API Integrations & Cloud Deployment",
                                desc: "Custom API development and seamless integrations with CRM networks, marketing automation channels, and ERP systems. Fully hosted on high-availability AWS/Vercel serverless configurations.",
                                keywords: "RESTful & gRPC APIs, Serverless Cloud Architectures"
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="reveal-card">
                                <div className="relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent">
                                    
                                    {/* Rotating Gradient Background on Hover */}
                                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"></div>

                                    {/* Card Content container */}
                                    <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-10 z-10 flex flex-col justify-between overflow-hidden">
                                        
                                        {/* Subtle ambient light dot in card corner */}
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors"></div>

                                        <div className="space-y-6">
                                            {/* Icon block */}
                                            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:rotate-6">
                                                <svg className="w-7 h-7 text-purple-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}></path></svg>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                                {card.title}
                                            </h3>

                                            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                                {card.desc}
                                            </p>
                                        </div>

                                        {/* Card Footer tags for SEO */}
                                        <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-2 items-center">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Keywords:</span>
                                            <span className="text-[11px] font-semibold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-md">{card.keywords}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 3. Tech Stack Grid (Interactive Glowing Cards) */}
            <section id="tech-stack" className="py-24 bg-[#050505] border-y border-white/5 relative z-10 tech-section-trigger">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Next-Generation Tech Ecosystem
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We don't build on outdated frameworks. We utilize state-of-the-art architectures designed for blistering speeds, dynamic reactivity, and highly efficient cloud scalability.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { name: "React", type: "Frontend Library", glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.25)] hover:border-sky-500/40", badge: "Reactive UI", desc: "Dynamic, fast user interfaces with reusable state hooks." },
                            { name: "Next.js", type: "SSR Framework", glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/40", badge: "Max SEO Speed", desc: "Server-side rendering, static site generation, and perfect SEO indexing." },
                            { name: "Node.js", type: "Backend Runtime", glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-500/40", badge: "Highly Concurrent", desc: "Asynchronous backend loops built for fast operations." },
                            { name: "TypeScript", type: "Strict Coding", glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-500/40", badge: "Zero-Bug Code", desc: "Type safety, auto-documentation, and self-validating interfaces." },
                            { name: "PostgreSQL", type: "Relational DB", glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:border-sky-400/40", badge: "Structured Data", desc: "Complex queries, ACID-compliance, and enterprise-grade datastores." },
                            { name: "AWS Cloud", type: "Infrastructure", glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-500/40", badge: "99.99% Uptime", desc: "Scalable serverless lambda, secure S3 storage, and global CDN networks." },
                            { name: "Tailwind CSS", type: "Styling Framework", glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-500/40", badge: "Clean Responsive", desc: "Highly custom, responsive utility rendering with zero unused classes." },
                            { name: "GraphQL & REST", type: "API Architectures", glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] hover:border-pink-500/40", badge: "Ultra-Fast Fetching", desc: "Lightweight API endpoints protecting client bandwidth." }
                        ].map((tech, idx) => (
                            <div key={idx} className="tech-card-animate">
                                <div className={`group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 cursor-default ${tech.glow}`}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none rounded-2xl"></div>
                                    
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <span className="block text-lg font-black text-white group-hover:text-purple-300 transition-colors">{tech.name}</span>
                                            <span className="block text-[11px] text-slate-500 mt-0.5">{tech.type}</span>
                                        </div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 border border-purple-500/20 bg-purple-500/5 text-purple-300 rounded">
                                            {tech.badge}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        {tech.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 4. Strategic Engineering Process Flow */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
                            Our Web Development Roadmap
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            How we transform raw specifications into beautifully functional, blazingly fast custom web apps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { num: "01", step: "SEO Discovery & Wireframing", desc: "Analyzing target keywords, designing UX mapping, and establishing performance targets." },
                            { num: "02", step: "Agile Coding Sprint", desc: "Writing clean, type-safe full-stack scripts. Delivering functional sprint demos weekly." },
                            { num: "03", step: "Core Vital & SEO Testing", desc: "Rigorous automated load testing, validating mobile layout responsiveness, and auditing SERP tags." },
                            { num: "04", step: "Cloud Infrastructure Setup", desc: "Deploying on scalable serverless clouds with continuous delivery pipelines (CI/CD)." }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
                                <span className="block text-4xl font-black text-purple-500/30 group-hover:text-purple-400/80 transition-colors">{phase.num}</span>
                                <h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-purple-300 transition-colors">{phase.step}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. Improved Call to Action (CTA) Box */}
            <section className="py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#0c051a] to-[#04010a] shadow-2xl">
                        
                        {/* Glow spots inside CTA */}
                        <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Ready to Architect a <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                                    High-Performance Custom Web App?
                                </span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Let's build a secure, fast, and completely search-optimized platform tailored to elevate your conversions and drive organic digital growth.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    to="/contact" 
                                    className="inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]"
                                >
                                    Book a Free Consultation & Discovery Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
