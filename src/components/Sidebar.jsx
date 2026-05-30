import React from 'react';
import { X, Home, Plus, BarChart3, Eye, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, user }) => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Plus, label: 'Submit Claim', path: '/submit' },
    ];

    if (user?.role === 'reviewer') {
        navItems.push({ icon: Eye, label: 'Review Queue', path: '/reviewer' });
    }

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:relative top-16 left-0 h-[calc(100vh-64px)] w-64 glass-light border-r border-slate-700/50 z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-4 hover:bg-slate-800/50 transition"
                    >
                        <X size={20} />
                    </button>

                    {/* Navigation Items */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active
                                        ? 'glass-light bg-violet-500/20 text-violet-300 border border-violet-500/50'
                                        : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info Section */}
                    <div className="px-4 py-6 border-t border-slate-700/50 space-y-4">
                        <div className="space-y-2">
                            <p className="text-xs text-slate-400 uppercase font-semibold">Current User</p>
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <p className="font-semibold text-sm">{user?.name}</p>
                                <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                                <p className="text-xs text-violet-300 mt-2 capitalize">
                                    {user?.role === 'reviewer' ? '👨‍⚖️ Reviewer' : '📝 Contributor'}
                                </p>
                            </div>
                        </div>

                        {/* Settings Link */}
                        <Link
                            to="#"
                            className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-slate-800/50 rounded-lg transition"
                        >
                            <Settings size={16} />
                            <span className="text-sm">Settings</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
