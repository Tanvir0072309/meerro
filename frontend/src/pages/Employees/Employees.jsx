import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './Employees.css';

/* ══════════════════════════════════════════ SVG ICONS ══════════════════════════════════════════ */
const Icons = {
    Search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Filter: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Download: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    MoreH: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>,
    Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    MoreV: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    UserCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>,
    UserMinus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="11" /></svg>,
    Coffee: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    Phone: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    ArrowRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    ChevDown: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    ChevLeft: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
    ChevRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    Figma: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>,
    Video: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
    LogIn: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>,
    /* menu icons */
    Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Profile: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Activity: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    Settings2: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    Export2: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Upload: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    Report: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
};

/* ══════════════════════════════════════════
   DROPDOWN — exact Activity.jsx pattern
══════════════════════════════════════════ */
function ToolbarSelect({ options }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    return (
        <div className="emp-tb-select" tabIndex={0} onBlur={() => setOpen(false)}>
            <button className="emp-tb-select-btn" onClick={() => setOpen(o => !o)} type="button">
                <span>{options[idx]}</span>
                <span className={`emp-custom-chevron ${open ? 'open' : ''}`}><Icons.ChevDown /></span>
            </button>
            {open && (
                <ul className="emp-custom-dropdown">
                    {options.map((o, i) => (
                        <li key={o} className={`emp-custom-option ${i === idx ? 'selected' : ''}`}
                            onMouseDown={() => { setIdx(i); setOpen(false); }}>
                            {i === idx && <span className="emp-option-check"><Icons.Check /></span>}
                            {o}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════
   SMART CONTEXT MENU
   Opens above if near bottom of screen
══════════════════════════════════════════ */
function ContextMenu({ items, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClose]);
    return (
        <ul className="emp-ctx-menu" ref={ref}>
            {items.map((item, i) =>
                item.divider
                    ? <li key={i} className="emp-ctx-divider" />
                    : (
                        <li key={i}
                            className={`emp-ctx-item ${item.danger ? 'danger' : ''}`}
                            onMouseDown={() => { item.action?.(); onClose(); }}>
                            <span className="emp-ctx-icon">{item.Icon && <item.Icon />}</span>
                            {item.label}
                        </li>
                    )
            )}
        </ul>
    );
}

/* Smart 3-dots button — measures position and opens up if near bottom */
function ThreeDots({ items, btnClass = 'emp-action-btn' }) {
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const btnRef = useRef(null);

    const handleClick = useCallback(() => {
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenUp(spaceBelow < 200);
        }
        setOpen(o => !o);
    }, []);

    return (
        <div className="emp-ctx-wrap" ref={btnRef}>
            <button className={btnClass} onClick={handleClick} type="button">
                <Icons.MoreV />
            </button>
            {open && (
                <div className={`emp-ctx-positioner ${openUp ? 'up' : 'down'}`}>
                    <ContextMenu items={items} onClose={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════
   DATA & HELPERS
══════════════════════════════════════════ */
const EMPLOYEES = [
    { name: 'John Smith', id: 'EMP001', dept: 'UI/UX Design', desig: 'UI/UX Designer', status: 'Online', workTime: '8h 15m', productivity: 85, lastActive: '10:30 AM' },
    { name: 'Sarah Johnson', id: 'EMP002', dept: 'Development', desig: 'Developer', status: 'Online', workTime: '7h 45m', productivity: 72, lastActive: '10:28 AM' },
    { name: 'Michael Brown', id: 'EMP003', dept: 'Design', desig: 'Designer', status: 'Online', workTime: '6h 30m', productivity: 65, lastActive: '10:15 AM' },
    { name: 'Emily Davis', id: 'EMP004', dept: 'Content Writing', desig: 'Content Writer', status: 'Online', workTime: '7h 10m', productivity: 80, lastActive: '10:10 AM' },
    { name: 'David Wilson', id: 'EMP005', dept: 'Marketing', desig: 'Marketing Exec.', status: 'Offline', workTime: '0h 00m', productivity: 0, lastActive: 'Yesterday' },
    { name: 'Robert Taylor', id: 'EMP006', dept: 'Development', desig: 'Frontend Developer', status: 'Online', workTime: '8h 00m', productivity: 78, lastActive: '09:59 AM' },
    { name: 'Jessica Martinez', id: 'EMP007', dept: 'HR', desig: 'HR Executive', status: 'Online', workTime: '6h 20m', productivity: 68, lastActive: '09:45 AM' },
    { name: 'Daniel Thomas', id: 'EMP008', dept: 'Finance', desig: 'Accountant', status: 'On Break', workTime: '0h 30m', productivity: 0, lastActive: '09:40 AM' },
    { name: 'James Anderson', id: 'EMP009', dept: 'Support', desig: 'Support Engineer', status: 'Online', workTime: '5h 50m', productivity: 62, lastActive: '09:30 AM' },
    { name: 'Linda Garcia', id: 'EMP010', dept: 'Sales', desig: 'Sales Executive', status: 'Offline', workTime: '0h 00m', productivity: 0, lastActive: 'Yesterday' },
];

const AV_COLORS = ['#9c27b0', '#b5179e', '#43a047', '#e65100', '#1565c0', '#c62828', '#0288d1', '#558b2f'];
const avColor = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = n => n.split(' ').map(w => w[0]).join('');

const statusStyle = s =>
    s === 'Online' ? { background: '#e8f5e9', color: '#2e7d32' } :
        s === 'On Break' ? { background: '#fff3e0', color: '#e65100' } :
            { background: '#f5f5f5', color: '#616161' };

function Avatar({ name, size = 30 }) {
    return (
        <div style={{ width: size, height: size, borderRadius: '50%', background: avColor(name), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, fontFamily: 'DM Sans, sans-serif' }}>
            {initials(name)}
        </div>
    );
}

function ProductivityBar({ value }) {
    const color = value >= 80 ? '#43a047' : value >= 60 ? '#fb8c00' : value > 0 ? '#c62828' : '#e0e0e0';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 70, height: 5, borderRadius: 3, background: '#f0e6f0', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 11, color: '#5c4a6e', fontWeight: 600 }}>{value}%</span>
        </div>
    );
}

/* Row context menu items */
const rowMenuItems = (empName) => [
    { label: 'View Profile', Icon: Icons.Profile, action: () => alert(`View Profile: ${empName}`) },
    { label: 'Edit Employee', Icon: Icons.Edit, action: () => alert(`Edit: ${empName}`) },
    { label: 'View Activity', Icon: Icons.Activity, action: () => alert(`Activity: ${empName}`) },
    { divider: true },
    { label: 'Export Data', Icon: Icons.Export2, action: () => alert(`Export: ${empName}`) },
    { divider: true },
    { label: 'Delete Employee', Icon: Icons.Trash, danger: true, action: () => alert(`Delete: ${empName}`) },
];

/* Toolbar more menu items */
const toolbarMoreItems = [
    { label: 'Export All', Icon: Icons.Export2, action: () => alert('Export All') },
    { label: 'Import CSV', Icon: Icons.Upload, action: () => alert('Import CSV') },
    { label: 'Generate Report', Icon: Icons.Report, action: () => alert('Generate Report') },
    { divider: true },
    { label: 'Settings', Icon: Icons.Settings2, action: () => alert('Settings') },
];

/* ══════════════════════════════════════════ MAIN ══════════════════════════════════════════ */
export default function Employees() {
    const [selected, setSelected] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const emp = EMPLOYEES[selected];
    const navigate = useNavigate(); 

    const ACTIVITY = [
        { time: '10:30 AM', Icon: Icons.LogIn, text: 'Logged in', app: null },
        { time: '10:15 AM', Icon: Icons.Figma, text: 'Worked on Dashboard Design', app: 'Figma' },
        { time: '09:45 AM', Icon: Icons.Video, text: 'Attended team meeting', app: 'Google Meet' },
        { time: '09:30 AM', Icon: Icons.Figma, text: 'Worked on User Flow', app: 'Figma' },
        { time: '09:00 AM', Icon: Icons.LogIn, text: 'Logged in', app: null },
    ];
    const actColor = i => (i === 0 || i === 4) ? '#43a047' : '#9c27b0';

    const filtered = search
        ? EMPLOYEES.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase()))
        : EMPLOYEES;

    return (
        <div className="emp-page">

            {/* ══ TOOLBAR ══ */}
            <div className="emp-toolbar">
                <div className="emp-search-wrap">
                    <span className="emp-search-icon"><Icons.Search /></span>
                    <input className="emp-search-input" placeholder="Search employees..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <ToolbarSelect options={['All Departments', 'UI/UX Design', 'Development', 'Design', 'Content Writing', 'Marketing', 'HR', 'Finance', 'Support', 'Sales']} />
                <ToolbarSelect options={['All Designations', 'UI/UX Designer', 'Developer', 'Frontend Developer', 'Designer', 'Content Writer', 'Marketing Exec.', 'HR Executive', 'Accountant', 'Support Engineer', 'Sales Executive']} />
                <ToolbarSelect options={['All Status', 'Online', 'Offline', 'On Break']} />
                <button className="emp-filter-btn"><Icons.Filter /> Filters</button>

                <div className="emp-toolbar-spacer" />

                <button className="emp-import-btn" onClick={() => alert('Import CSV')}><Icons.Download /> Import</button>
                <button
                    className="emp-add-btn"
                    onClick={() => navigate("/add-employee")}
                >
                    <Icons.Plus /> Add Employee
                </button>

                {/* Toolbar 3-dots */}
                <ThreeDots items={toolbarMoreItems} btnClass="emp-more-btn" />
            </div>

            {/* ══ STAT CARDS ══ */}
            <div className="emp-stat-cards">
                {[
                    { Icon: Icons.Users, cls: 'purple', label: 'Total Employees', value: '128', sub: '+12 this month', subCls: 'pos' },
                    { Icon: Icons.UserCheck, cls: 'green', label: 'Active Employees', value: '96', sub: '75% of total', subCls: 'pos' },
                    { Icon: Icons.UserMinus, cls: 'orange', label: 'Offline', value: '20', sub: '16% of total', subCls: 'neu' },
                    { Icon: Icons.Coffee, cls: 'blue', label: 'On Break', value: '12', sub: '9% of total', subCls: 'neu' },
                ].map((c, i) => (
                    <div className="emp-stat-card" key={i}>
                        <div className={`emp-stat-icon ${c.cls}`}><c.Icon /></div>
                        <div className="emp-stat-body">
                            <div className="emp-stat-label">{c.label}</div>
                            <div className="emp-stat-value">{c.value}</div>
                            <div className={`emp-stat-sub ${c.subCls}`}>{c.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ══ CONTENT ══ */}
            <div className="emp-content">

                {/* LEFT */}
                <div className="emp-main">
                    <div className="emp-table-title">All Employees</div>

                    <div className="emp-table-card">
                        <table className="emp-table">
                            <thead>
                                <tr>
                                    <th>Employee</th><th>Department</th><th>Designation</th>
                                    <th>Status</th><th>Work Time</th><th>Productivity</th>
                                    <th>Last Active</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((e, i) => (
                                    <tr key={i} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <Avatar name={e.name} size={30} />
                                                <div>
                                                    <div className="emp-name-text">{e.name}</div>
                                                    <div className="emp-id-text">{e.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="emp-td-text">{e.dept}</td>
                                        <td className="emp-td-text">{e.desig}</td>
                                        <td><span className="emp-badge" style={statusStyle(e.status)}>{e.status}</span></td>
                                        <td className="emp-td-text">{e.workTime}</td>
                                        <td><ProductivityBar value={e.productivity} /></td>
                                        <td className="emp-td-text">{e.lastActive}</td>
                                        <td onClick={ev => ev.stopPropagation()}>
                                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                                <button className="emp-action-btn" title="View Profile"
                                                    onClick={() => { setSelected(i); }}>
                                                    <Icons.Eye />
                                                </button>
                                                <button className="emp-action-btn" title="Edit Employee"
                                                    onClick={() => alert(`Edit: ${e.name}`)}>
                                                    <Icons.Edit />
                                                </button>
                                                <ThreeDots items={rowMenuItems(e.name)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="emp-pagination">
                            <span className="emp-page-info">Showing 1–{filtered.length} of 128 employees</span>
                            <div className="emp-page-btns">
                                <button className="emp-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}><Icons.ChevLeft /></button>
                                {[1, 2, 3, '...', 13].map((p, i) => (
                                    <button key={i} className={`emp-page-btn ${p === page ? 'active' : ''}`}
                                        onClick={() => typeof p === 'number' && setPage(p)}>{p}</button>
                                ))}
                                <button className="emp-page-btn" onClick={() => setPage(p => Math.min(13, p + 1))}><Icons.ChevRight /></button>
                            </div>
                            <select className="emp-per-page-select">
                                <option>Show 10 per page</option>
                                <option>Show 25 per page</option>
                                <option>Show 50 per page</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="emp-right">
                    <div className="emp-right-header">
                        <span className="emp-right-title">Employee Details</span>
                    </div>

                    <div className="emp-profile-card">
                        <Avatar name={emp.name} size={56} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#2d1a3e' }}>{emp.name}</span>
                                <span className="emp-badge" style={{ ...statusStyle(emp.status), fontSize: 9 }}>{emp.status}</span>
                            </div>
                            <div style={{ fontSize: 11, color: '#8a7a9b', marginTop: 2 }}>{emp.desig} &bull; {emp.dept}</div>
                            <div style={{ fontSize: 10.5, color: '#b388b3', marginTop: 3 }}>john.smith@meerrovision.com</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                                <span style={{ color: '#b388b3', display: 'flex' }}><Icons.Phone /></span>
                                <span style={{ fontSize: 10.5, color: '#b388b3' }}>+1 (555) 123-4567</span>
                            </div>
                            <div style={{ fontSize: 10, color: '#b388b3', marginTop: 2 }}>Employee ID: {emp.id}</div>
                            <div style={{ fontSize: 10, color: '#b388b3' }}>Joined: Jan 15, 2024</div>
                        </div>
                    </div>

                    <div className="emp-detail-stats">
                        {[
                            { label: 'Work Time', val: emp.workTime },
                            { label: 'Productivity', val: `${emp.productivity}%` },
                            { label: 'Tasks Done', val: '12/15' },
                        ].map((s, i) => (
                            <div key={i} className="emp-detail-stat">
                                <div className="emp-detail-stat-val">{s.val}</div>
                                <div className="emp-detail-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <button className="emp-view-profile-btn" onClick={() => alert(`Full Profile: ${emp.name}`)}>
                        View Full Profile <Icons.ArrowRight />
                    </button>

                    {/* Today's Activity */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#2d1a3e' }}>Today's Activity</span>
                            <button style={{ fontSize: 11, color: '#b5179e', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                                onClick={() => alert('View All Activity')}>View All</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                            {ACTIVITY.map((a, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                    <span style={{ fontSize: 10, color: '#b388b3', minWidth: 52, flexShrink: 0, paddingTop: 2 }}>{a.time}</span>
                                    <div style={{ width: 22, height: 22, borderRadius: 6, background: `${actColor(i)}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: actColor(i) }}>
                                        <a.Icon />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11.5, fontWeight: 500, color: '#2d1a3e', lineHeight: 1.3 }}>{a.text}</div>
                                        {a.app && <div style={{ fontSize: 10, color: '#b388b3' }}>{a.app}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Department Overview */}
                    <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#2d1a3e', marginBottom: 10 }}>Department Overview</div>
                        <div style={{ background: '#faf5fb', borderRadius: 10, padding: '12px 14px', border: '1px solid #f0e6f0' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#2d1a3e', marginBottom: 2 }}>{emp.dept}</div>
                            <div style={{ fontSize: 10.5, color: '#b388b3', marginBottom: 10 }}>Total Employees: 12</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                {[{ label: 'Active', val: '9', color: '#43a047' }, { label: 'Offline', val: '2', color: '#c62828' }, { label: 'On Break', val: '1', color: '#fb8c00' }].map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.val}</div>
                                        <div style={{ fontSize: 9.5, color: '#b388b3' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <button style={{ marginTop: 10, fontSize: 11, color: '#b5179e', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'DM Sans, sans-serif' }}
                                onClick={() => alert(`View Department: ${emp.dept}`)}>
                                View Department <Icons.ArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}