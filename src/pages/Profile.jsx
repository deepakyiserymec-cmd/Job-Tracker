import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Briefcase, GraduationCap, Github, Linkedin, Globe, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, setUser } = useApp();

    const handleUpdate = (field, value) => {
        setUser({ ...user, [field]: value });
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <header className="mb-10 text-center">
                <div className="inline-block relative mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
                        <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center overflow-hidden">
                            <User size={64} className="text-primary" />
                        </div>
                    </div>
                    <button className="absolute bottom-2 right-2 bg-primary p-2 rounded-full text-white shadow-lg">
                        <Plus size={16} />
                    </button>
                </div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-text-muted">{user.role}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h2 className="text-xl mb-6 flex items-center gap-2">
                        <User className="text-primary" size={20} />
                        Personal Details
                    </h2>
                    <div className="space-y-4">
                        <div className="input-group">
                            <label className="label">Full Name</label>
                            <input className="input" value={user.name} onChange={(e) => handleUpdate('name', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label className="label">Professional Headline</label>
                            <input className="input" value={user.role} onChange={(e) => handleUpdate('role', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label className="label">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input className="input pl-10" value={user.email} onChange={(e) => handleUpdate('email', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h2 className="text-xl mb-6 flex items-center gap-2">
                        <Globe className="text-primary" size={20} />
                        Social Links
                    </h2>
                    <div className="space-y-4">
                        <div className="input-group">
                            <label className="label">LinkedIn</label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input className="input pl-10" placeholder="linkedin.com/in/..." />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="label">GitHub</label>
                            <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input className="input pl-10" placeholder="github.com/..." />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="label">Portfolio</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input className="input pl-10" placeholder="https://..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 glass-card p-8">
                <h2 className="text-xl mb-6">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {user.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-xl font-medium">
                            {skill}
                        </span>
                    ))}
                    {user.skills.length === 0 && <p className="text-text-dim italic">No skills added yet. Go to Resume Builder to add skills.</p>}
                </div>
                <button className="btn btn-primary">Save Profile Changes</button>
            </div>
        </div>
    );
};

export default Profile;
