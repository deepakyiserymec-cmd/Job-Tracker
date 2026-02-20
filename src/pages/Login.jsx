import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, ChevronRight, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const { setUser } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        setUser({
            name: 'User',
            email: formData.email,
            role: 'Full Stack Developer',
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
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <Briefcase className="text-primary" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-text-muted">Sign in to continue your progress</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/10" />
                            <span className="text-text-muted">Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full btn btn-primary h-12 mt-4 text-base">
                        Sign In
                        <ChevronRight size={18} />
                    </button>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create one</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
