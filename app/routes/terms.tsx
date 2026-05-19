import type { Route } from "./+types/terms";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Terms of Service & Agreements | Aarvitek Systems" },
        { name: "description", content: "Read the Terms of Service governing code delivery, Figma layouts ownership, secure payment processing, and agile development contracts at Aarvitek Systems." },
        { name: "keywords", content: "terms of service aarvitek systems, digital development contract, custom code ownership, figma design rights, payment terms" }
    ];
}

export default function Terms() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".fade-in-animate > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.1
        });
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* Content Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in-animate">
                
                {/* 1. Header Hero section */}
                <div className="text-center pt-12 pb-16 space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-4">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                        Terms of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                            Service Agreement
                        </span>
                    </h1>

                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Last Updated: May 19, 2026. These Terms govern your engagement with aarviteksystems.com and define how we deliver high-performance code and branding systems.
                    </p>
                </div>

                {/* 2. Main Content Card */}
                <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-16 shadow-2xl overflow-hidden space-y-12">
                    
                    {/* Corner Ambient light */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            1. Agreement to Terms
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            By navigating our website, interacting with our digital interfaces, or contracting Aarvitek Systems for custom software engineering, e-commerce builds, or vector design packs, you agree to comply with and be legally bound by these Terms of Service. If you disagree with any terms defined here, you must immediately halt platform access.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            2. Code & Intellectual Property Rights
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We believe in absolute client ownership. Our intellectual property transfer guarantees the following:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Full Codebase Ownership**: Upon receipt of final payment, Aarvitek Systems transfers **100% full, unrestricted ownership** of the custom-written code, databases, and visual mockup assets to the client.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Open-Source Dependencies**: Any open-source packages (e.g. React Router, GSAP, Tailwind CSS) incorporated remain governed by their respective licenses.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Design Blueprints**: Custom Figma artboards and print-ready vector sheets belong completely to the paying client.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            3. User Conduct & Security Rules
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            When interacting with Aarvitek Systems' digital platforms or serverless channels, you agree not to:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Attempt unauthorized network penetration testing, hacking, or DDoS attacks on our AWS hosted setups.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Deploy scraping bots, automated extractors, or spam frameworks on our contact portals.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Use Aarvitek engineered systems for illegal, malicious, or highly deceptive digital practices.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            4. Project Timelines & Agile Milestones
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Aarvitek Systems delivers visual designs and systems code under an agile sprint methodology:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Sprint Timelines**: Projects are organized into 2-week active sprints with defined milestones.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Revision Approvals**: Visual wireframes and layouts are submitted for client review; sprint progress requires written sign-offs.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Delay Audits**: Project completion dates are estimated; we aren't liable for delays caused by client assets collection, third-party API downtimes, or communication halts.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            5. Invoicing & Secure Payment Rules
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Engagement invoicing adheres to secure, standard billing pathways:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Standard Installment Split**: Typically structured as 50% initial design/scoping retainer fee, and 50% upon successful system deployment.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Payment Gateway compliance**: Secure transaction processes are cleared through compliant channels (Stripe or Razorpay). We hold no local financial credentials.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Late Retainer Suspension**: Delays in installment payments past 7 business days may lead to active code repository suspension.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 6 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            6. Disclaimers & Limitation of Liability
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Aarvitek Systems delivers high-performance code and branding guides engineered to meet strict modern security metrics. However, we do not claim:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>That third-party server hosting providers (e.g. AWS, Vercel, Netlify) will be 100% immune to all operational server downtimes.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Liability for sudden changes or deprecations of third-party system APIs (such as Shopify API upgrades, Google Map API changes, etc.) made post-handover.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 7 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            7. Governing Law
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            These Terms of Service and any digital contracts entered into with Aarvitek Systems are governed by and construed in accordance with the laws of **Delhi, India**, without regard to conflict of law principles. Any legal actions or proceedings must be initiated solely in competent courts located in Delhi, India.
                        </p>
                    </div>

                </div>

                {/* 3. Footer Return CTA */}
                <div className="text-center mt-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group font-semibold">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Return to Homepage
                    </Link>
                </div>

            </div>
        </div>
    );
}
