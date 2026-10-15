import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

/* ── All nav paths flattened for keyboard nav ── */
const NAV_ITEMS = [
    { section: "OVERVIEW", label: "Dashboard", path: "/dashboard", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
    { section: "OVERVIEW", label: "Live Screen", path: "/live-screen", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="18" x2="12" y2="21" /></svg> },
    { section: "OVERVIEW", label: "Screenshots", path: "/screenshots", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg> },
    { section: "OVERVIEW", label: "Activity", path: "/activity", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
    { section: "OVERVIEW", label: "Work Tracking", path: "/work-tracking", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
    { section: "MANAGEMENT", label: "Employees", path: "/employees", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
    { section: "MANAGEMENT", label: "Attendance", path: "/attendance", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
    { section: "MANAGEMENT", label: "Projects", path: "/projects", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg> },
    { section: "MANAGEMENT", label: "Tasks", path: "/tasks", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
    { section: "COMMUNICATION", label: "Live Chat", path: "/live-chat", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
    { section: "COMMUNICATION", label: "Announcements", path: "/announcements", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
    { section: "ANALYTICS", label: "Reports", path: "/reports", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
    { section: "ANALYTICS", label: "Daily Analysis", path: "/daily-analysis", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
    { section: "SETTINGS", label: "Settings", path: "/settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
];

/* Group by section for rendering */
const SECTIONS = NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
}, {});

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef(null);
    const itemRefs = useRef([]);

    /* ── Keyboard navigation ── */
    useEffect(() => {
        const handleKey = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

            e.preventDefault();
            const currentIdx = NAV_ITEMS.findIndex(item => item.path === location.pathname);
            if (currentIdx === -1) {
                // not on any nav page — go to first
                navigate(NAV_ITEMS[0].path);
                return;
            }

            let nextIdx;
            if (e.key === 'ArrowDown') {
                nextIdx = (currentIdx + 1) % NAV_ITEMS.length;
            } else {
                nextIdx = (currentIdx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
            }

            navigate(NAV_ITEMS[nextIdx].path);

            // scroll item into view
            setTimeout(() => {
                itemRefs.current[nextIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 10);
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [location.pathname, navigate]);

    /* ── Scroll active item into view on mount / route change ── */
    useEffect(() => {
        const idx = NAV_ITEMS.findIndex(item => item.path === location.pathname);
        if (idx !== -1) {
            setTimeout(() => {
                itemRefs.current[idx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 50);
        }
    }, [location.pathname]);

    let flatIdx = -1; // running index across all sections

    return (
        <div className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="13" stroke="white" strokeWidth="2.5"
                            fill="rgba(255,255,255,0.15)" strokeDasharray="4.5 2.5" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="6" fill="white" opacity="0.9" />
                    </svg>
                </div>
                <div className="sidebar-logo-text">
                    <span className="sidebar-brand">meerro</span>
                    <span className="sidebar-tagline">super vision</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav" ref={navRef}>
                {Object.entries(SECTIONS).map(([section, items]) => (
                    <div className="sidebar-group" key={section}>
                        <p className="sidebar-section-label">{section}</p>
                        {items.map((item) => {
                            flatIdx++;
                            const idx = flatIdx; // capture for ref
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    ref={el => itemRefs.current[idx] = el}
                                    className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                                >
                                    <span className="sidebar-item-icon">{item.icon}</span>
                                    <span className="sidebar-item-label">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Upgrade Banner — navigates to /upgrade */}
            <div
                className="sidebar-upgrade"
                onClick={() => navigate('/upgrade')}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate('/upgrade')}
            >
                <div className="sidebar-upgrade-crown">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20M4 20l2-10 6 5 4-9 4 9 2-5 2 10" />
                    </svg>
                </div>
                <div className="sidebar-upgrade-text">
                    <span className="sidebar-upgrade-title">Upgrade to Pro</span>
                    <span className="sidebar-upgrade-sub">Unlock more features and insights</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>
        </div>
    );
}