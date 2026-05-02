import type { Route } from "./+types/career";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Careers - Aarvitek Systems" },
        { name: "description", content: "Join our team of innovators and creators." },
    ];
}

export default function Career() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gradient-to-r from-orange-500 to-red-500 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
                    <p className="text-xl max-w-3xl mx-auto text-orange-100">
                        Build the future of technology with us. We are always looking for talented individuals.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Join Aarvitek?</h2>
                            <ul className="space-y-4">
                                {['Flexible remote work options', 'Competitive salary & equity', 'Continuous learning budget', 'Health & wellness benefits'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Culture</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                We foster a culture of curiosity, collaboration, and ownership. We believe in taking calculated risks and learning from failures.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Senior React Developer", type: "Full-time", loc: "Remote" },
                            { title: "UI/UX Designer", type: "Full-time", loc: "Hybrid" },
                            { title: "Backend Engineer (Node.js)", type: "Contract", loc: "Remote" }
                        ].map((job, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-500 transition-colors group">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                    <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span>{job.type}</span>
                                        <span>•</span>
                                        <span>{job.loc}</span>
                                    </div>
                                </div>
                                <Link to="/contact" className="mt-4 md:mt-0 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center">
                                    Apply Now
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
