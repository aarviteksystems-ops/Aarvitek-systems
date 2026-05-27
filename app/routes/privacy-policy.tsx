import type { Route } from "./+types/privacy-policy";
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
            title: "Privacy Policy & Data Protection | Aarvitek Systems",
            description: "Learn how Aarvitek Systems safeguards your personal details, cookies, and business intellectual property on our high-performance IT and custom web development systems.",
            url: "/privacy-policy",
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Privacy Policy", item: "/privacy-policy" }
        ]))
    ];
}

export default function PrivacyPolicy() {
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
            <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

            {/* Content Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in-animate">
                
                {/* 1. Header Hero section */}
                <div className="text-center pt-12 pb-16 space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-4">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                        Privacy Policy & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                            Data Protection
                        </span>
                    </h1>

                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Last Updated: May 19, 2026. At Aarvitek Systems, your digital privacy and business intellectual property security are foundational to our engineering values.
                    </p>
                </div>

                {/* 2. Main Content Card */}
                <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-16 shadow-2xl overflow-hidden space-y-12">
                    
                    {/* Corner Ambient light */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            When you browse our website, request a custom software design consult, or book a discovery call, we collect information that helps us serve you. This includes:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Contact Details**: Your name, corporate email address, phone number, and company name.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Usage & Device Data**: IP addresses, browser types, screen specifications, and page interaction flows collected via secure analytics.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>**Payment Details**: All transaction pipelines are handled by compliant, third-party payment gateways (Stripe & Razorpay); no raw card credentials are saved on our servers.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            2. How We Process Your Data
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Aarvitek Systems utilizes data solely to improve your technical systems integration and keep communication lines clear. We process personal and corporate details to:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Architect bespoke, custom web applications and full-stack software codes.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Deliver precise responsive website mockups, print vectors, and store catalogs.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Improve Core Web Vitals performance, security layers, and SEO search results.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Maintain transparent agile sprint scheduling and priority serverless deployments.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            3. Data Security & Encrypted Clouds
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Your personal data is encrypted both in transit (using robust Secure Socket Layers - SSL) and at rest. We house all digital storage configurations inside scalable, serverless AWS Cloud setups protected by automated IAM rules and DDoS resistant firewall routing protocols. 
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            While we deploy industry-standard security architectures, no system is completely immune to risks. We perform regular security audits to identify and patch system flaws immediately.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            4. Your Data Protection Rights
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            We support international data regulation rights, including the European Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You hold full authority to:
                        </p>
                        <ul className="space-y-2 pl-4 text-slate-300">
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Request complete digital copies of all personal details saved in our databases.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Amend, correct, or refine outdated corporate accounts and listings.</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Request full deletion of all customer files (the "Right to be Forgotten").</span>
                            </li>
                            <li className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span>Object to data processing for marketing, metrics reporting, and newsletters.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            5. Cookies & Tracking Frameworks
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Our platform utilizes cookies to enhance loading speed and preserve user settings. We run essential operational cookies (e.g., Stripe transaction cookies) and statistical analytics cookies (e.g., Google Analytics). You can manage or block cookies directly via your browser settings, although some interactive features may scale back as a result.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                            6. Reaching Out to Aarvitek
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            If you have specific questions regarding this Privacy Policy, your saved data profiles, or secure repository hosting methods, please reach out to our primary data officer:
                        </p>
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] inline-block space-y-2 mt-2">
                            <span className="block text-white font-bold">Aarvitek Systems Data Compliance Team</span>
                            <span className="block text-sm text-slate-400">New Delhi, India</span>
                            <a href="mailto:aarvitexsystems@gmail.com" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">aarvitexsystems@gmail.com</a>
                            <a href="tel:+917870901336" className="block text-sm text-slate-400 hover:text-white transition-colors">+91 787 090 1336</a>
                        </div>
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
