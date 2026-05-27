import type { Route } from "./+types/location-detail";
import { Link, useParams } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CityData {
    slug: string;
    name: string;
    headline: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    highlight: string;
    stats: { label: string; value: string }[];
    serviceFocus: string;
    faqs: { q: string; a: string }[];
}

const CITIES_DATA: Record<string, CityData> = {
    bangalore: {
        slug: "bangalore",
        name: "Bangalore",
        metaTitle: "Web Development & IT Solutions in Bangalore - Aarvitek Systems",
        metaDescription: "Scale your startup or enterprise with expert web development, mobile-responsive design, and cloud systems in Bangalore. India's Silicon Valley.",
        headline: "Scale Your Technology in India's Silicon Valley",
        subtitle: "From Koramangala and Indiranagar startups to Whitefield and Electronic City enterprises, we build world-class web applications, robust e-commerce setups, and custom digital experiences.",
        highlight: "Tech & Startups Hub",
        stats: [
            { label: "Tech Partners", value: "25+" },
            { label: "Local Engineers", value: "15+" },
            { label: "Average Launch Time", value: "4 Weeks" }
        ],
        serviceFocus: "Bangalore's fast-paced tech ecosystem demands high-performance, scalable web systems. We specialize in custom React/Node.js stacks, high-performance e-commerce portals, and modern UI/UX design that stands out in the competitive startup market. We optimize codebases for speed, cloud architecture, and smooth user journeys.",
        faqs: [
            {
                q: "Do you offer on-site meetings for Bangalore businesses?",
                a: "Yes! We can arrange face-to-face consultations and scoping sessions at your offices in locations like Whitefield, Indiranagar, or HSR Layout to kick off your project."
            },
            {
                q: "What technologies do you specialize in for Bangalore startups?",
                a: "We work with modern, scalable stacks including Next.js, React, Node.js, PostgreSQL, and AWS, ensuring your platform is ready to scale alongside your user base."
            }
        ]
    },
    mumbai: {
        slug: "mumbai",
        name: "Mumbai",
        metaTitle: "Enterprise Web Systems & E-Commerce in Mumbai - Aarvitek Systems",
        metaDescription: "Deploy secure, enterprise-grade web applications, corporate branding, and scalable e-commerce systems tailored for businesses in Mumbai, India's financial capital.",
        headline: "Enterprise-Grade Digital Solutions for India's Financial Capital",
        subtitle: "Powering corporate brands, financial services, and retail giants in Bandra-Kurla Complex (BKC), Nariman Point, and Andheri with secure, high-traffic web architectures.",
        highlight: "Enterprise & Commerce Hub",
        stats: [
            { label: "Corporate Clients", value: "18+" },
            { label: "Uptime SLA Guarantee", value: "99.99%" },
            { label: "Security Audited", value: "100%" }
        ],
        serviceFocus: "In Mumbai, security, reliability, and transaction volume are paramount. We deliver secure payment gateway integrations, compliance-ready financial portals, and robust enterprise applications designed to handle millions of requests without dropping a frame.",
        faqs: [
            {
                q: "Can you design enterprise portals compliant with security standards?",
                a: "Absolutely. We build all enterprise solutions with secure-by-design principles, implementing robust encryption, session management, and strict access controls."
            },
            {
                q: "What is your support lifecycle for Mumbai corporates?",
                a: "We provide comprehensive service-level agreements (SLAs) including 24/7 server monitoring, regular dependency updates, and rapid bug resolution."
            }
        ]
    },
    delhi: {
        slug: "delhi",
        name: "Delhi NCR",
        metaTitle: "Custom Web Solutions & Branding in Delhi NCR - Aarvitek Systems",
        metaDescription: "Maximize search presence and client conversions with premium web design, SEO, and corporate graphics in Delhi, Gurgaon, and Noida.",
        headline: "Grow Your Brand Presence in the Capital Region",
        subtitle: "Helping premium brands, retail businesses, and fast-growing services in Connaught Place, Gurgaon Cyber City, and Noida Sector 62 capture regional markets with high-conversion web designs.",
        highlight: "Corporate & Brand Hub",
        stats: [
            { label: "Local Brands Scaled", value: "30+" },
            { label: "SEO Traffic Growth", value: "150%+" },
            { label: "Design Awards", value: "3" }
        ],
        serviceFocus: "Delhi NCR's competitive landscape requires highly optimized search presence and conversion-focused designs. We craft bespoke graphics, search-optimized web architectures, and lead-generation funnels that turn searchers into local customers.",
        faqs: [
            {
                q: "Do you specialize in local SEO for Delhi NCR?",
                a: "Yes, we integrate Schema markups, local listings, and geo-targeted keywords into your web architecture so your business ranks high for local search intents."
            },
            {
                q: "What is your average timeline for corporate site design?",
                a: "Corporate website design and development typically ranges between 3 to 6 weeks, depending on content structure and customized graphics requirements."
            }
        ]
    },
    hyderabad: {
        slug: "hyderabad",
        name: "Hyderabad",
        metaTitle: "SaaS Web Development & IT Services in Hyderabad - Aarvitek Systems",
        metaDescription: "Accelerate your SaaS growth and corporate systems with high-performance web engineering and interactive design in Hyderabad, Cyberabad.",
        headline: "Accelerating Innovation in Cyberabad",
        subtitle: "Custom SaaS dashboards, API integrations, and robust cloud applications built for tech companies and healthcare leaders in HITEC City and Gachibowli.",
        highlight: "SaaS & Biotech Hub",
        stats: [
            { label: "SaaS Platforms", value: "12" },
            { label: "API Integrations", value: "200+" },
            { label: "Agile Sprints Done", value: "500+" }
        ],
        serviceFocus: "Hyderabad is a major SaaS and technology hub. We build secure multi-tenant dashboard architectures, automate workflows with custom APIs, and implement real-time analytics panels that power modern cloud services.",
        faqs: [
            {
                q: "Do you build multi-tenant SaaS dashboards?",
                a: "Yes, we have deep experience designing secure multi-tenant database layouts and user authentication models (RBAC) to ensure client data isolation."
            },
            {
                q: "How do you handle API documentation and handoff?",
                a: "We write clean, OpenAPI-compliant documentation (Swagger) for all custom APIs we build, making front-end and third-party integrations simple."
            }
        ]
    },
    pune: {
        slug: "pune",
        name: "Pune",
        metaTitle: "Creative UI/UX Design & Web Systems in Pune - Aarvitek Systems",
        metaDescription: "Modern web portals, industrial product sites, and digital marketing systems engineered for Pune's manufacturing and tech sectors.",
        headline: "Engineering Excellence in India's Motor & Tech Hub",
        subtitle: "From Hinjewadi IT parks to Hadapsar industrial zones, we design conversion-driven websites, custom product catalogs, and creative branding.",
        highlight: "Industrial & Education Hub",
        stats: [
            { label: "Industrial Partners", value: "14+" },
            { label: "UI/UX Prototypes", value: "80+" },
            { label: "Support Resolution", value: "99.2%" }
        ],
        serviceFocus: "Pune blends academic depth with industrial strength. We construct high-end corporate websites, complex catalog portals, and specialized product showcases that communicate quality and engineering precision.",
        faqs: [
            {
                q: "Can you rebuild our legacy industrial catalog site?",
                a: "Yes, we modernize slow, legacy websites into fast, responsive web systems that allow visitors to filter and search catalogs instantly."
            },
            {
                q: "Do you design complete brand identity kits?",
                a: "We offer complete graphic design packages including logos, brand books, collateral, and marketing presentation decks."
            }
        ]
    },
    chennai: {
        slug: "chennai",
        name: "Chennai",
        metaTitle: "SaaS Platform Engineering & Web Portals in Chennai - Aarvitek Systems",
        metaDescription: "Premium web platforms, enterprise software UI, and creative video marketing solutions for Chennai's tech and automotive leaders.",
        headline: "Robust Digital Architecture for India's SaaS Capital",
        subtitle: "Designing high-performance web systems and engaging video production for SaaS startups and enterprise leaders in OMR and T-Nagar.",
        highlight: "SaaS & Automotive Hub",
        stats: [
            { label: "OMR Tech Clients", value: "15+" },
            { label: "Video Projects Done", value: "40+" },
            { label: "Code Quality Rating", value: "98.7%" }
        ],
        serviceFocus: "Chennai is a global SaaS export powerhouse. We design elegant, developer-friendly interface structures, construct robust backend integrations, and offer high-end video editing and digital marketing assets for SaaS product launches.",
        faqs: [
            {
                q: "What kind of video editing services do you provide for SaaS?",
                a: "We produce product feature walkthroughs, social media ads, case study highlight reels, and clean corporate explainer videos."
            },
            {
                q: "Do you optimize platforms for global traffic?",
                a: "Yes, we implement edge caching, content delivery networks (CDNs), and asset compression so your web app loads fast from any global location."
            }
        ]
    }
};

