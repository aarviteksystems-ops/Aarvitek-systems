import type { Route } from "./+types/director-message";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Message from the Director - Aarvitek Systems" },
        { name: "description", content: "Read a personal message from our Managing Director about Aarvitek Systems' commitment to technology, innovation, and digital transformation." },
    ];
}

export default function DirectorMessage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".director-animate", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative">
            {/* Background Lights */}
            <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff03_1px,_transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 director-animate">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                        <span className="text-xs font-semibold text-purple-200 tracking-wider uppercase">Leadership Vision</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        Message From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Director</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                        A personal note on our core values, technological commitment, and our shared journey toward digital excellence.
                    </p>
                </div>

                {/* Main Content Area: Portrait & Message */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 director-animate">

                    {/* Left Column: Portrait Card */}
                    <div className="lg:col-span-4 sticky top-28">
                        <div className="relative group rounded-3xl p-[1px] overflow-hidden bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all duration-500 shadow-xl">
                            {/* Portrait Background blur element */}
                            <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_30%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-700"></div>

                            <div className="relative bg-[#070707] rounded-[23px] p-6 z-10 flex flex-col items-center text-center">
                                {/* Photo frame */}
                                <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl mb-6 relative group/photo">
                                    <img
                                        src="/images/aarvind-kumaar-sinha.jpg"
                                        alt="Aarvind Kumaar Sinha - Managing Director"
                                        className="w-full h-full object-cover grayscale group-hover/photo:grayscale-0 transition-all duration-500 transform group-hover/photo:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent mix-blend-overlay"></div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-1">Aarvind Kumaar Sinha</h2>
                                <p className="text-sm font-semibold text-purple-400 mb-4">Founder & Managing Director</p>

                                <div className="w-full border-t border-white/5 pt-4 mb-6">
                                    <p className="text-xs text-slate-500 italic">"Technology is not just about solving today's problems; it is about building the foundation for tomorrow's possibilities."</p>
                                </div>

                                <div className="flex space-x-3">
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                    <a
                                        href="mailto:aarvind@aarvitek.com"
                                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Message Content */}
                    <div className="lg:col-span-8 space-y-8 bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                        <div className="space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
                            <p className="font-semibold text-white text-xl md:text-2xl border-b border-purple-500/20 pb-4">
                                Welcome to Aarvitek Systems,
                            </p>
                            <p>
                                At Aarvitek Systems, our core philosophy is simple yet powerful: <strong className="text-white">innovation should be purposeful and accessible</strong>. When we founded Aarvitek Systems, we saw a gap in the tech ecosystem—many growing businesses and startups struggled to access high-performance, custom-tailored enterprise-grade technology without prohibitive costs. We set out to change that dynamic.
                            </p>
                            <p>
                                In today's hyper-connected world, a website, an e-commerce storefront, or an internal automation system is no longer just a digital placeholder. It is the primary engine of growth, customer trust, and operational speed. That is why our team of engineers, designers, and strategists are committed to producing nothing short of digital excellence. We design modern UI/UX workflows, build performant full-stack apps using bleeding-edge tools like Next.js, and deploy robust APIs designed to scale flawlessly under pressure.
                            </p>
                            <blockquote className="border-l-4 border-purple-500 pl-6 my-8 italic text-slate-400 bg-white/[0.02] py-4 pr-4 rounded-r-xl">
                                "Our mission is to stand by our clients as strategic tech partners, turning complex engineering hurdles into clean, scalable, and highly profitable digital opportunities."
                            </blockquote>
                            <p>
                                What makes Aarvitek unique is not just the code we write, but the partnerships we cultivate. We dive deep into understanding our clients' business workflows, target demographics, and pain points before we lay down the first line of code. We believe in absolute transparency, absolute performance, and robust security.
                            </p>
                            <p>
                                Thank you for trusting us with your vision. Whether you are launching a new startup, modernizing an established brand, or streamlining operations, Aarvitek Systems is here to guide and accelerate your digital journey.
                            </p>
                            <p className="pt-4">
                                Sincerely,
                            </p>
                        </div>

                        {/* Signature Block */}
                        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div>
                                {/* A styled handwriting signature mockup */}
                                <p className="font-serif text-2xl text-purple-400 tracking-wide font-bold italic select-none">
                                    Aarvind Kumaar Sinha
                                </p>
                                <p className="text-sm font-semibold text-white mt-2">Aarvind Kumaar Sinha</p>
                                <p className="text-xs text-slate-500">Managing Director, Aarvitek Systems</p>
                            </div>
                            <div>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                                >
                                    <span>Connect with us</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Leadership Principles Grid */}
                <div className="director-animate">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Leadership Principles</h3>
                        <p className="text-sm text-slate-400">The guiding values our director installs across all operations and development teams.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "1. Relentless Innovation",
                                desc: "Constantly pushing tech stacks, performance boundaries, and UI/UX ideas to keep our clients ahead of their competition."
                            },
                            {
                                title: "2. Absolute Integrity",
                                desc: "No opaque pricing, no vendor lock-ins, and complete clarity of codebase ownership. We build trust by delivering clean, maintainable code."
                            },
                            {
                                title: "3. Scalable Execution",
                                desc: "Building architectures that grow with your user base. We engineering with high availability, low latency, and robust security in mind."
                            }
                        ].map((principle, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300"
                            >
                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    {principle.title}
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {principle.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
