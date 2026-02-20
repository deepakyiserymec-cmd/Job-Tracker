import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle2, FileText, TrendingUp, Clock, Target, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { jobs, user } = useApp();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Applications', value: jobs.length, icon: Briefcase, color: 'var(--primary)' },
        { label: 'Interviews scheduled', value: jobs.filter(j => j.status === 'Interview').length, icon: Clock, color: 'var(--warning)' },
        { label: 'Offers Received', value: jobs.filter(j => j.status === 'Offer').length, icon: CheckCircle2, color: 'var(--success)' },
        { label: 'Avg Readiness', value: '72%', icon: Target, color: 'var(--accent)' },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10 text-center">
                <h1 className="text-4xl mb-2 font-bold">Welcome back, {user?.name || 'User'}</h1>
                <p className="text-text-muted">You have {jobs.filter(j => j.status === 'Applied').length} active applications this week.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                            >
                                <stat.icon size={24} />
                            </div>
                            <span className="text-success text-xs font-bold">+12%</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl">Recent Applications</h2>
                        <button className="btn btn-ghost text-xs">View All</button>
                    </div>
                    <div className="space-y-4">
                        {jobs.slice(0, 4).map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-bg-dark flex items-center justify-center text-lg font-bold">
                                        {job.company[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">{job.role}</h4>
                                        <p className="text-xs text-text-muted">{job.company} • {job.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.status === 'Interview' ? 'bg-warning/20 text-warning' :
                                        job.status === 'Offer' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'
                                        }`}>
                                        {job.status}
                                    </span>
                                    <p className="text-xs text-text-muted font-medium">{job.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-xl mb-8">Quick Actions</h2>
                    <div className="space-y-4">
                        <button onClick={() => navigate('/jobs')} className="w-full btn btn-primary flex justify-start gap-3 p-4">
                            <Briefcase size={18} />
                            <div className="text-left">
                                <p className="text-sm font-semibold">Add New Job</p>
                                <p className="text-[10px] opacity-70">Track your application</p>
                            </div>
                        </button>
                        <button onClick={() => navigate('/prep')} className="w-full btn btn-secondary flex justify-start gap-3 p-4">
                            <GraduationCap size={18} />
                            <div className="text-left">
                                <p className="text-sm font-semibold">Start Preparation</p>
                                <p className="text-[10px] opacity-70">Analyze JD & Prep</p>
                            </div>
                        </button>
                        <button onClick={() => navigate('/resume')} className="w-full btn btn-secondary flex justify-start gap-3 p-4">
                            <FileText size={18} />
                            <div className="text-left">
                                <p className="text-sm font-semibold">Optimize Resume</p>
                                <p className="text-[10px] opacity-70">Improve ATS score</p>
                            </div>
                        </button>
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <TrendingUp size={16} className="text-primary" />
                            Pro Tip
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed">
                            Tailoring your resume to the job description can increase your ATS score by up to 45%. Try the AI Optimizer!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
