import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, Trash2, Download, CheckCircle, AlertTriangle, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

const ResumeBuilder = () => {
    const { user, setUser, selectedJob } = useApp();
    const [step, setStep] = useState(1);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [atsScore, setAtsScore] = useState(0);

    const calculateAtsScore = () => {
        if (!selectedJob) return 0;
        const jdSkills = (selectedJob.skills || ['React', 'JavaScript', 'Node.js', 'System Design']).map(s => s.toLowerCase());
        const userSkills = (user.skills || []).map(s => s.toLowerCase());
        const matches = jdSkills.filter(s => userSkills.includes(s));
        return Math.round((matches.length / jdSkills.length) * 100);
    };

    useEffect(() => {
        setAtsScore(calculateAtsScore());
    }, [user, selectedJob]);

    const handleUserChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };

    const handleArrayChange = (field, index, subfield, value) => {
        const newArr = [...user[field]];
        newArr[index][subfield] = value;
        setUser({ ...user, [field]: newArr });
    };

    const addItem = (field, emptyItem) => {
        setUser({ ...user, [field]: [...user[field], emptyItem] });
    };

    const removeItem = (field, index) => {
        const newArr = user[field].filter((_, i) => i !== index);
        setUser({ ...user, [field]: newArr });
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const margin = 20;
        let y = 30;

        doc.setFontSize(22);
        doc.text(user.name || 'Full Name', margin, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(`${user.role || 'Job Title'} | ${user.email || 'email@example.com'}`, margin, y);
        y += 15;

        doc.setFontSize(16);
        doc.text('Experience', margin, y);
        y += 10;
        doc.setFontSize(10);
        user.experience.forEach(exp => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${exp.company} - ${exp.role}`, margin, y);
            y += 5;
            doc.setFont('helvetica', 'normal');
            doc.text(exp.duration, margin, y);
            y += 10;
        });

        doc.save(`${user.name || 'Resume'}_JobTracker.pdf`);
    };

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold">AI Resume Builder</h1>
                    <p className="text-text-muted">Create ATS-optimized resumes for {selectedJob ? selectedJob.company : 'your dream job'}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setIsPreviewOpen(true)} className="btn btn-secondary lg:hidden">
                        <Eye size={18} />
                        Preview
                    </button>
                    <button onClick={exportPDF} className="btn btn-primary">
                        <Download size={18} />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Editor Side */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <button
                                    onClick={() => setStep(s)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === s ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                                            step > s ? 'bg-success/20 text-success border border-success/30' : 'bg-white/5 text-text-muted border border-white/10'
                                        }`}
                                >
                                    {step > s ? <CheckCircle size={18} /> : s}
                                </button>
                                {s < 4 && <div className={`w-12 h-[2px] mx-2 ${step > s ? 'bg-success/30' : 'bg-white/10'}`} />}
                            </div>
                        ))}
                        <span className="ml-4 text-sm font-bold text-primary uppercase tracking-widest">
                            {step === 1 ? 'Personal Info' : step === 2 ? 'Experience' : step === 3 ? 'Skills' : 'Education'}
                        </span>
                    </div>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8"
                    >
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="input-group">
                                        <label className="label">Full Name</label>
                                        <input className="input" value={user.name} onChange={(e) => handleUserChange('name', e.target.value)} placeholder="John Doe" />
                                    </div>
                                    <div className="input-group">
                                        <label className="label">Professional Title</label>
                                        <input className="input" value={user.role} onChange={(e) => handleUserChange('role', e.target.value)} placeholder="Full Stack Developer" />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="label">Email Address</label>
                                    <input className="input" value={user.email} onChange={(e) => handleUserChange('email', e.target.value)} placeholder="john@example.com" />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                {user.experience.map((exp, i) => (
                                    <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 relative group">
                                        <button
                                            onClick={() => removeItem('experience', i)}
                                            className="absolute top-4 right-4 p-2 text-text-dim hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input className="input" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} placeholder="Company" />
                                            <input className="input" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} placeholder="Role" />
                                        </div>
                                        <input className="input mb-4" value={exp.duration} onChange={(e) => handleArrayChange('experience', i, 'duration', e.target.value)} placeholder="March 2022 - Present" />
                                        <textarea className="input" rows="3" placeholder="Describe your achievements..."></textarea>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('experience', { company: '', role: '', duration: '', description: '' })}
                                    className="btn btn-secondary w-full border-dashed"
                                >
                                    <Plus size={18} /> Add Experience
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <p className="text-sm text-text-muted mb-4">Add skills that match the JD for a higher ATS score.</p>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg">
                                            <span className="text-sm font-medium">{skill}</span>
                                            <button onClick={() => removeItem('skills', i)} className="hover:text-white"><Plus className="rotate-45" size={14} /></button>
                                        </div>
                                    ))}
                                    <input
                                        className="input w-32 inline-block h-8 py-0 px-3 text-sm"
                                        placeholder="Add..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addItem('skills', e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                {user.education.map((edu, i) => (
                                    <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 relative">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input className="input" value={edu.school} onChange={(e) => handleArrayChange('education', i, 'school', e.target.value)} placeholder="University" />
                                            <input className="input" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} placeholder="Degree" />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('education', { school: '', degree: '', year: '' })}
                                    className="btn btn-secondary w-full border-dashed"
                                >
                                    <Plus size={18} /> Add Education
                                </button>
                            </div>
                        )}

                        <div className="flex justify-between mt-10 pt-10 border-t border-white/5">
                            <button
                                onClick={() => setStep(Math.max(1, step - 1))}
                                disabled={step === 1}
                                className="btn btn-secondary"
                            >
                                <ChevronLeft size={18} /> Previous
                            </button>
                            <button
                                onClick={() => setStep(Math.min(4, step + 1))}
                                disabled={step === 4}
                                className="btn btn-primary"
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* ATS & Preview Side */}
                <div className="hidden xl:block lg:col-span-4 space-y-6">
                    <div className="glass-card p-6">
                        <h2 className="text-lg mb-6 flex items-center gap-2">
                            <Sparkles className="text-warning" size={20} />
                            AI ATS Analysis
                        </h2>
                        <div className="p-6 rounded-2xl bg-bg-dark border border-white/5 relative overflow-hidden mb-6">
                            <div className="text-center">
                                <span className={`text-5xl font-bold ${atsScore > 70 ? 'text-success' : atsScore > 40 ? 'text-warning' : 'text-danger'}`}>
                                    {atsScore}%
                                </span>
                                <p className="text-xs text-text-muted mt-2 font-bold uppercase">ATS Matching Score</p>
                            </div>
                            <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${atsScore > 70 ? 'bg-success' : atsScore > 40 ? 'bg-warning' : 'bg-danger'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${atsScore}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-3 text-sm">
                                {atsScore > 70 ? <CheckCircle className="text-success shrink-0" size={16} /> : <AlertTriangle className="text-warning shrink-0" size={16} />}
                                <div>
                                    <p className="font-semibold">{atsScore > 70 ? 'High Compatibility' : 'Low Skill Match'}</p>
                                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                        {atsScore > 70
                                            ? 'Your resume strongly matches the JD. Ready to apply!'
                                            : 'Missing key keywords: ' + (selectedJob?.skills?.slice(0, 3).join(', ') || 'React, System Design')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <h4 className="text-xs font-bold text-text-muted mb-4 uppercase tracking-wider">Job Context</h4>
                            {selectedJob ? (
                                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                    <p className="text-xs font-bold">{selectedJob.company}</p>
                                    <p className="text-[10px] text-text-muted">{selectedJob.role}</p>
                                </div>
                            ) : (
                                <p className="text-xs text-text-dim italic">Select a job in Job Tracker to see context here.</p>
                            )}
                        </div>
                    </div>

                    <div className="glass-card p-4 overflow-hidden h-[400px] relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[2px]">
                            <button className="btn btn-primary">
                                Full Preview
                            </button>
                        </div>
                        <div className="bg-white text-black p-8 h-full shadow-2xl scale-[0.5] origin-top w-[200%]">
                            <h1 className="text-4xl font-black mb-2">{user.name || 'FULL NAME'}</h1>
                            <p className="text-xl mb-8 border-b-2 border-black pb-4 text-gray-600">{user.role || 'Professional Title'}</p>
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12">
                                    <h3 className="text-lg font-bold border-b border-black mb-4">EXPERIENCE</h3>
                                    {user.experience.map((e, idx) => (
                                        <div key={idx} className="mb-4">
                                            <p className="font-bold">{e.company} | {e.role}</p>
                                            <p className="text-sm italic">{e.duration}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isPreviewOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 text-black rounded-lg relative"
                        >
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black"
                            >
                                <Plus className="rotate-45" size={24} />
                            </button>

                            <div id="resume-preview">
                                <div className="text-center mb-10 border-b-2 border-gray-100 pb-10">
                                    <h1 className="text-5xl font-black mb-2">{user.name || 'FULL NAME'}</h1>
                                    <p className="text-sm font-bold text-gray-500 tracking-[0.2em] mb-4">{user.role || 'PROFESSIONAL TITLE'}</p>
                                    <p className="text-sm">{user.email || 'email@example.com'} • {user.phone || '+1 234 567 890'} • {user.location || 'City, Country'}</p>
                                </div>

                                <div className="grid grid-cols-12 gap-12">
                                    <div className="col-span-8">
                                        <section className="mb-8">
                                            <h2 className="text-lg font-black border-l-4 border-black pl-3 mb-6">PROFESSIONAL EXPERIENCE</h2>
                                            <div className="space-y-6">
                                                {user.experience.length > 0 ? user.experience.map((exp, i) => (
                                                    <div key={i}>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h3 className="font-bold text-gray-900">{exp.company}</h3>
                                                            <span className="text-xs font-bold text-gray-500">{exp.duration}</span>
                                                        </div>
                                                        <p className="text-sm font-bold text-gray-600 mb-2">{exp.role}</p>
                                                        <p className="text-sm text-gray-700 leading-relaxed italic opacity-70">
                                                            (Experience details will appear here as you fill the form)
                                                        </p>
                                                    </div>
                                                )) : <p className="text-sm text-gray-400">Add experience to see it here</p>}
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-span-4">
                                        <section className="mb-8">
                                            <h2 className="text-lg font-black border-l-4 border-black pl-3 mb-6">SKILLS</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {user.skills.map((skill, i) => (
                                                    <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-bold text-gray-800 rounded">
                                                        {skill.toUpperCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeBuilder;
