import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Briefcase, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const { setUser } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Full Stack Developer'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate signup
        setUser({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            skills: [],
            experience: [],
            education: []
        });
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-10 relative overflow-hidden"
            >
                {/* Decorative background blur */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <Sparkles className="text-primary" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-text-muted">Start your placement journey with JobTracker</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="input-group">
                        <label className="label">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input
                                required
                                className="input pl-10"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input
                                required
                                type="email"
                                className="input pl-10"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Professional Title</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input
                                required
                                className="input pl-10"
                                placeholder="e.g. Frontend Developer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input
                                required
                                type="password"
                                className="input pl-10"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn btn-primary h-12 mt-4 text-base">
                        Get Started
                        <ChevronRight size={18} />
                    </button>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
