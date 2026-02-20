import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Target, ClipboardList, BookOpen, Brain, Code, User, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Readiness = () => {
    const { jobs, selectedJob, setSelectedJobId } = useApp();
    const [prepProgress, setPrepProgress] = useState(0);

    const initialChecklist = [
        {
            category: 'Aptitude', tasks: [
                { id: 'a1', text: 'Quantitative Aptitude (QA)', completed: false },
                { id: 'a2', text: 'Logical Reasoning (LR)', completed: false },
                { id: 'a3', text: 'Verbal Ability (VA)', completed: false },
            ]
        },
        {
            category: 'Technical', tasks: [
                { id: 't1', text: 'Data Structures & Algorithms', completed: false },
                { id: 't2', text: 'System Design Basics', completed: false },
                { id: 't3', text: 'JavaScript/React Deep Dive', completed: false },
                { id: 't4', text: 'Database Management (SQL/NoSQL)', completed: false },
            ]
        },
        {
            category: 'HR / Behavioral', tasks: [
                { id: 'h1', text: 'Mock Interview (STAR Method)', completed: false },
                { id: 'h2', text: 'Company Research (Product/Culture)', completed: false },
                { id: 'h3', text: 'Prepare "Tell me about yourself"', completed: false },
            ]
        }
    ];

    const [checklist, setChecklist] = useState(initialChecklist);

    useEffect(() => {
        const total = checklist.reduce((acc, cat) => acc + cat.tasks.length, 0);
        const completed = checklist.reduce((acc, cat) => acc + cat.tasks.filter(t => t.completed).length, 0);
        setPrepProgress(Math.round((completed / total) * 100));
    }, [checklist]);

    const toggleTask = (catIndex, taskIndex) => {
        const newChecklist = [...checklist];
        newChecklist[catIndex].tasks[taskIndex].completed = !newChecklist[catIndex].tasks[taskIndex].completed;
        setChecklist(newChecklist);
    };

    const getStatusColor = (score) => {
        if (score > 80) return 'var(--success)';
        if (score > 40) return 'var(--warning)';
        return 'var(--danger)';
    };

    return (
        <div className="animate-fade-in pb-12">
            <header className="mb-10">
                <h1 className="text-3xl font-bold">Interview Readiness</h1>
                <p className="text-text-muted">Master your preparation for selected job roles</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                <div className="lg:col-span-1 glass-card p-6 h-fit">
                    <h2 className="text-lg mb-4 flex items-center gap-2">
                        <Target className="text-primary" size={20} />
                        Selected Job
                    </h2>
                    <div className="input-group">
                        <select
                            className="input bg-bg-dark"
                            value={selectedJob?.id || ''}
                            onChange={(e) => setSelectedJobId(e.target.value)}
                        >
                            <option value="" disabled>Select a job to start</option>
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.company} - {job.role}</option>
                            ))}
                        </select>
                    </div>
                    {selectedJob ? (
                        <div className="mt-6 border-t border-white/5 pt-6 animate-fade-in">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-bg-dark relative mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8"
                                        />
                                        <circle
                                            cx="64" cy="64" r="56" fill="transparent"
                                            stroke={getStatusColor(prepProgress)}
                                            strokeWidth="8"
                                            strokeDasharray={2 * Math.PI * 56}
                                            strokeDashoffset={2 * Math.PI * 56 * (1 - prepProgress / 100)}
                                            className="transition-all duration-700 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold">{prepProgress}%</span>
                                        <span className="text-[10px] text-text-muted font-semibold uppercase tracking-widest">Ready</span>
                                    </div>
                                </div>
                                <h3 className="font-bold">{selectedJob.role}</h3>
                                <p className="text-xs text-text-muted">at {selectedJob.company}</p>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(selectedJob.skills || ['React', 'JavaScript', 'Node.js', 'System Design']).map(s => (
                                            <span key={s} className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md border border-primary/20">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50">
                            <AlertCircle size={40} className="mx-auto mb-4" />
                            <p className="text-sm">Please select a job to see your readiness score.</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-card p-8">
                        <h2 className="text-xl mb-6 flex items-center gap-2">
                            <ClipboardList className="text-primary" size={24} />
                            Preparation Checklist
                        </h2>
                        <div className="space-y-8">
                            {checklist.map((cat, catIdx) => (
                                <div key={cat.category}>
                                    <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest border-l-2 border-primary pl-3">
                                        {cat.category}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {cat.tasks.map((task, taskIdx) => (
                                            <div
                                                key={task.id}
                                                onClick={() => toggleTask(catIdx, taskIdx)}
                                                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${task.completed
                                                        ? 'bg-success/5 border-success/30 text-success'
                                                        : 'bg-white/5 border-white/5 hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{task.text}</span>
                                                {task.completed ? <CheckCircle size={18} /> : <div className="w-5 h-5 rounded-full border-2 border-white/10" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h2 className="text-xl mb-6 flex items-center gap-2">
                            <BookOpen className="text-primary" size={24} />
                            Recommended Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                <Code className="text-text-muted group-hover:text-primary mb-3" size={24} />
                                <h4 className="text-sm font-semibold mb-1">DSA Masterclass</h4>
                                <p className="text-xs text-text-dim">Brush up on trees and graphs for {selectedJob?.company || 'this role'}.</p>
                                <div className="mt-3 flex items-center text-[10px] font-bold text-primary uppercase">
                                    Learn Now <ChevronRight size={12} />
                                </div>
                            </a>
                            <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                <Brain className="text-text-muted group-hover:text-primary mb-3" size={24} />
                                <h4 className="text-sm font-semibold mb-1">System Design Pro</h4>
                                <p className="text-xs text-text-dim">Crucial for {selectedJob?.role || 'senior'} positions.</p>
                                <div className="mt-3 flex items-center text-[10px] font-bold text-primary uppercase">
                                    Learn Now <ChevronRight size={12} />
                                </div>
                            </a>
                            <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                <User className="text-text-muted group-hover:text-primary mb-3" size={24} />
                                <h4 className="text-sm font-semibold mb-1">HR Interview Guide</h4>
                                <p className="text-xs text-text-dim">Common questions for {selectedJob?.company || 'tech'} companies.</p>
                                <div className="mt-3 flex items-center text-[10px] font-bold text-primary uppercase">
                                    Learn Now <ChevronRight size={12} />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Readiness;
