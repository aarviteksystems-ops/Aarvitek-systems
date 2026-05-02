import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="bg-[#050505] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Pre-Footer CTA */}
                <div className="relative rounded-[2rem] overflow-hidden mb-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 opacity-50"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
                    <div className="relative border border-white/10 bg-white/5 backdrop-blur-sm p-12 md:p-20 text-center rounded-[2rem]">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Let Aarvitek handle IT so you can <span className="text-purple-400">Scale Faster</span>.
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
                            We'll help you automate, build, and optimize your digital presence. Get back to what you do best—growing your business.
                        </p>
                        <Link to="/contact" className="inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                            Book a discovery call
                        </Link>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 px-4">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-3xl font-black tracking-tighter text-white mb-6 block">
                            AARVITEK
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Empowering businesses with innovative IT solutions. We craft digital experiences that drive growth and success.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Placeholders */}
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li><Link to="/web-development" className="text-slate-400 hover:text-white text-sm transition-colors">Web Development</Link></li>
                            <li><Link to="/website-design" className="text-slate-400 hover:text-white text-sm transition-colors">Website Design</Link></li>
                            <li><Link to="/graphic-design" className="text-slate-400 hover:text-white text-sm transition-colors">Graphic Design</Link></li>
                            <li><Link to="/ecommerce" className="text-slate-400 hover:text-white text-sm transition-colors">E-Commerce Solutions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link to="/portfolio" className="text-slate-400 hover:text-white text-sm transition-colors">Portfolio</Link></li>
                            <li><Link to="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>123 Tech Park, Innovation Street,<br />Digital City, DC 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href="mailto:info@aarvitek.com" className="hover:text-white transition-colors">info@aarvitek.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <svg className="w-5 h-5 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-8900</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
                    <p className="text-sm text-slate-500 text-center md:text-left">
                        © {new Date().getFullYear()} Aarvitek Systems. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-600">
                        Inspired by Xtract Framer
                    </p>
                </div>
            </div>
        </footer>
    );
}