export function loader({ params }: Route.LoaderArgs) {
    const citySlug = params.city?.toLowerCase() || "";
    const city = CITIES_DATA[citySlug];
    if (!city) {
        throw new Response("City Not Found", { status: 404 });
    }
    return { city };
}

import { generateMeta, generateJsonLd, getBreadcrumbSchema } from "../utils/seo-config";

export function meta({ data }: Route.MetaArgs) {
    if (!data || !data.city) {
        return [{ title: "City Not Found - Aarvitek Systems" }];
    }
    
    const urlPath = `/locations/${data.city.slug}`;
    const faqs = data.city.faqs.map((f: any) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
        }
    }));

    return [
        ...generateMeta({
            title: data.city.metaTitle,
            description: data.city.metaDescription,
            url: urlPath,
        }),
        generateJsonLd({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Aarvitek Systems ${data.city.name}`,
            "image": "https://aarviteksystems.com/images/og-image.png",
            "url": `https://aarviteksystems.com${urlPath}`,
            "telephone": "+91 787 090 1336",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": data.city.name,
                "addressCountry": "IN"
            }
        }),
        generateJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Locations", item: "/locations" },
            { name: data.city.name, item: urlPath }
        ]))
    ];
}

export default function LocationDetail({ loaderData }: Route.ComponentProps) {
    const { city } = loaderData;
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".detail-fade-in", {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative">
            {/* Background Light Glows */}
            <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back Link */}
                <div className="mb-8 detail-fade-in">
                    <Link
                        to="/locations"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Locations
                    </Link>
                </div>

                {/* Hero / Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <div className="lg:col-span-7 space-y-6 detail-fade-in">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                            {city.highlight}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                            {city.headline}
                        </h1>
                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                            {city.subtitle}
                        </p>

                        {/* Localized stats grid */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                            {city.stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                                    <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 detail-fade-in">
                        <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#070707] p-1.5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                            <img
                                src="/images/location_hero_bg.png"
                                alt={`${city.name} business digital hub`}
                                className="rounded-xl w-full object-cover aspect-[4/3] opacity-90 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Regional Technology Center</span>
                                <h3 className="text-lg font-bold text-white mt-1">{city.name} Office</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Focus Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16 border-t border-b border-white/5 mb-24 detail-fade-in">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Localized Service Focus</h2>
                        <p className="text-xs text-slate-500 mt-2">Tailoring software, architecture, and marketing assets for specific hub demands.</p>
                    </div>
                    <div className="lg:col-span-2">
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {city.serviceFocus}
                        </p>
                    </div>
                </div>

                {/* FAQ / Q&A Section */}
                <div className="max-w-3xl mx-auto mb-24 detail-fade-in">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {city.faqs.map((faq, idx) => (
                            <div key={idx} className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                                <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA Section */}
                <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#0c051a]/80 to-[#04010a]/80 backdrop-blur-md detail-fade-in shadow-2xl relative overflow-hidden">
                    <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-black text-white">Let's Discuss Your {city.name} Project</h2>
                        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
                            Arrange an online strategy call or meet with our engineers. We provide optimized solutions matching regional client demands.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/contact"
                                className="inline-block px-8 py-3.5 rounded-full bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
