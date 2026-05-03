import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Aarvitek Systems - Intelligent IT & Automation" },
    { name: "description", content: "Empowering businesses with top-tier Web Development, AI Automation, and Design." },
  ];
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero section load animation
    gsap.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });

    // General sections reveal
    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    sections.forEach((sec) => {
      gsap.from(sec, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
        }
      });
    });

    // Logos staggered reveal
    gsap.from(".logo-item", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".logos-section",
        start: "top 90%"
      }
    });

    // Process cards
    gsap.from(".process-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 80%"
      }
    });

    // Benefit cards
    gsap.from(".benefit-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".benefits-section",
        start: "top 80%"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-purple-600/30 blur-[120px] rounded-[100%] pointer-events-none"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-[100%] pointer-events-none"></div>
        {/* Particle/Star Background (Static placeholder for css stars) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 hero-content">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
            <span className="text-sm font-medium text-purple-200 tracking-wide">New Digital Transformation Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Intelligent Automation<br/>for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Modern Businesses</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium">
            We specialize in crafting stunning websites, robust e-commerce platforms, and impactful tech solutions that drive growth and engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
              Get in touch
            </Link>
            <Link to="/web-development" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all">
              View services
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof (Logos) */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] logos-section reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 font-semibold tracking-widest uppercase mb-8">Trusted by innovatve companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-opacity duration-500">
            {/* Logo placeholders */}
            <h3 className="logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">Acme Corp</h3>
            <h3 className="logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">GlobalTech</h3>
            <h3 className="logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">Innovate</h3>
            <h3 className="logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">Stark Ind.</h3>
            <h3 className="logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">Wayne Ent.</h3>
          </div>
        </div>
      </section>

      {/* AI Services Z-Pattern */}
      <section className="py-24 lg:py-32 relative reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Tech Solutions</h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive IT infrastructure custom built for scale and efficiency.</p>
          </div>

          <div className="space-y-24">
            {/* Service 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
               <div className="w-full md:w-1/2">
                   <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors"></div>
                       <svg className="w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                   </div>
               </div>
               <div className="w-full md:w-1/2 space-y-6">
                   <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">Front-End & Back-End</div>
                   <h3 className="text-3xl md:text-4xl font-bold text-white">Full-Stack Web Development</h3>
                   <p className="text-slate-400 text-lg leading-relaxed">We build enterprise-grade, highly scalable web applications leveraging modern architectures. Performance optimization and clean code are at the heart of our engineering.</p>
                   <ul className="space-y-3">
                     {['React & Next.js Ecosystems', 'Node.js Microservices', 'High Performance & SEO'].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-slate-300">
                         <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                         {item}
                       </li>
                     ))}
                   </ul>
               </div>
            </div>

            {/* Service 2 (Reversed) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
               <div className="w-full md:w-1/2">
                   <div className="aspect-video bg-gradient-to-bl from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"></div>
                       <svg className="w-24 h-24 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   </div>
               </div>
               <div className="w-full md:w-1/2 space-y-6">
                   <div className="inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">UI/UX & Branding</div>
                   <h3 className="text-3xl md:text-4xl font-bold text-white">Digital Identity & Design</h3>
                   <p className="text-slate-400 text-lg leading-relaxed">Visually stunning and user-friendly designs that capture your brand essence and convert visitors into loyal customers through intuitive UX journeys.</p>
                   <Link to="/website-design" className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors group">
                     Explore our design portfolio 
                     <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                   </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-24 bg-[#050505] border-y border-white/5 process-section reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How we work</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "Smart Analyzing", desc: "Understanding your current architecture and future goals." },
               { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "Agile Development", desc: "Iterative building with continuous feedback loops." },
               { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Seamless Integration", desc: "Zero downtime deployment and systems syncing." },
               { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Continuous Optimization", desc: "Monitoring, maintenance, and future-proofing." },
             ].map((step, idx) => (
                <div key={idx} className="process-card bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}></path></svg>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">0{idx+1}. {step.title}</h3>
                   <p className="text-slate-400">{step.desc}</p>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Benefits Benthos Grid */}
      <section className="py-24 lg:py-32 benefits-section reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why upgrade with Aarvitek?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Large Card */}
             <div className="benefit-card md:col-span-2 bg-[#050505] border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-all rounded-full"></div>
                 <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Enhanced Productivity</h3>
                 <p className="text-slate-400 text-lg relative z-10 max-w-md">Automating repetitive manual tasks so your team can focus on complex, high-impact strategies.</p>
             </div>
             
             {/* Medium Cards */}
             <div className="benefit-card bg-[#050505] border border-white/10 rounded-3xl p-10">
                 <h3 className="text-xl font-bold text-white mb-4">Scalability</h3>
                 <p className="text-slate-400">Architecture built to handle massive traffic spikes without sweating.</p>
             </div>
             
             <div className="benefit-card bg-[#050505] border border-white/10 rounded-3xl p-10">
                 <h3 className="text-xl font-bold text-white mb-4">Cost Efficient</h3>
                 <p className="text-slate-400">Reduce manual labor and server costs through optimized tech stacks.</p>
             </div>
             
             <div className="benefit-card md:col-span-2 bg-[#050505] border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] group-hover:bg-indigo-500/30 transition-all rounded-full"></div>
                 <h3 className="text-2xl font-bold text-white mb-4 relative z-10">24/7 Availability</h3>
                 <p className="text-slate-400 text-lg relative z-10 max-w-md">Our systems run flawlessly around the clock, ensuring business continuity.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Placeholder */}
      <section className="py-24 bg-[#050505] border-y border-white/5 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
             <p className="text-slate-400">Tailored solutions for businesses of all sizes.</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "Custom", popular: false },
                { name: "Professional", price: "Custom", popular: true },
                { name: "Enterprise", price: "Custom", popular: false }
              ].map((tier, i) => (
                <div key={i} className={`rounded-3xl p-8 border ${tier.popular ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative' : 'border-white/10 bg-white/5'}`}>
                   {tier.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Popular</span>}
                   <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                   <div className="text-4xl font-black text-white mb-6">{tier.price}</div>
                   <ul className="space-y-4 mb-8">
                     {['Custom Development', 'Technical Support', 'Monthly Retainer'].map((f, idx) => (
                       <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                         <svg className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-purple-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                         {f}
                       </li>
                     ))}
                   </ul>
                   <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${tier.popular ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>Get a Quote</button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 reveal-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
             {[
               { q: "How long does a typical project take?", a: "Depending on scale, most initial MVP web applications take between 4 to 8 weeks to launch." },
               { q: "Do you provide ongoing support?", a: "Yes, we offer monthly maintenance retainers to keep systems updated, secure, and optimized." },
               { q: "What tech stacks do you specialize in?", a: "We primarily work with React, Next.js, Node.js, and modern CSS frameworks like Tailwind." }
             ].map((faq, i) => (
                <div key={i} className="border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                   <div className="flex justify-between items-center">
                     <h3 className="font-semibold text-white text-lg">{faq.q}</h3>
                     <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                   </div>
                   <p className="mt-4 text-slate-400 hidden group-hover:block transition-all">{faq.a}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
}
