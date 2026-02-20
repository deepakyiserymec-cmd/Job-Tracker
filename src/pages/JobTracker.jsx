import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Search, Filter, MoreHorizontal, Calendar, MapPin, Briefcase, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobTracker = () => {
    const { jobs, addJob, deleteJob, setSelectedJobId } = useApp();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [newJob, setNewJob] = useState({
        company: '', role: '', location: '', type: 'Full-time', status: 'Saved', date: new Date().toISOString().split('T')[0], jd: ''
    });

    const statuses = ['All', 'Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || job.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addJob(newJob);
        setIsModalOpen(false);
        setNewJob({ company: '', role: '', location: '', type: 'Full-time', status: 'Saved', date: new Date().toISOString().split('T')[0], jd: '' });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Applications</h1>
                    <p className="text-text-muted">Track and manage your career opportunities</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary h-12 px-6"
                >
                    <Plus size={20} />
                    Add Application
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                    <input
                        type="text"
                        placeholder="Search by company or role..."
                        className="input pl-10 h-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`btn whitespace-nowrap px-4 h-12 ${filterStatus === status ? 'btn-primary' : 'btn-secondary'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job) => (
                        <motion.div
                            layout
                            key={job.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card p-6 group hover:border-primary/50 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl font-bold group-hover:bg-primary/10 transition-colors">
                                    {job.company[0]}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-text-dim hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="p-2 hover:bg-danger/10 rounded-lg text-text-dim hover:text-danger transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1">{job.role}</h3>
                            <p className="text-primary font-medium mb-4">{job.company}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <MapPin size={14} />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Calendar size={14} />
                                    {job.date}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Briefcase size={14} />
                                    {job.type}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${job.status === 'Interview' ? 'bg-warning/20 text-warning' :
                                        job.status === 'Offer' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'
                                    }`}>
                                    {job.status}
                                </span>
                                <button
                                    onClick={() => {
                                        setSelectedJobId(job.id);
                                        navigate('/prep');
                                    }}
                                    className="text-xs font-semibold text-text-muted hover:text-primary transition-colors"
                                >
                                    Prepare Now →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card w-full max-w-lg p-8"
                    >
                        <h2 className="text-2xl mb-6">Add New Application</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="input-group">
                                    <label className="label">Company Name</label>
                                    <input required value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} className="input" placeholder="Google" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Job Role</label>
                                    <input required value={newJob.role} onChange={(e) => setNewJob({ ...newJob, role: e.target.value })} className="input" placeholder="Frontend Developer" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="input-group">
                                    <label className="label">Location</label>
                                    <input value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="input" placeholder="Remote/New York" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Job Type</label>
                                    <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} className="input bg-bg-dark">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="input-group">
                                    <label className="label">Date Applied</label>
                                    <input type="date" value={newJob.date} onChange={(e) => setNewJob({ ...newJob, date: e.target.value })} className="input" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Status</label>
                                    <select value={newJob.status} onChange={(e) => setNewJob({ ...newJob, status: e.target.value })} className="input bg-bg-dark">
                                        <option>Saved</option>
                                        <option>Applied</option>
                                        <option>Interview</option>
                                        <option>Offer</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="label">Job Description (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={newJob.jd}
                                    onChange={(e) => setNewJob({ ...newJob, jd: e.target.value })}
                                    className="input py-2"
                                    placeholder="Paste JD here for AI analysis..."
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary flex-grow">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-grow">Add Application</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default JobTracker;
