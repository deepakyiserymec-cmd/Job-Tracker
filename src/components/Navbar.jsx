import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Briefcase, GraduationCap, FileText, User } from 'lucide-react';

const Navbar = () => {
    const { user, setUser } = useApp();
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/jobs', icon: Briefcase, label: 'Job Tracker' },
        { path: '/prep', icon: GraduationCap, label: 'Readiness' },
        { path: '/resume', icon: FileText, label: 'Resume Builder' },
    ];

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav className="glass-panel fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <NavLink to="/" className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                </NavLink>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    JobTracker
                </span>
            </div>

            <div className="hidden md:flex flex-row items-center gap-8">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <NavLink to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="hidden text-right md:block">
                                <p className="text-xs font-semibold text-white">{user.name}</p>
                                <p className="text-[10px] text-text-muted">{user.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-bg-card">
                                <User className="w-full h-full p-2 text-primary" />
                            </div>
                        </NavLink>
                        <button onClick={handleLogout} className="btn btn-ghost text-[10px] uppercase font-bold tracking-wider px-2 h-8">
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <NavLink to="/login" className="btn btn-ghost text-xs py-2">Login</NavLink>
                        <NavLink to="/signup" className="btn btn-primary text-xs py-2">Sign Up</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
