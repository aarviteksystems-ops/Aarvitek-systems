import type { Route } from "./+types/agile-development";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Agile Development - How We Work | Aarvitek Systems" },
        { name: "description", content: "Iterative building with continuous feedback loops for software development." },
    ];
}

export default function AgileDevelopment() {
    return (
        <div className="pt-16 min-h-screen bg-[#000000] text-slate-300">
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-[100%] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                                <span className="text-sm font-medium text-blue-200 tracking-wide">Phase 02</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                                Agile <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Development</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                We utilize agile methodologies to build iteratively. This ensures continuous feedback loops, allowing us to adapt quickly and guarantee the final product perfectly aligns with your expectations and market demands.
                            </p>
                            <div className="pt-4 flex gap-4">
                                <Link to="/contact" className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]">Consult With Us</Link>
                                <Link to="/" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all">Back to Home</Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative z-10">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src="/images/agile-development.png" alt="Agile Software Development" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
