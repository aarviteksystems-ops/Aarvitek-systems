import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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
          {/* Brand Logo */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-white font-black text-2xl">A</span>
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Aarvitek <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Systems</span>
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
            <span className="text-sm font-medium text-purple-200 tracking-wide">New Digital Transformation Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Intelligent Automation<br />for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Modern Businesses</span>
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
      <section id="clients" className="py-12 border-y border-white/5 bg-white/[0.02] logos-section reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 font-semibold tracking-widest uppercase mb-8">Trusted by innovative companies worldwide</p>
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
      <section id="services" className="py-24 lg:py-32 relative reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Custom Web Development & Tech Solutions</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive IT infrastructure and custom web development services built for scale, performance, and business efficiency.</p>
          </div>

          <div className="space-y-24">
            {/* Service 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors z-10"></div>
                  <img src="/images/web-development.png" alt="Full-Stack Custom Web Development Services" className="w-full h-full object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">Front-End & Back-End</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Full-Stack Web Development</h3>
                <p className="text-slate-400 text-lg leading-relaxed">We build enterprise-grade, highly scalable custom web applications leveraging modern architectures. Performance optimization, clean code, and advanced SEO best practices are at the heart of our engineering process.</p>
                <ul className="space-y-3">
                  {['React, Next.js & WordPress', 'Node.js Microservices', 'High Performance & SEO'].map((item, i) => (
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
                  <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors z-10"></div>
                  <img src="/images/ui-ux-design.png" alt="Responsive UI/UX Digital Branding and Design" className="w-full h-full object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">UI/UX & Branding</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Digital Identity & UX Design</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Visually stunning, responsive, and user-friendly digital experiences that capture your brand essence. We design intuitive UI/UX journeys aimed at maximizing conversion rates and user retention.</p>
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
      <section id="process" className="py-24 bg-[#050505] border-y border-white/5 process-section reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How we work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "Smart Analyzing", desc: "Understanding your current architecture and future goals.", link: "/smart-analyzing" },
              { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "Agile Development", desc: "Iterative building with continuous feedback loops.", link: "/agile-development" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Seamless Integration", desc: "Zero downtime deployment and systems syncing.", link: "/seamless-integration" },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Continuous Optimization", desc: "Monitoring, maintenance, and future-proofing.", link: "/continuous-optimization" },
            ].map((step, idx) => (
              <div key={idx} className="process-card">
                <div className="relative group rounded-2xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent">
                  {/* Animated gradient border */}
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"></div>

                  <Link to={step.link} className="relative block h-full bg-[#0a0a0a] rounded-[15px] p-8 z-10 cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10 transition-transform duration-300 group-hover:rotate-12 group-hover:bg-white/20">
                      <svg className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">0{idx + 1}. {step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </Link>
                </div>
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
            <div className="benefit-card md:col-span-2">
              <Link to="/enhanced-productivity" className="block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"></div>
                <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-all rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-purple-300 transition-colors">Enhanced Productivity</h3>
                  <p className="text-slate-400 text-lg relative z-10 max-w-md">Automating repetitive manual tasks so your team can focus on complex, high-impact strategies.</p>
                </div>
              </Link>
            </div>

            {/* Medium Cards */}
            <div className="benefit-card">
              <Link to="/scalability" className="block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"></div>
                <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Scalability</h3>
                  <p className="text-slate-400">Architecture built to handle massive traffic spikes without sweating.</p>
                </div>
              </Link>
            </div>

            <div className="benefit-card">
              <Link to="/cost-efficient" className="block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"></div>
                <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Cost Efficient</h3>
                  <p className="text-slate-400">Reduce manual labor and server costs through optimized tech stacks.</p>
                </div>
              </Link>
            </div>

            <div className="benefit-card md:col-span-2">
              <Link to="/availability" className="block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#6366f1_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"></div>
                <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] group-hover:bg-indigo-500/30 transition-all rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-indigo-300 transition-colors">24/7 Availability</h3>
                  <p className="text-slate-400 text-lg relative z-10 max-w-md">Our systems run flawlessly around the clock, ensuring business continuity.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Placeholder */}
      <section id="pricing" className="py-24 bg-[#050505] border-y border-white/5 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transparent Web Development Packages</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Affordable, high-performance IT solutions and custom pricing plans designed for Indian startups and growing businesses.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter Business",
                price: "₹4,999",
                desc: "Perfect for establishing a strong, professional digital presence.",
                popular: false,
                features: ["5 Page Responsive Website", "Essential SEO Setup", "Contact Form & Integrations", "Mobile-First UI/UX", "1 Year Domain & Hosting Free"]
              },
              {
                name: "Pro E-Commerce",
                price: "₹14,999",
                desc: "Robust full-stack platforms designed to drive online sales and scale.",
                popular: true,
                features: ["React/Next.js Architecture", "Payment Gateway Integration", "Custom Admin Dashboard", "Advanced SEO Optimization", "High Performance & Speed Setup"]
              },
              {
                name: "Enterprise Custom",
                price: "Custom",
                desc: "Complex architectures and AI integrations for large-scale operations.",
                popular: false,
                features: ["Custom Software & SaaS", "AI Automation Integrations", "Dedicated Cloud Infrastructure", "24/7 Priority Support", "Monthly Maintenance Retainer"]
              }
            ].map((tier, i) => (
              <div key={i} className="relative group">
                <div className={`relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform ${tier.popular ? 'lg:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.2)]' : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]'} h-full bg-white/5 border border-white/5 hover:border-transparent`}>

                  {/* Gradient Border Layer */}
                  <div className={`absolute inset-[-150%] ${tier.popular ? 'bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-100 animate-[spin_3s_linear_infinite]' : 'bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite]'} transition-opacity duration-500`}></div>

                  {/* Content Layer */}
                  <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-8 z-10 flex flex-col overflow-hidden">
                    {tier.popular && (
                      <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/30 blur-[40px] rounded-full pointer-events-none"></div>
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-b-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">Most Popular</span>
                      </>
                    )}

                    <h3 className={`text-2xl font-bold text-white mb-2 ${tier.popular ? 'pt-4' : ''}`}>{tier.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 h-10">{tier.desc}</p>

                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-slate-500 text-sm font-medium">/ starting</span>}
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                          <svg className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400 transition-colors'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" className={`block text-center w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${tier.popular ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      {tier.price === "Custom" ? "Book a call" : "Get Started"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 lg:py-32 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to know about our web development process, pricing, and ongoing support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">
            {/* Column 1 */}
            <div className="space-y-6">
              {[
                { q: "How long does it take to build a custom website?", a: "A standard 5-page responsive website takes about 2-4 weeks. Complex e-commerce platforms or custom SaaS applications can take 8-16 weeks depending on requirements." },
                { q: "What is the cost of developing an e-commerce website?", a: "E-commerce platforms start at ₹14,999. The final cost depends on the number of products, custom features, payment gateways, and third-party integrations you need." },
                { q: "Do you provide ongoing website maintenance?", a: "Yes, we offer monthly maintenance retainers. This covers security updates, performance monitoring, regular backups, and content updates to ensure your site runs flawlessly." },
                { q: "Will my website be mobile-friendly and SEO optimized?", a: "Absolutely. All our websites are built with a mobile-first approach and include fundamental technical SEO setup, ensuring your site ranks well and looks great on all devices." },
                { q: "What technologies do you use for development?", a: "We specialize in modern, high-performance tech stacks including React, Next.js, Node.js, Tailwind CSS, WordPress, and various headless CMS platforms." }
              ].map((faq, i) => (
                <details key={i} className="group border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-semibold text-white text-lg outline-none list-none">
                    {faq.q}
                    <span className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-400 leading-relaxed pr-8 animate-[fadeIn_0.3s_ease-in-out]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {[
                { q: "Can you redesign an existing website?", a: "Yes! We frequently help brands modernize their digital presence. We analyze your current architecture, preserve your SEO rankings, and deliver a stunning new UI/UX." },
                { q: "Who owns the code and the website once it is finished?", a: "You do. Once the project is fully paid for and completed, we hand over all source code, design assets, and administrative access to you." },
                { q: "Do you handle web hosting and domain registration?", a: "Yes, our starter packages include 1-year free domain registration and hosting. We can also help migrate your site to scalable cloud providers like AWS or Vercel." },
                { q: "How do we communicate during the project?", a: "We maintain transparent communication via email, weekly video calls, and dedicated WhatsApp/Slack channels so you are always updated on our progress." },
                { q: "What if I need custom features added later?", a: "Our architectures are highly scalable. We can easily integrate new features, API connections, or additional pages down the line as your business grows." }
              ].map((faq, i) => (
                <details key={i} className="group border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-semibold text-white text-lg outline-none list-none">
                    {faq.q}
                    <span className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-400 leading-relaxed pr-8 animate-[fadeIn_0.3s_ease-in-out]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
